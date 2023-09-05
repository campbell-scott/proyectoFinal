import chai from 'chai';
import supertest from 'supertest';
import initServer from '../index.js';

const expect = chai.expect;

let cartId = ''

describe("Testing Cart Endpoints Success", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());
        
        this.app = app;
        this.db = db;
        this.cart = '';
        this.product1 = '64584b2f2b5f76052b7a6a85';
        this.product2 = '64584b812b5f76052b7a6a87';
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El router debe crear un cart. /api/carts/', function () {
        return this.requester
            .post('/api/carts/')
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(200);
                this.cart = _body.cart
                cartId = _body.cart.id
            }
        );
    });

    it('El router debe devolver un cart. /api/carts/:id', function () {
        return this.requester
            .get(`/api/carts/${this.cart.id}`)
            .then(result => {
                const { _body, status } = result;
            
                expect(status).to.be.equals(200);
                expect(_body.cart.id).to.be.equals(this.cart.id);
            }
        );
    });
    it('El router debe agregar el producto1 a un cart. /api/carts/:id/products/:id', function () {
        return this.requester
            .post(`/api/carts/${this.cart.id}/products/${this.product1}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.cart.products[0]._id).to.be.equals(this.product1);
            }
        );
    });
    it('El router debe agregar el producto2 a un cart. /api/carts/:id/products/:id', function () {
        return this.requester
            .post(`/api/carts/${this.cart.id}/products/${this.product2}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.cart.products[1]._id).to.be.equals(this.product2);
            }
        );
    });
    it('El router debe eliminar el producto2 de un cart. /api/carts/:id/products/:id', function () {
        return this.requester
            .delete(`/api/carts/${this.cart.id}/products/${this.product2}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.cart.products[1]).to.be.equals(undefined);
            }
        );
    });
    it('El router debe actualizar la cantidad del product1. /api/carts/:id/products/:id', function () {
        const newQuantity = { quantity: 5 }

        return this.requester
            .put(`/api/carts/${this.cart.id}/products/${this.product1}`)
            .send(newQuantity)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.cart.products[0]._id).to.be.equals(this.product1);
                expect(_body.cart.products[0].quantity).to.be.equals(newQuantity.quantity);
            }
        );
    });
    it('El router debe eliminar todos los products de un cart. /api/carts/:id', function () {
        return this.requester
            .delete(`/api/carts/${this.cart.id}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.cart.products[0]).to.be.equals(undefined);
            }
        );
    });
});

describe("Testing Cart Endpoints Fails", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());

        this.app = app;
        this.db = db;
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('GET /api/carts/:id Invalid Id', function () {
        return this.requester
            .get(`/api/carts/12345678`)
            .then(result => {
                const { _body, status } = result;
            
                expect(status).to.be.equals(404);
                expect(_body.message).to.be.equals('Id not found.');
            }
        );
    });
    it('POST /api/carts/:id/products/:id Invalid product Id', function () {
        return this.requester
            .post(`/api/carts/${cartId}/products/12345678`)
            .then(result => {
                const { _body, status } = result;
                
                expect(status).to.be.equals(404);
                expect(_body.message).to.be.equals('Id not found.');
            }
        );
    });
});