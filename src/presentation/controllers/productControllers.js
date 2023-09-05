import ProductManager from '../../domain/managers/productManager.js';


export const getProducts = async (req, res, next) => {
  try {
    const Manager = new ProductManager();
    const { limit, page, ...filter } = req.query;

    const products = await Manager.getProducts(limit, page, filter);

    res.status(200).send({ status: 'success', products: products.docs, ...products, docs: undefined });
  } catch (e) {
    next(e);
  };
};

export const getProductById = async (req, res, next) => {
  try {
    const Manager = new ProductManager();
    const  { id } = req.params;

    const product = await Manager.getProductById(id);

    if (product === null) {
      res.status(404)
      res.send({ status: 'error', message: 'Product not found' })
    };

    res.status(200).send({ status: 'success', product });
  } catch (e) {
    next(e);
  };
};

export const addProduct = async (req, res, next) => {
  try {
    const Manager = new ProductManager();

    const newProduct = req.body;
    const product = await Manager.addProduct(newProduct);

    res.status(200).send({ status: 'success', product });
  } catch (e) {
    next(e);
  };
};

export const updateProduct = async (req, res, next) => {
  try {
    const Manager = new ProductManager();

    const { id } = req.params
  
    const result = await Manager.updateProduct(id, req.body)

    res.status(200).send({ status: 'success', result, message: 'Product updated.' });
  } catch (e) {
    next(e);
  };
};

export const deleteProduct = async (req, res, next) => {
  try {
    const Manager = new ProductManager();
    const { id } = req.params;

    const result = await Manager.deleteProduct(id);

    res.status(200).send({ status: 'success', result, message: 'Product deleted.' });
  } catch (e) {
    next(e);
  };
};
