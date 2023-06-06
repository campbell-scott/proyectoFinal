import ProductModel from "../models/productSchema.js";
//import { param } from 'express-validator'



async function CartValidation(id) {
    const existingId = await ProductModel.findById({ _id: id })
    if (!existingId) {
        console.log('hola')
        throw new Error(`El id: ${id} no pertenece a ningun producto.`)
    }
    return true
}
export default CartValidation



/*
async function checkExistingId(id) {
    const existingId = await ProductModel.findById({ _id: id })
    if (!existingId) {
        console.log('hola')
        throw new Error(`El id: ${id} no pertenece a ningun producto.`)
    }
    return true
}

const CartValidation = Object.freeze({
    addProduct: [
        param('cid')
            .isMongoId(),
        param('pid')
            .isMongoId()
            .custom(async pid => {
                await checkExistingId(pid)
                return true
            })
      ], 
            
  })

export default CartValidation
*/