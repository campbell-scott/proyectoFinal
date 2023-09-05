import dotenv from "dotenv";
dotenv.config();

import AppFactory from "./presentation/factories/appFactory.js";
import DbFactory from "./data/factories/dbFactory.js";

import cron from 'node-cron';
import { deleteInactiveUsers } from './presentation/cron/inactiveUsers.js'

void (async() => {
  const db = DbFactory.create(process.env.DB);
  db.init(process.env.DB_URI);

  const app = AppFactory.create();

  app.init();
  app.build();
  app.listen();

  cron.schedule('0 0 * * *', async () => { await deleteInactiveUsers() });
})();