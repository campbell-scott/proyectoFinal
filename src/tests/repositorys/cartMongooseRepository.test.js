import dotenv from "dotenv";
dotenv.config();

import DbFactory from "../../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import CartMongooseRepository from "../../data/repositories/mongoose/cartMongooseRepository.js";

describe("Testing Cart Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.cartRepository = new CartMongooseRepository();
        this.product1 = "64584b2f2b5f76052b7a6a85";
        this.product2 = "64584b812b5f76052b7a6a87";
        this.cartId = ''
    });
    after(function () {
        db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El repositorio debe ser una instancia de CartMongooseRepository', function () {
        expect(this.cartRepository instanceof CartMongooseRepository).to.be.ok;
    });
    it('El repositorio debe poder crear un carrito', function () {
        return this.cartRepository
            .addCart()
            .then(result => {
                this.cartId = result.id
                
                expect(result).to.have.property('id');
                expect(result.products).to.be.an('array');
                expect(result.products).to.have.lengthOf(0);
            }
        );
    });
    it('El repositorio debe devolver un carrito', function () {
        return this.cartRepository
            .getCart(this.cartId)
            .then(result => {
                expect(result).to.have.property('id');
                expect(result.products).to.be.an('array');
                expect(result.products).to.have.lengthOf(0);
            }
        );
    });
    it('El repositorio debe agregar un producto1 a un carrito', function () {
        return this.cartRepository
            .addProduct(this.cartId, this.product1)
            .then(result => {
                expect(result.products[0].id).to.be.equal(this.product1);
                expect(result.products[0].quantity).to.be.equal(1);
            }
        );
    });
    it('El repositorio debe agregar un producto2 a un carrito', function () {
        return this.cartRepository
            .addProduct(this.cartId, this.product2)
            .then(result => {
                expect(result.products[1].id).to.be.equal(this.product2);
                expect(result.products[1].quantity).to.be.equal(1);
            }
        );
    });
    it('El repositorio debe borrar un producto de un carrito', function () {
        return this.cartRepository
            .deleteProduct(this.cartId, this.product1)
            .then(result => {
                expect(result.products[0].id).to.be.equal(this.product2);
            }
        );
    });
    it('El repositorio debe actualizar la cantidad de un producto de un carrito', function () {
        const newQuantity = 3

        return this.cartRepository
            .updateProductQuantity(this.cartId, this.product2, newQuantity)
            .then(result => {
                expect(result.products[0].quantity).to.be.equal(newQuantity);
            }
        );
    });
    it('El repositorio debe borrar todos los productos de un carrito', function () {
        return this.cartRepository
            .deleteProducts(this.cartId)
            .then(result => {
                expect(result.products).to.be.empty
            }
        );
    });
});