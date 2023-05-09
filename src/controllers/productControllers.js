import ProductManager from "../managers/productManager.js";

class ProductController {
  static getProducts = async (req, res) => {
    try {
      const Manager = new ProductManager();
      const { limit, category, sort } = req.query

      const products = await Manager.findAll(limit, category, sort)

      res.status(200).send({ 
        status: 'success', 
        payload: products 
      })
    } catch (error) {
      res.status(500).send(error.message)
    }
  };

  static getProductById = async (req, res) => {
    try {
      const Manager = new ProductManager();
      const id = req.params
  
      const product = await Manager.findById(id)

      if (product === null) {
        res.status(404)
        res.send({ status: 'error', message: `No se encuentra el producto con id: ${id}` })
      }

      res.status(200).send({ status: 'success', payload: product })
    } catch (error) {
      res.status(500).send(error.message)
    }
  };

  static addProduct = async (req, res) => {
    try {
      const Manager = new ProductManager();

      const newProduct = req.body
      const product = await Manager.add(newProduct)

      res.status(200).send({ status: 'success', payload: product })
    } catch (error) {
      res.status(500).send(error.message)
    }
  };

  static updateProduct = async (req, res) => {
    try {
      const Manager = new ProductManager();

      const id = req.params
      const updates = req.body

      const product = await Manager.update(id, updates)

      if (product === null) {
        res.status(404)
        res.send({ status: 'error', message: `No se encuentra el producto con id: ${id}` })
      }

      res.status(200).send({ status: 'success', payload: product })
    } catch (error) {
      res.status(500).send(error.message)
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      const Manager = new ProductManager();
      const id = req.params

      const product = await Manager.delete(id)

      if (product === null) {
        res.status(404)
        res.send({ status: 'error', message: `No se encuentra el producto con id: ${id}` })
      }

      res.status(200).send({ status: 'success', payload: product })
    } catch (error) {
      res.status(500).send(error.message)
    }
  };
}

export default ProductController