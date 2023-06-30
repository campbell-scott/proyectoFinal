import container from '../../container.js';

class ProductManager {
  constructor() {
    this.ProductRepository = container.resolve('ProductRepository');
  };

  async getProducts(limit, page) {
    return this.ProductRepository.getProducts(limit, page);
  };

  async getProductById(id) {
    return this.ProductRepository.getProductById(id);
  };

  async addProduct(product) {
    return this.ProductRepository.addProduct(product);
  };

  async updateProduct(id, updates) {
    return this.ProductRepository.updateProduct(id, updates);
  };

  async deleteProduct(id) {
    return this.ProductRepository.deleteProduct(id);
  };
};

export default ProductManager;