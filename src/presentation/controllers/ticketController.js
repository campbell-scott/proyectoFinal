import TicketManager from '../../domain/managers/ticketManager.js';

export const getTickets = async (req, res) => {
  try {
    const Manager = new TicketManager();
    const { limit, page } = req.query;

    const tickets = await Manager.getTickets(limit, page);

    res.status(200).send({ 
      status: 'success', 
      payload: tickets 
    });
  } catch (e) {
    next(e);
  };
};

export const getTicket = async (req, res) => {
  try {
    const Manager = new TicketManager();
    const id = req.params;

    const ticket = await Manager.getTicket(id);

    if (ticket === null) {
      res.status(404)
      res.send({ status: 'error', message: 'Product not found' })
    };

    res.status(200).send({ status: 'success', payload: ticket });
  } catch (e) {
    next(e);
  };
};
