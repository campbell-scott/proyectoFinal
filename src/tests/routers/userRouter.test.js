import { faker } from '@faker-js/faker';
import chai from 'chai';
import supertest from 'supertest';
import initServer from '../index.js';
import { adminUser } from '../user.js'

const expect = chai.expect;

describe("Testing User Endpoints Success", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());

        const response = await this.requester.post('/api/sessions/login').send(adminUser)
        this.jwt = response._body.accessToken
        
        this.app = app;
        this.db = db;
        this.user = '';
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El router debe devolver un arreglo. /api/users/', function () {
        return this.requester
        .get('/api/users/')
        .set('Authorization', `Bearer ${this.jwt}`)
        .then(result => {
            const { _body, status } = result;
            
            expect(status).to.be.equals(200);
            expect(Array.isArray(_body.users)).to.be.equals(true);
        });
    });

    it('El router debe crear un user. /api/users/', function () {
        this.user = {
            firstName: `${faker.person.firstName()}`,
            lastName: `${faker.person.lastName()}`,
            email: faker.internet.email(),
            age: 20,
            password: "12345678"
        };

        return this.requester
            .post('/api/users/')
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(this.user)
            .then(result => {
                const { _body, status } = result;
    
                expect(status).to.be.equals(200);
                expect(_body.user.firstName).to.be.equals(this.user.firstName);
                expect(_body.user.lastName).to.be.equals(this.user.lastName);
                expect(_body.user.email).to.be.equals(this.user.email);
                this.user = _body.user
            }
        );
    });

    it('El router debe devolver un user. /api/users/:id', function () {
        return this.requester
            .get(`/api/users/${this.user.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.user.id).to.be.equals(this.user.id);
                expect(_body.user.firstName).to.be.equals(this.user.firstName);
                expect(_body.user.lastName).to.be.equals(this.user.lastName);
                expect(_body.user.email).to.be.equals(this.user.email);
            }
        );
    });

    it('El router debe actualizar un user. /api/users/', function () {
        const newAge = { age : 25 }
        return this.requester
            .put(`/api/users/${this.user.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(newAge)
            .then(result => {
                const { _body, status } = result;
    
                expect(status).to.be.equals(200);
                expect(_body.result.firstName).to.be.equals(this.user.firstName);
                expect(_body.result.lastName).to.be.equals(this.user.lastName);
                expect(_body.result.age).to.be.equals(newAge.age);
                expect(_body.message).to.be.equals('User updated.');
            }
        );
    });

    it('El router debe eliminar un user. /api/users/', function () {
        return this.requester
            .delete(`/api/users/${this.user.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(200);
                expect(_body.message).to.be.equals('User deleted.');
            }
        );
    });
});

describe("Testing User Endpoints Fails", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());

        const response = await this.requester.post('/api/sessions/login').send(adminUser)
        this.jwt = response._body.accessToken
        
        this.app = app;
        this.db = db;
        this.payload
        this.user = '';
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('GET /api/users/ Authorization error', function () {
        return this.requester
        .get('/api/users/')
        .then(result => {
            const { _body, status } = result;
    
            expect(status).to.be.equals(401);
            expect(_body.message).to.be.equals('Empty authentication header!');
        });
    });

    it('GET /api/users/ Invalid Email', function () {
        this.user = {
            firstName: `${faker.person.firstName()}`,
            lastName: `${faker.person.lastName()}`,
            email: '',
            age: 20,
            password: "12345678"
        };

        return this.requester
            .post('/api/users/')
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(this.user)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(400);
                expect(_body.message[0].message).to.be.equals('Email is required.');
            }
        );
    });

    it('GET /api/users/:id Invalid Id', function () {
        return this.requester
            .get(`/api/users/12345678`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(404);
                expect(_body.message).to.be.equals('Id not found.');
            }
        );
    });

    it('PUT /api/users/ Invalid Number', function () {
        const newAge = { age : 'veinticinco' }
        return this.requester
            .put(`/api/users/64cc2f5275beea59ddac4e3c`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(newAge)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(400);
                expect(_body.message[0].message).to.be.equals('Expected number, received string');
            }
        );
    });
});