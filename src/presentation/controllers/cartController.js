import CartManager from '../../domain/managers/cartManager.js'

export const addCart = async (req, res, next) => {
  try {
    const Manager = new CartManager();
    const cart = await Manager.addCart();
    res.status(200).send({ status: 'success', cart });
  } catch (e) {
    next(e);
  };
};

export const getCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const Manager = new CartManager();
    const cart = await Manager.getCart(cid);
    
    if (!cart.id) {
      return res
        .status(404)
        .send({ status: 'error', message: 'Cart not found' });
    }

    res.status(200).send({ status: 'success', cart });
  } catch (e) {
    next(e);
  };
};

export const addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    const Manager = new CartManager();
    const cart = await Manager.addProduct(cid, pid);
    
    res.status(200).send({ status: 'success', cart });
  } catch (e) {
    next(e);
  };
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const Manager = new CartManager();
    const cart = await Manager.deleteProduct(cid, pid);
    res.status(200).send({ status: 'success', cart });
  } catch (e) {
    next(e);
  };
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const Manager = new CartManager()
    const cart = await Manager.updateProductQuantity(
      cid,
      pid,
      quantity
    );

    if (!cart) {
      return res
        .status(404)
        .send({ status: 'error', message: 'Cart or Product not found' });
    }

    res.status(200).send({ status: 'success', cart });
  } catch (e) {
    next(e);
  };
};

export const deleteProducts = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const Manager = new CartManager();
    const cart = await Manager.deleteProducts(cid);
    res.send({ status: 'success', cart });
  } catch (e) {
    next(e);
  };
};

export const checkout = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const user = req.user

    const Manager = new CartManager();
    const purchase = await Manager.checkout(cid, user.email);
    
    res.status(200).send({ status: 'success', purchase });
  } catch (e) {
    next(e);
  };
};
