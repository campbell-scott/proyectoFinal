import { Router } from 'express';
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";
import { getTickets, getTicket, getTicketsUser, generatePaymentIntent, confirmPayment } from "../controllers/ticketController.js";

const UserRouter = Router();

UserRouter.get('/', auth, authorization('getTickets'), getTickets);
UserRouter.get('/user', auth, getTicketsUser);
UserRouter.get('/:id', auth, authorization('getTicket'), getTicket);
UserRouter.post('/payment/:id', auth, generatePaymentIntent);
UserRouter.put('/:id', auth, confirmPayment);

export default UserRouter;