import { Router } from 'express';
import { login, current, signup } from "../controllers/sessionController.js";
import auth from "../middlewares/auth.js";

const SessionRouter = Router();

SessionRouter.post('/login', login);
SessionRouter.get('/current', auth, current);
SessionRouter.post('/signup', signup);

export default SessionRouter;