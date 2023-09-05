import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import ProductMongooseRepository from "../../data/repositories/mongoose/productMongooseRepository.js";

describe("Testing Product Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.productRepository = new ProductMongooseRepository();
        this.product = {
            title: faker.commerce.productName(),
            category: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: faker.number.int({ min: 10000, max: 99999 }),
            price: 15000,
            stock: 10
        };
        this.productId = ''
    });
    after(function () {
        db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El repositorio debe ser una instancia de ProductMongooseRepository', function () {
        expect(this.productRepository instanceof ProductMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.productRepository
            .getProducts(5, 1)
            .then(result => {
                expect(Array.isArray(result.products)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un product', function () {
        return this.productRepository
            .addProduct(this.product)
            .then(result =>
            {
                this.productId = result.id
                expect(result.title).to.be.equals(this.product.title);
                expect(parseInt(result.code)).to.be.equals(this.product.code);
            }
        );
    });
    it('El repositorio debe devolver un producto', function () {
        return this.productRepository
            .getProductById(this.productId)
            .then(result => {
                expect(result.title).to.be.equals(this.product.title);
                expect(parseInt(result.code)).to.be.equals(this.product.code);
            }
        );
    });
    it('El repositorio debe actualizar un producto', function () {
        const price = { price: 2500 }
        return this.productRepository
            .updateProduct(this.productId, price)
            .then(result => {
                expect(result.title).to.be.equals(this.product.title);
                expect(result.price).to.be.equal(price.price);
            }
        );
    });
    it('El repositorio debe borrar un producto', function () {
        return this.productRepository
            .deleteProduct(this.productId)
            .then(result => {
                expect(result.status).to.be.equal(false);
            }
        );
    });
});