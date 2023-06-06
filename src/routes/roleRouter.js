import { Router } from 'express';
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";
import { getRoles, getRole, addRole, updateRole, deleteRole } from "../controllers/roleController.js";


const roleRouter = Router();

roleRouter.get('/', auth, authorization('getRoles'), getRoles);
roleRouter.get('/:id', auth, authorization('getRole'), getRole);
roleRouter.post('/', auth, auth, authorization('saveRole'), addRole);
roleRouter.put('/:id', auth, authorization('updateRole'), updateRole);
roleRouter.delete('/:id', auth, authorization('deleteRole'), deleteRole);

export default roleRouter;