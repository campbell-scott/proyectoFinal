import ProductModel from '../models/productSchema.js'

class ProductDaos {
  async getProducts( limit, page ) {
    
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };
    
    const products = await ProductModel.paginate( {}, options)

    products.docs = products.docs.map(document => ({
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

    return products
  }

  async getProductById(id) {
    const product = await ProductModel.findById(id)
    if (!product) return null
    return {
      id: product._id,
      title: product.title,
      category: product.category,
      description: product.description,
      code: product.code,
      thumbnail: product.thumbnail,
      price: product.price,
      stock: product.stock,
      status: product.status
    }
  }
  
  async addProduct(newProduct) {
    const { title, category, description, code, thumbnail, price, stock } = newProduct
    return ProductModel.create({
      title,
      category,
      description,
      code,
      thumbnail,
      price,
      stock
    })
  }

  async updateProduct(id, updates) {
    return ProductModel.findByIdAndUpdate(id, updates, { new: true })
  }

  async deleteProduct(id) {
    return ProductModel.findByIdAndUpdate(id, { status: false }, { new: true })
  }
}

export default ProductDaos