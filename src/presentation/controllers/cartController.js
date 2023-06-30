import CartManager from '../../domain/managers/cartManager.js'
import { loginToPurchase } from "../controllers/sessionController.js";


export const addCart = async (req, res, next) => {
  try {
    const Manager = new CartManager();
    const cart = await Manager.addCart();
    res.status(201).send({ status: 'success', payload: cart });
  } catch (e) {
    next(e);
  };
};

export const getCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const Manager = new CartManager();
    const cart = await Manager.getCart(cid);

    if (!cart) {
      return res
        .status(404)
        .send({ status: 'error', message: 'Cart not found' });
    }

    res.send({ status: 'success', payload: cart });
  } catch (e) {
    next(e);
  };
};

export const addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    const Manager = new CartManager();
    const cart = await Manager.addProduct(cid, pid);
    
    res.status(201).send({ status: 'success', payload: cart });
  } catch (e) {
    next(e);
  };
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const Manager = new CartManager();
    await Manager.deleteProduct(cid, pid);
    res.status(200).send({ status: 'success' });
  } catch (e) {
    next(e);
  };
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const Manager = new CartManager()
    const updatedCart = await Manager.updateProductQuantity(
      cid,
      pid,
      quantity
    );

    if (!updatedCart) {
      return res
        .status(404)
        .send({ status: 'error', message: 'Cart or Product not found' });
    }

    res.status(200).send({ status: 'success', payload: updatedCart });
  } catch (e) {
    next(e);
  };
};

export const deleteProducts = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const Manager = new CartManager();
    const cart = await Manager.deleteProducts(cid);
    res.send({ status: 'success', payload: cart });
  } catch (e) {
    next(e);
  };
};

export const checkout = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { email, password } = req.body;

    loginToPurchase(email, password)

    const Manager = new CartManager();
    const purchase = await Manager.checkout(cid, email);

    res.send({ status: 'success', payload: purchase });
  } catch (e) {
    next(e);
  };
};
