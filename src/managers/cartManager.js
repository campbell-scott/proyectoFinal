import CartDaos from "../daos/cartMongooseDaos.js";

class CartManager {
    constructor() {
        this.CartDaos = new CartDaos()
    }
      addCart() {
        return this.CartDaos.addCart()
      }
    
      getCart(cid) {
        return this.CartDaos.getCart(cid)
      }

      addProduct(cid, pid) {
        return this.CartDaos.addProduct(cid, pid)
      }
    
      deleteProduct(cid, pid) {
        return this.CartDaos.deleteProduct(cid, pid)
      }
    
      updateProductQuantity(cid, pid, quantity) {
        return this.CartDaos.updateProductQuantity(cid, pid, quantity)
      }
    
      deleteProducts(cid) {
        return this.CartDaos.deleteProducts(cid)
      }
}

export default CartManager