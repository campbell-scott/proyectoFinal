import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import ProductRouter from "./routes/productRouter.js";
import CartRouter from './routes/cartRouter.js';
import SessionRouter from './routes/sessionRouter.js'
import UserRouter from './routes/userRouter.js'

void (async() => {
    await mongoose.connect( process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use('/api/products', ProductRouter)
    app.use('/api/carts', CartRouter)
    app.use('/api/sessions', SessionRouter);
    app.use('/api/users', UserRouter);

    app.listen(8081, () => {
      console.log('Server listening on port 8081');
    });
})();