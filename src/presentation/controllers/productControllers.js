import ProductManager from '../../domain/managers/productManager.js';


export const getProducts = async (req, res) => {
  try {
    const Manager = new ProductManager();
    const { limit, page } = req.query;

    const products = await Manager.getProducts(limit, page);

    res.status(200).send({ 
      status: 'success', 
      payload: products 
    });
  } catch (e) {
    next(e);
  };
};

export const getProductById = async (req, res) => {
  try {
    const Manager = new ProductManager();
    const id = req.params;

    const product = await Manager.getProductById(id);

    if (product === null) {
      res.status(404)
      res.send({ status: 'error', message: 'Product not found' })
    };

    res.status(200).send({ status: 'success', payload: product });
  } catch (e) {
    next(e);
  };
};

export const addProduct = async (req, res) => {
  try {
    const Manager = new ProductManager();

    const newProduct = req.body;
    const product = await Manager.addProduct(newProduct);

    res.status(200).send({ status: 'success', payload: product });
  } catch (e) {
    next(e);
  };
};

export const updateProduct = async (req, res) => {
  try {
    const Manager = new ProductManager();

    const id = req.params
    const updates = req.body

    const product = await Manager.updateProduct(id, updates)

    if (product === null) {
      res.status(404)
      res.send({ status: 'error', message: 'Product not found' })
    };

    res.status(200).send({ status: 'success', payload: product });
  } catch (e) {
    next(e);
  };
};

export const deleteProduct = async (req, res) => {
  try {
    const Manager = new ProductManager();
    const id = req.params;

    const product = await Manager.deleteProduct(id);

    if (product === null) {
      res.status(404)
      res.send({ status: 'error', message: 'Product not found' })
    };

    res.status(200).send({ status: 'success', payload: product });
  } catch (e) {
    next(e);
  };
};
