import { Router } from "express";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct} from "../controllers/productControllers.js"
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";


const ProductRouter = Router();

ProductRouter.get("/", getProducts);
ProductRouter.get("/:_id", getProductById);
ProductRouter.post("/", auth, authorization('addProduct'), addProduct);
ProductRouter.put("/:_id", auth, authorization('updateProduct'), updateProduct);
ProductRouter.delete("/:_id", auth, authorization('deleteProduct'), deleteProduct);

export default ProductRouter;