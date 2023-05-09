import CartManager from '../managers/cartManager.js'
import CartValidation from '../validations/cartsValidations.js';

class CartController {
  static addCart = async (req, res) => {
    try {
      const Manager = new CartManager()
      const cart = await Manager.addCart()
      res.status(201).send({ status: 'success', payload: cart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  };

  static getCart = async (req, res) => {
    try {
      const { cid } = req.params
      const Manager = new CartManager()
      const cart = await Manager.getCart(cid)
      res.send({ status: 'success', payload: cart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  };

  static addProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params
      const Manager = new CartManager()
      CartValidation(pid)

      const cart = await Manager.addProduct(cid, pid)
      res.status(201).send({ status: 'success', payload: cart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error })
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params
      const Manager = new CartManager()
      await Manager.deleteProduct(cid, pid)
      res.status(200).send({ status: 'success' })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  };

  static updateProductQuantity = async (req, res) => {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body

      const Manager = new CartManager()
      const updatedCart = await Manager.updateProductQuantity(
        cid,
        pid,
        quantity
      )
      if (!updatedCart)
        return res
          .status(404)
          .send({ status: 'error', message: 'Carrito o producto no encontrado' })

      res.status(200).send({ status: 'success', payload: updatedCart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  };

  static deleteProducts = async (req, res) => {
    try {
      const { cid } = req.params
      const Manager = new CartManager()
      const cart = await Manager.deleteProducts(cid)
      res.send({ status: 'success', payload: cart })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  };
};

export default CartController