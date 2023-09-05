import ProductModel from '../../models/mongoose/productSchema.js'
import Product from '../../../domain/entities/product.js';
import { query } from 'express';

class ProductMongooseRepository {
  async getProducts( limit, page, filters ) {
    
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };

    const productDocuments = await ProductModel.paginate( filters, options)
    const { docs, ...pagination } = productDocuments;


    const products = docs.map(document => new Product({
      id: document._id,
      title: document.title,
      category: document.category,
      description: document.description,
      code: document.code,
      thumbnail: document.thumbnail,
      price: document.price,
      stock: document.stock,
      status: document.status,
    }));

    return { products, pagination };
  }

  async getProductById(id) {
    const product = await ProductModel.findById({ _id: id })
    if (!product) return null
    return new Product ({
      id: product._id,
      title: product.title,
      category: product.category,
      description: product.description,
      code: product.code,
      thumbnail: product.thumbnail,
      price: product.price,
      stock: product.stock,
      status: product.status
    })
  }
  
  async addProduct(newProduct) {
    const product = await ProductModel.create(newProduct)
    
    return new Product ({
      id: product._id,
      title: product.title,
      category: product.category,
      description: product.description,
      code: product.code,
      thumbnail: product.thumbnail,
      price: product.price,
      stock: product.stock,
      status: product.status
    })
  }

  async updateProduct(id, updates) {
    const product = await ProductModel.findOneAndUpdate({ _id: id }, updates, { new: true })
    
    if(!product) {
      throw new Error('Product dont exist.');
    }

    return new Product ({
      id: product?._id,
      title: product.title,
      category: product.category,
      description: product.description,
      code: product.code,
      thumbnail: product.thumbnail,
      price: product.price,
      stock: product.stock,
      status: product.status
    })
  }

  async deleteProduct(id) {
    const product = await ProductModel.findOneAndUpdate({ _id: id }, { status: false }, { new: true })

    return new Product ({
      id: product._id,
      title: product.title,
      category: product.category,
      description: product.description,
      code: product.code,
      thumbnail: product.thumbnail,
      price: product.price,
      stock: product.stock,
      status: product.status
    })
  }
}

export default ProductMongooseRepository