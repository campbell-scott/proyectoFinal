import dotenv from "dotenv";
dotenv.config();

import DbFactory from "../../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import RoleMongooseRepository from "../../data/repositories/mongoose/roleMongooseRepository.js";

describe("Testing Role Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.roleRepository = new RoleMongooseRepository();
        this.role = {
            name: "role",
            permissions: ["getUser", "getTicket"]
        };
        this.roleId = ''
    });
    after(function () {
        db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El repositorio debe ser una instancia de RoleMongooseRepository', function () {
        expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.roleRepository
            .getRoles(5, 1)
            .then(result => {
                expect(Array.isArray(result.roles)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un role', function () {
        return this.roleRepository
            .addRole(this.role)
            .then(result =>
            {
                this.roleId = result.id
                expect(result.name).to.be.equals(this.role.name);
            }
        );
    });
    it('El repositorio debe devolver un role', function () {
        return this.roleRepository
            .getRole(this.roleId)
            .then(result => {
                expect(result.name).to.be.equals(this.role.name);
            }
        );
    });
    it('El repositorio debe actualizar un role', function () {
        const newName = { name: "role2" }
        return this.roleRepository
            .updateRole(this.roleId, newName)
            .then(result => {
                expect(result.name).to.be.equal(newName.name);
            }
        );
    });
    it('El repositorio debe borrar un role', function () {
        return this.roleRepository
            .deleteRole(this.roleId)
            .then(result => {
                expect(result.acknowledged).to.be.equal(true);
                expect(result.deletedCount).to.be.equal(1);
            }
        );
    });
});