import { faker } from '@faker-js/faker';
import chai from 'chai';
import supertest from 'supertest';
import initServer from '../index.js';
import { adminUser } from '../user.js'

const expect = chai.expect;

describe("Testing Products Endpoints Success", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());

        const response = await this.requester.post('/api/sessions/login').send(adminUser)
        this.jwt = response._body.accessToken
        
        this.app = app;
        this.db = db;
        this.product = '';
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El router debe devolver un arreglo. /api/products/', function () {
        return this.requester
        .get('/api/products/')
        .set('Authorization', `Bearer ${this.jwt}`)
        .then(result => {
            const { _body, status } = result;
            
            expect(status).to.be.equals(200);
            expect(Array.isArray(_body.products)).to.be.equals(true);
        });
    });

    it('El router debe crear un product. /api/products/', function () {
        this.product = {
            title: faker.commerce.productName(),
            category: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: `${faker.number.int({ min: 10000, max: 99999 })}`,
            price: 15000,
            stock: 10
        };

        return this.requester
            .post('/api/products/')
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(this.product)
            .then(result => {
                const { _body, status } = result;
               
                expect(status).to.be.equals(200);
                expect(_body.product.title).to.be.equals(this.product.title);
                expect(_body.product.category).to.be.equals(this.product.category);
                expect(_body.product.code).to.be.equals(this.product.code);
                this.product = _body.product
            }
        );
    });

    it('El router debe devolver un product. /api/products/:id', function () {
        return this.requester
            .get(`/api/products/${this.product.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(200);
                expect(_body.product.id).to.be.equals(this.product.id);
                expect(_body.product.title).to.be.equals(this.product.title);
                expect(_body.product.category).to.be.equals(this.product.category);
                expect(_body.product.code).to.be.equals(this.product.code);
            }
        );
    });

    it('El router debe actualizar un product. /api/products/', function () {
        const newStock = { stock : 25 }
        return this.requester
            .put(`/api/products/${this.product.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(newStock)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(200);
                expect(_body.result.title).to.be.equals(this.product.title);
                expect(_body.result.code).to.be.equals(this.product.code);
                expect(_body.result.stock).to.be.equals(newStock.stock);
                expect(_body.message).to.be.equals('Product updated.');
            }
        );
    });

    it('El router debe eliminar un product. /api/products/', function () {
        return this.requester
            .delete(`/api/products/${this.product.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(200);
                expect(_body.result.status).to.be.equals(false);
                expect(_body.message).to.be.equals('Product deleted.');

            }
        );
    });
});

describe("Testing Products Endpoints Fails", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());

        const response = await this.requester.post('/api/sessions/login').send(adminUser)
        this.jwt = response._body.accessToken
        
        this.app = app;
        this.db = db;
        this.product = '';
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('GET /api/products/ Invalid title', function () {
        this.product = {
            title: '',
            category: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: `${faker.number.int({ min: 10000, max: 99999 })}`,
            price: 15000,
            stock: 10
        };

        return this.requester
            .post('/api/products/')
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(this.product)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(400);
                expect(_body.message[0].message).to.be.equals('Product title is required.');
            }
        );
    });

    it('GET /api/products/:id Invalid Id', function () {
        return this.requester
            .get(`/api/products/12345678`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(404);
                expect(_body.message).to.be.equals('Id not found.');
            }
        );
    });

    it('PUT /api/products/ Invalid Number', function () {
        const newStock = { stock : 'veinticinco' }
        return this.requester
            .put(`/api/products/645ab40ed3bd4a13f9b5087e`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(newStock)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(400);
                expect(_body.message[0].message).to.be.equals('Expected number, received string');
            }
        );
    });
});