import { Router } from "express";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct} from "../controllers/productControllers.js"
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";


const ProductRouter = Router();

ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProductById);
ProductRouter.post("/", auth, authorization('addProduct'), addProduct);
ProductRouter.put("/:id", auth, authorization('updateProduct'), updateProduct);
ProductRouter.delete("/:id", auth, authorization('deleteProduct'), deleteProduct);

export default ProductRouter;