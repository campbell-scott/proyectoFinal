import TicketModel from '../../models/mongoose/ticketSchema.js';

class TicketMongooseRepository {
    async getTickets(limit, page) {

        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
        };

        const tickets = await TicketModel.paginate({}, options);

        tickets.docs = tickets.docs.map(document => ({
            id: document._id,
            //code: document.code,
            purchaseDateTime: document.purchaseDateTime,
            purchaser: document.purchaser,
            amount: document.amount,
            products: document.products
        }));

        return tickets
    }

    async getTicket(tid) {
        return TicketModel.findById({ _id: tid })
    }

    async addTicket(ticket) {
        return TicketModel.create(ticket)
    }    
}

export default TicketMongooseRepository;