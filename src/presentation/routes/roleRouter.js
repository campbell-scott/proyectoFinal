import { Router } from 'express';
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";
import { getRoles, getRole, addRole, updateRole, deleteRole } from "../controllers/roleController.js";


const RoleRouter = Router();

RoleRouter.get('/:id', auth, authorization('getRole'), getRole);
RoleRouter.get('/', auth, authorization('getRoles'), getRoles);
RoleRouter.post('/', auth, authorization('addRole'), addRole);
RoleRouter.put('/:id', auth, authorization('updateRole'), updateRole);
RoleRouter.delete('/:id', auth, authorization('deleteRole'), deleteRole);

export default RoleRouter;