import container from '../../container.js';
import { generateTicketMail } from '../../shared/index.js';

class CartManager {
  constructor() {
    this.CartRepository = container.resolve('CartRepository'); 
    this.ProductRepository = container.resolve('ProductRepository');
    this.TicketRepository = container.resolve('TicketRepository');
  }

  async addCart() {
    return this.CartRepository.addCart();
  };

  async getCart(cid) {
    return this.CartRepository.getCart(cid);
  };

  async addProduct(cid, pid) {
    return this.CartRepository.addProduct(cid, pid);
  };

  async deleteProduct(cid, pid) {
    return this.CartRepository.deleteProduct(cid, pid);
  };

  async updateProductQuantity(cid, pid, quantity) {
    return this.CartRepository.updateProductQuantity(cid, pid, quantity);
  };

  async deleteProducts(cid) {
    return this.CartRepository.deleteProducts(cid);
  };

  async checkout(cid, email) {
    const cart = await this.CartRepository.getCart(cid);

    let totalAmount = 0

    for (const product of cart.products) {
      const productStock = await this.ProductRepository.getProductById(product._id)
      
      if (productStock.stock === 0) {
        return new Error(`Product ${productStock.title} out of stock.`);
      }

      if (productStock.stock - product.quantity < 0) {
        return new Error(`We only have ${productStock.stock} in stock of ${productStock.title}.`);
      }

      totalAmount += productStock.price * product.quantity

      const newStock = productStock.stock - product.quantity
      const updateData = {
        stock: newStock,
        status: newStock === 0 ? false : true
      }

      await this.ProductRepository.updateProduct(product._id, updateData);
    }
    
    const ticket =  await this.TicketRepository.addTicket({
      purchaser: email,
      amount: totalAmount,
      products: cart.products
    })

    generateTicketMail(ticket)
    return ticket
  }
};

export default CartManager;  