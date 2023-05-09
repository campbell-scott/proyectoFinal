import ProductModel from '../models/productSchema.js'

class ProductDaos {
  async getProducts(limit, category, sort) {
    const query = category ? { category } : {}
    const limitQuery = limit ? { limit } : {}
    const sortQuery = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
    const products = await ProductModel.find(query, {}, limitQuery).sort(sortQuery)

    return products.map(
      ({ _id, title, category, description, code, thumbnail, price, stock, status }) => ({
        id: _id,
        title,
        category,
        description,
        code,
        thumbnail,
        price,
        stock,
        status
      })
    )
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