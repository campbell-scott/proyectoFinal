import dotenv from "dotenv";
dotenv.config();

import DbFactory from "../../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import TicketMongooseRepository from "../../data/repositories/mongoose/ticketMongooseRepository.js";

describe("Testing Ticket Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.ticketRepository = new TicketMongooseRepository();
        this.ticket = {
            purchaser: "admin@admin.com",
            amount: 3970,
            products: [{ "_id": "64584b2f2b5f76052b7a6a85", "quantity": 1 }, { "_id": "64c86329d4e80399178ceead", "quantity": 1 }]
        };
        this.ticketId = ''
    });
    after(function () {
        db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El repositorio debe ser una instancia de TicketMongooseRepository', function () {
        expect(this.ticketRepository instanceof TicketMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.ticketRepository
            .getTickets(5, 1)
            .then(result => {
                expect(Array.isArray(result.tickets)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un ticket', function () {
        return this.ticketRepository
            .addTicket(this.ticket)
            .then(result =>
            {
                this.ticketId = result.id
                expect(result.firstName).to.be.equals(this.ticket.firstName);
                expect(result.email).to.be.equals(this.ticket.email);
            }
        );
    });
    it('El repositorio debe devolver un ticket', function () {
        return this.ticketRepository
            .getTicket(this.ticketId)
            .then(result => {
                expect(result.purchaser).to.be.equal(this.ticket.purchaser);
                expect(parseInt(result.amount)).to.be.equal(this.ticket.amount);
            }
        );
    });
    it('El repositorio debe devolver todos los tickets de un usario', function () {
        return this.ticketRepository
            .getTicketsUser(this.ticket.purchaser)
            .then(result => {
                const tickets = result;

                for (const ticket of tickets) {
                    expect(ticket.purchaser).to.equal(this.ticket.purchaser);
                }
            }
        );
    });
});