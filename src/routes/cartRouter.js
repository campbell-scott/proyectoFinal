import { Router } from "express";
import CartController from "../controllers/cartController.js";
import CartValidation from "../validations/cartsValidations.js";

const CartRouter = Router()

CartRouter.post( '/', CartController.addCart)

CartRouter.get('/:cid', CartController.getCart)

CartRouter.post('/:cid/products/:pid', CartController.addProduct)

CartRouter.delete('/:cid/products/:pid', CartController.deleteProduct)

CartRouter.put('/:cid/products/:pid', CartController.updateProductQuantity)

CartRouter.delete('/:cid', CartController.deleteProducts)


export default CartRouter