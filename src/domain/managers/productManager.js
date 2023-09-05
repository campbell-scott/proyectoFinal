import container from '../../container.js';
import addProductValidation from '../validations/product/addProductsValidation.js'
import updateProductValidation from '../validations/product/updateProductsValidation.js'

class ProductManager {
  constructor() {
    this.ProductRepository = container.resolve('ProductRepository');
  };

  async getProducts(limit, page, filters) {
    return this.ProductRepository.getProducts(limit, page, filters);
  };

  async getProductById(id) {
    return this.ProductRepository.getProductById(id);
  };

  async addProduct(product) {
    await addProductValidation.parseAsync(product);

    return this.ProductRepository.addProduct(product);
  };

  async updateProduct(id, updates) {
    await updateProductValidation.parseAsync(updates);
    
    return this.ProductRepository.updateProduct(id, updates);
  };

  async deleteProduct(id) {
    return this.ProductRepository.deleteProduct(id);
  };
};

export default ProductManager;