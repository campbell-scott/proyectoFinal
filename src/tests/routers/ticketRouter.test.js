import chai from 'chai';
import supertest from 'supertest';
import initServer from '../index.js';
import { adminUser } from '../user.js'

const expect = chai.expect;

describe("Testing tickets Endpoints Success", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());

        const response = await this.requester.post('/api/sessions/login').send(adminUser)
        this.jwt = response._body.accessToken
        
        this.app = app;
        this.db = db;
        this.ticket = '';
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('El router debe devolver un arreglo. /api/tickets/', function () {
        return this.requester
        .get('/api/tickets/')
        .set('Authorization', `Bearer ${this.jwt}`)
        .then(result => {
            const { _body, status } = result;

            expect(status).to.be.equals(200);
            expect(Array.isArray(_body.tickets)).to.be.equals(true);
            this.ticket = _body.tickets[0]
        });
    });

    it('El router debe devolver un ticket. /api/tickets/:id', function () {
        return this.requester
            .get(`/api/tickets/${this.ticket.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.ticket.id).to.be.equals(this.ticket.id);
                expect(_body.ticket.purchaser).to.be.equals(this.ticket.purchaser);
            }
        );
    });

    it('El router debe devolver todos los tickets de un user. /api/tickets/user', function () {
        return this.requester
            .get('/api/tickets/user')
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(Array.isArray(_body.tickets)).to.be.equals(true);
            }
        );
    });
});

describe("Testing tickets Endpoints Fails", () => {
    before(async function () {
        const { app, db } = await initServer();

        this.requester = supertest(app.callback());

        const response = await this.requester.post('/api/sessions/login').send(adminUser)
        this.jwt = response._body.accessToken
        
        this.app = app;
        this.db = db;
        this.ticket = '';
    });
    after(async function () {
        await this.db.close();
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('GET /api/tickets/:id Invalid Ticket Id', function () {
        return this.requester
            .get('/api/tickets/12345678')
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;

                expect(status).to.be.equals(404);
                expect(_body.message).to.be.equals('Id not found.');
            }
        );
    });
});