import { Router } from 'express';
import { login, current, signup, renderResetPasswordPage, resetPassword, requestReset  } from "../controllers/sessionController.js";
import auth from "../middlewares/auth.js";
import resetPasswordAuth from '../middlewares/resetPasswordAuth.js'

const SessionRouter = Router();

SessionRouter.post('/login', login);
SessionRouter.get('/current', auth, current);
SessionRouter.post('/signup', signup);
SessionRouter.get('/reset-password', resetPasswordAuth, renderResetPasswordPage);
SessionRouter.post('/reset-password', resetPasswordAuth, resetPassword);
SessionRouter.get('/forgot-password', requestReset);

export default SessionRouter;