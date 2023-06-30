import express from 'express';
import cookieParser from "cookie-parser";

import SessionRouter from "../routes/sessionRouter.js";
import UserRouter from "../routes/userRouter.js";
import RoleRouter from "../routes/roleRouter.js";
import ProductRouter from "../routes/productRouter.js";
import CartRouter from "../routes/cartRouter.js";
import TicketRouter from "../routes/ticketRouter.js"

import errorHandler from '../middlewares/errorHandler.js';

class AppExpress {
  init() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(cookieParser());
  }

  build() {
    this.app.use('/api/products', ProductRouter)
    this.app.use('/api/carts', CartRouter)
    this.app.use('/api/sessions', SessionRouter);
    this.app.use('/api/users', UserRouter);
    this.app.use('/api/roles', RoleRouter);
    this.app.use('/api/tickets', TicketRouter);
    this.app.use(errorHandler);
  }

  listen() {
    return this.app.listen(process.env.NODE_PORT, () => {
      console.log(`Server listening on port ${process.env.NODE_PORT}`);
    });
  }
}

export default AppExpress;