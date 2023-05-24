import { Router } from 'express';
import auth from "../middlewares/auth.js";
import { getUsers, getUser, addUser, updateUser, deleteUser} from "../controllers/userController.js";

const UserRouter = Router();

UserRouter.get('/', getUsers);
UserRouter.get('/:id', getUser);
UserRouter.post('/', auth, addUser);
UserRouter.put('/:id', updateUser);
UserRouter.delete('/:id', deleteUser);

export default UserRouter;