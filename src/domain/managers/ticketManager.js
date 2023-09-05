import container from '../../container.js';
import addTicketValidation from '../validations/ticket/addTicketValidation.js'

class TicketManager {
    constructor() {
      this.TicketRepository = container.resolve('TicketRepository');
    };
  
    async getTickets(limit, page, filter) {
      return this.TicketRepository.getTickets(limit, page, filter);
    };

    async getTicketsUser (purchaser) {
      return this.TicketRepository.getTicketsUser(purchaser);
    }
  
    async getTicket(tid) {
      return this.TicketRepository.getTicket(tid);
    };
  
    async addTicket(ticket) {
      await addTicketValidation.parseAsync(id);

      return this.TicketRepository.addTicket(ticket);
    };

    async updateTicket(tid, updates) {
      return this.TicketRepository.updateTicket(tid, updates);
    };
  };
  
  export default TicketManager;