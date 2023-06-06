import { Router } from 'express';
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";
import { getUsers, getUser, addUser, updateUser, deleteUser} from "../controllers/userController.js";

const UserRouter = Router();

UserRouter.get('/', auth, authorization('getUsers'), getUsers);
UserRouter.get('/:id', auth, authorization('getUser'), getUser);
UserRouter.post('/', auth, authorization('addUsers'), addUser);
UserRouter.put('/:id', auth, authorization('updateUser'),  updateUser);
UserRouter.delete('/:id', auth, authorization('deleteUser'), deleteUser);

export default UserRouter;