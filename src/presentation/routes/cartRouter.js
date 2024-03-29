import { Router } from "express";
import { addCart, getCart, addProduct, deleteProduct, updateProductQuantity, deleteProducts, checkout } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";

const CartRouter = Router();

CartRouter.post( '/', addCart);
CartRouter.get('/:cid', getCart);
CartRouter.post('/:cid/products/:pid', addProduct);
CartRouter.delete('/:cid/products/:pid', deleteProduct);
CartRouter.put('/:cid/products/:pid', updateProductQuantity);
CartRouter.delete('/:cid', deleteProducts);
CartRouter.post('/:cid/purchase', auth, checkout)

export default CartRouter;