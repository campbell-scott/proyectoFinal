import chai from 'chai';
import supertest from 'supertest';
import initServer from '../index.js';
import { adminUser } from '../user.js'

const expect = chai.expect;

describe("Testing Roles Endpoints Success", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());

        const response = await this.requester.post('/api/sessions/login').send(adminUser)
        this.jwt = response._body.accessToken
        
        this.app = app;
        this.db = db;
        this.role = '';
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El router debe devolver un arreglo. /api/roles/', function () {
        return this.requester
        .get('/api/roles/')
        .set('Authorization', `Bearer ${this.jwt}`)
        .then(result => {
            const { _body, status } = result;

            expect(status).to.be.equals(200);
            expect(Array.isArray(_body.roles)).to.be.equals(true);
        });
    });

    it('El router debe crear un role. /api/roles/', function () {
        this.role = {
            name: 'example',
            permissions: ["getUsers", "getUser", "addUsers", "deleteUser"]
        };

        return this.requester
            .post('/api/roles/')
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(this.role)
            .then(result => {
                const { _body, status } = result;
               
                expect(status).to.be.equals(200);
                expect(_body.role.name).to.be.equals(this.role.name);
                expect(_body.role.permissions[0]).to.be.equals(this.role.permissions[0]);
                this.role = _body.role
            }
        );
    });

    it('El router debe devolver un role. /api/roles/:id', function () {
        return this.requester
            .get(`/api/roles/${this.role.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(200);
                expect(_body.role.name).to.be.equals(this.role.name);
                expect(_body.role.permissions[0]).to.be.equals(this.role.permissions[0]);
            }
        );
    });

    it('El router debe actualizar un role. /api/roles/', function () {
        const newName = { name : 'example2' }
        return this.requester
            .put(`/api/roles/${this.role.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(newName)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(200);
                expect(_body.result.name).to.be.equals(newName.name);
                expect(_body.message).to.be.equals('Role updated.');
            }
        );
    });

    it('El router debe eliminar un role. /api/roles/', function () {
        return this.requester
            .delete(`/api/roles/${this.role.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(200);
                expect(_body.message).to.be.equals('Role deleted.');

            }
        );
    });
});

describe("Testing Roles Endpoints Fails", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());

        const response = await this.requester.post('/api/sessions/login').send(adminUser)
        this.jwt = response._body.accessToken
        
        this.app = app;
        this.db = db;
        this.role = '';
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('POST /api/roles/ invalid permission', function () {
        this.role = {
            name: 'example',
            permissions: ["getAlbondigas"]
        };

        return this.requester
            .post('/api/roles/')
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(this.role)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(400);
                expect(_body.message).to.be.equals('Invalid permissions found. Allowed permissions are: addProduct, updateProduct, deleteProduct, getRole, getRoles, addRole, updateRole, deleteRole, getUsers, getUser, addUsers, updateUser, deleteUser, getTickets, getTicket.');
            }
        );
    });

    it('GET /api/roles/:id Invalid Id', function () {
        return this.requester
            .get(`/api/roles/12345678`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(404);
                expect(_body.message).to.be.equals('Id not found.');
            }
        );
    });

    it('PUT /api/roles/ Invalid Name', function () {
        const newName = { name : 67 }
        return this.requester
            .put(`/api/roles/${this.role.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(newName)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(400);
                expect(_body.message[0].message).to.be.equals('Expected string, received number')
            }
        );
    });
});