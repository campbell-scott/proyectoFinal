import ProductModel from '../../../data/models/mongoose/productSchema.js';

async function productInCartValidation(id) {
    const existingId = await ProductModel.findById({ _id: id })
    if (!existingId) {
        throw new Error(`Id: ${id} does not belong to any product.`)
    }
    return
}
export default productInCartValidation

