import { Router } from 'express';
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";
import { getTickets, getTicket } from "../controllers/ticketController.js";

const UserRouter = Router();

UserRouter.get('/', auth, authorization('getTickets'), getTickets);
UserRouter.get('/:id', auth, authorization('getTicket'), getTicket);

export default UserRouter;