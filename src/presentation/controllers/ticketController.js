import dotenv from "dotenv";
dotenv.config();

import Stripe from 'stripe';
import TicketManager from '../../domain/managers/ticketManager.js';

export const getTickets = async (req, res, next) => {
  try {
    const Manager = new TicketManager();
    const { limit, page, ...filter } = req.query;

    const tickets = await Manager.getTickets(limit, page, filter);

    res.status(200).send({ status: 'success',  tickets: tickets.docs, ...tickets, docs: undefined });
  } catch (e) {
    next(e);
  };
};

export const getTicketsUser = async (req, res, next) => {
  try {
    const Manager = new TicketManager();
    const purchaser = req.user.email;
    
    const tickets = await Manager.getTicketsUser(purchaser);

    if (tickets === null) {
      res.status(404)
      res.send({ status: 'error', message: 'Ticket not found' })
    };

    res.status(200).send({ status: 'success', tickets });
  } catch (e) {
    next(e);
  };
};

export const getTicket = async (req, res, next) => {
  try {
    const Manager = new TicketManager();
    const { id } = req.params;

    const ticket = await Manager.getTicket(id);

    if (ticket === null) {
      res.status(404)
      res.send({ status: 'error', message: 'Ticket not found' })
    };

    res.status(200).send({ status: 'success', ticket });
  } catch (e) {
    next(e);
  };
};

export const generatePaymentIntent = async (req, res, next) => {
  try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const Manager = new TicketManager();
      const { id } = req.params;

      const ticket = await Manager.getTicket(id);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: ticket.amount * 100,
        currency: 'ars',
        payment_method_types: ['card']
      });

      res.status(200).send({ clientSecret: paymentIntent.id });
  } catch (e) {
    next(e)
  }
};

export const confirmPayment = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const Manager = new TicketManager();
    const { id } = req.params;
    const { paymentToken } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentToken);
    
    if (paymentIntent.status != 'succeeded') {
      res.status(401)
      res.send({ status: 'error', message: 'Payment failed, please try again.' })
    };

    const updates = {status: 'paid'}

    const ticket = await Manager.updateTicket(id, updates);

    if (ticket === null) {
      res.status(404)
      res.send({ status: 'error', message: 'Ticket not found' })
    };

    res.status(200).send({ status: 'success', ticket });
  } catch (e) {
    next(e);
  };
};