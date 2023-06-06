import { Router } from "express";
import ProductController from "../controllers/productControllers.js"
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";


const ProductRouter = Router();

ProductRouter.get("/", ProductController.getProducts);
ProductRouter.get("/:_id", ProductController.getProductById);
ProductRouter.post("/", auth, authorization('addProduct'), ProductController.addProduct);
ProductRouter.put("/:_id", auth, authorization('updateProduct'), ProductController.updateProduct);
ProductRouter.delete("/:_id", auth, authorization('deleteProduct'), ProductController.deleteProduct);

export default ProductRouter;