import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from "mongoose";
import ProductRouter from "./routes/productRouter.js";
import CartRouter from './routes/cartRouter.js';

void (async() => {
    await mongoose.connect( process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/products', ProductRouter)
    app.use('/api/carts', CartRouter)

    app.listen(8081, () => {
      console.log('Server listening on port 8081');
    });
})();