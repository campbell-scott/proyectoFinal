import ProductModel from "../models/productSchema.js";
import { body, param } from 'express-validator'

async function checkExistingCode(code) {
    const existingCode = await ProductModel.findOne({ code })
    if (existingCode) {
      throw new Error(`El código: ${code} ya está en uso`)
    }
    return true
}

async function validateUniqueCode(code) {
    if (!code) {
      return true
    }
    const existingCode = await ProductModel.findOne({ code });
    if (existingCode) {
      throw new Error(`El código: ${code} ya está en uso`);
    }
}

const ProductValidation = Object.freeze({
    addProduct: [
        body('code', 'El codigo del producto es necesario.')
            .trim()
            .notEmpty()
            .escape()
            .custom(async code => await checkExistingCode(code)),
        body('title', 'El titulo del producto es necesario.')
            .trim()
            .notEmpty()
            .escape(),
        body('description', 'La descripcion del producto es necesaria.')
            .trim()
            .notEmpty()
            .escape(),
        body('price', 'El precio debe ser un numero y es necesario.')
            .trim()
            .notEmpty()
            .isNumeric()
            .escape(),
        body('stock', 'El stock debe ser un numero y es necesario.')
            .trim()
            .notEmpty()
            .isNumeric()
            .escape(),
        body('category', 'La categoria es necesaria.')
            .trim()
            .notEmpty()
            .escape(),
    ],
    updateProduct: [
        param('id')
            .trim()
            .notEmpty()
            .withMessage('No hay ningun id')
            .isMongoId()
            .withMessage('Id invalido')
            .escape(),
        body('code')
            .custom(async code => await validateUniqueCode(code)),
        body()
            .custom(value => {
                if (Object.keys(value).length === 0) {
                throw new Error('No hay valores para actualizar.')
                }
                return true
            })
    ]
  })

export default ProductValidation