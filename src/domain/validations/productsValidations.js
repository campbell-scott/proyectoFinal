import ProductModel from '../../data/models/mongoose/productSchema.js'
import { body, param } from 'express-validator'

async function checkExistingCode(code) {
    const existingCode = await ProductModel.findOne({ code })
    if (existingCode) {
      throw new Error(`The code: ${code} is already in use`)
    }
    return true
}

async function validateUniqueCode(code) {
    if (!code) {
      return true
    }
    const existingCode = await ProductModel.findOne({ code });
    if (existingCode) {
      throw new Error(`The code: ${code} is already in use`);
    }
}

export const addProductValidation = [
    body('code', 'Product code is required.')
        .trim()
        .notEmpty()
        .escape()
        .custom(async code => await checkExistingCode(code)),
    body('title', 'Product title is required.')
        .trim()
        .notEmpty()
        .escape(),
    body('description', 'Product description is required.')
        .trim()
        .notEmpty()
        .escape(),
    body('price', 'Price must be a number and is required.')
        .trim()
        .notEmpty()
        .isNumeric()
        .escape(),
    body('stock', 'Stock must be a number and is required.')
        .trim()
        .notEmpty()
        .isNumeric()
        .escape(),
    body('category', 'The category is required.')
        .trim()
        .notEmpty()
        .escape(),
];

export const updateProductValidation = [
    body()
        .custom(value => {
            if (Object.keys(value).length === 0) {
            throw new Error('No values to update.')
            }
            return true
        }),
    body('code')
        .custom(async code => await validateUniqueCode(code)),
];