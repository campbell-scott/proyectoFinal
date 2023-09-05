import TicketModel from '../../models/mongoose/ticketSchema.js';
import Ticket from '../../../domain/entities/ticket.js';

class TicketMongooseRepository {
    async getTickets(limit, page, filter) {

        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
        };

        const ticketDocuments = await TicketModel.paginate(filter, options);
        const { docs, ...pagination } = ticketDocuments;

        const tickets = docs.map(document => new Ticket({
            id: document._id,
            purchaseDateTime: document.purchaseDateTime,
            purchaser: document.purchaser,
            amount: document.amount,
            status: document.status,
            products: document.products
        }));

        return { tickets, pagination }
    }

    async getTicketsUser(purchaser) {
        const tickets = await TicketModel.find({ purchaser });

        return tickets.map(ticket => new Ticket({
            id: ticket._id,
            purchaseDateTime: ticket.purchaseDateTime,
            purchaser: ticket.purchaser,
            amount: ticket.amount,
            status: ticket.status,
            products: ticket.products
        }));
    }

    async getTicket(tid) {
        const ticket = await TicketModel.findById({ _id: tid })

        if(!ticket) {
            throw new Error('Ticket dont exist.');
        }

        return {
            id: ticket._id,
            purchaseDateTime: ticket.purchaseDateTime,
            purchaser: ticket.purchaser,
            amount: ticket.amount,
            status: ticket.status,
            products: ticket.products
        }
    }

    async addTicket(ticket) {
        const newTicket = await TicketModel.create(ticket)

        return {
            id: newTicket._id,
            purchaseDateTime: newTicket.purchaseDateTime,
            purchaser: newTicket.purchaser,
            amount: newTicket.amount,
            status: newTicket.status,
            products: newTicket.products
        }
    }

    async updateTicket(tid, updates) {
        const ticket = await TicketModel.findByIdAndUpdate({ _id: tid }, updates)

        return {
            id: ticket._id,
            purchaseDateTime: ticket.purchaseDateTime,
            purchaser: ticket.purchaser,
            amount: ticket.amount,
            status: ticket.status,
            products: ticket.products
        }
    }   
}

export default TicketMongooseRepository;