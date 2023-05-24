import { Router } from "express";
import ProductController from "../controllers/productControllers.js"
import ProductValidation from "../middlewares/validations/productsValidations.js"


const ProductRouter = Router()

ProductRouter.get("/", ProductController.getProducts)

ProductRouter.get("/:_id", ProductController.getProductById)

ProductRouter.post("/", ProductValidation.addProduct, ProductController.addProduct)

ProductRouter.put("/:_id", ProductValidation.updateProduct, ProductController.updateProduct)

ProductRouter.delete("/:_id", ProductController.deleteProduct)

export default ProductRouter