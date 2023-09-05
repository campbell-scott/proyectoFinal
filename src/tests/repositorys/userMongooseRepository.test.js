import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import UserMongooseRepository from "../../data/repositories/mongoose/userMongooseRepository.js";

describe("Testing User Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.userRepository = new UserMongooseRepository();
        this.user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };
        this.userId = ''
    });
    after(function () {
        db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.userRepository
            .getUsers(5, 1)
            .then(result => {
                expect(Array.isArray(result.users)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un user', function () {
        return this.userRepository
            .addUser(this.user)
            .then(result =>
            {
                this.userId = result.id
                expect(result.firstName).to.be.equals(this.user.firstName);
                expect(result.email).to.be.equals(this.user.email);
            }
        );
    });
    it('El repositorio debe devolver un usuario', function () {
        return this.userRepository
            .getUser(this.userId)
            .then(result => {
                expect(result.firstName).to.be.equal(this.user.firstName);
                expect(result.lastName).to.be.equal(this.user.lastName);
                expect(result.email).to.be.equal(this.user.email);
            }
        );
    });
    it('El repositorio debe actualizar un usuario', function () {
        const age = { age: 25 }
        return this.userRepository
            .updateUser(this.userId, age)
            .then(result => {
                expect(result.email).to.be.equal(this.user.email);
                expect(result.age).to.be.equal(age.age);
            }
        );
    });
    it('El repositorio debe borrar un usuario', function () {
        return this.userRepository
            .deleteUser(this.userId)
            .then(result => {
                expect(result.acknowledged).to.be.equal(true);
                expect(result.deletedCount).to.be.equal(1);
            }
        );
    });
});