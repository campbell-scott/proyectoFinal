import CartModel from '../models/cartSchema.js'

class CartDaos {
  async addCart() {
    return CartModel.create({ products: [] })
  }

  async getCart(cid) {
    return CartModel.findById({ _id: cid })
  }

  async addProduct(cid, pid) {
    const updatedCart = await CartModel.findOneAndUpdate(
      { _id: cid, 'products._id': pid },
      { $inc: { 'products.$.quantity': 1 } },
      { new: true }
    )

    if (updatedCart) {
      return updatedCart
    }
    const newCart = await CartModel.findByIdAndUpdate(
      cid,
      { $addToSet: { products: { _id: pid, quantity: 1 } } },
      { new: true }
    )
    return newCart
  }

  async deleteProduct(cid, pid) {
    return CartModel.findByIdAndUpdate(
      cid,
      { $pull: { products: { _id: pid } } },
      { new: true }
    )
  }

  async updateProductQuantity(cid, pid, quantity) {
    return CartModel.findOneAndUpdate(
      { _id: cid, 'products._id': pid },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    )
  }

  async deleteProducts(cid) {
    return CartModel.findByIdAndUpdate(
      { _id: cid },
      { $set: { products: [] } },
      { new: true }
    )
  }
}

export default CartDaos