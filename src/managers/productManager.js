import ProductDaos from '../daos/productMongooseDaos.js'

class ProductManager {
  constructor() {
    this.ProductDaos = new ProductDaos()
  }

  async findAll(limit, page) {
    return this.ProductDaos.getProducts(limit, page)
  }

  async findById(id) {
    return this.ProductDaos.getProductById(id)
  }

  async add(product) {
    return this.ProductDaos.addProduct(product)
  }

  async update(id, updates) {
    return this.ProductDaos.updateProduct(id, updates)
  }

  async delete(id) {
    return this.ProductDaos.deleteProduct(id)
  }
}

export default ProductManager