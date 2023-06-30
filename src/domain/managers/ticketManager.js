import container from '../../container.js';

class TicketManager {
    constructor() {
      this.TicketRepository = container.resolve('TicketRepository');
    };
  
    async getTickets(limit, page) {
      return this.TicketRepository.getTickets(limit, page);
    };
  
    async getTicket(tid) {
      return this.TicketRepository.getTicket(tid);
    };
  
    async addTicket(ticket) {
      return this.TicketRepository.addTicket(ticket);
    };
  };
  
  export default TicketManager;