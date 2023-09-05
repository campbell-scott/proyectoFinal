import CartModel from '../../models/mongoose/cartSchema.js'
import Cart from '../../../domain/entities/cart.js'

class CartMongooseRepository {
  async addCart() {
    const cart = await CartModel.create({ products: [] })

    return new Cart({
      id: cart?._id,
      products: cart?.products
    });
  }

  async getCart(cid) {
    const cart = await CartModel.findById({ _id: cid })

    return new Cart({
      id: cart?._id,
      products: cart?.products
    });
  }

  async addProduct(cid, pid) {
    const updatedCart = await CartModel.findOneAndUpdate(
      { _id: cid, 'products._id': pid },
      { $inc: { 'products.$.quantity': 1 } },
      { new: true }
    )

    if (updatedCart) {
      return new Cart({
        id: updatedCart?._id,
        products: updatedCart?.products
      });
    }
    const newCart = await CartModel.findByIdAndUpdate(
      cid,
      { $addToSet: { products: { _id: pid, quantity: 1 } } },
      { new: true }
    )

    return new Cart({
      id: newCart?._id,
      products: newCart?.products
    });
  }

  async deleteProduct(cid, pid) {
    const cart = await CartModel.findByIdAndUpdate(
      cid,
      { $pull: { products: { _id: pid } } },
      { new: true }
    )

    return new Cart({
      id: cart?._id,
      products: cart?.products
    });
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await CartModel.findOneAndUpdate(
      { _id: cid, 'products._id': pid },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    )

    return new Cart({
      id: cart?._id,
      products: cart?.products
    });
  }

  async deleteProducts(cid) {
    const cart = await CartModel.findByIdAndUpdate(
      { _id: cid },
      { $set: { products: [] } },
      { new: true }
    )

    return new Cart({
      id: cart?._id,
      products: cart?.products
    });
  }

  async deleteCart(cid) {
    return await CartModel.findByIdAndDelete(
      { _id: cid }
    )
  }
}

export default CartMongooseRepository