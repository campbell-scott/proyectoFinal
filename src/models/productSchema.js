import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    title: { type: Schema.Types.String, required: true },
    category: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    code: { type: Schema.Types.String, unique: true, required: true },
    thumbnail: { type: [Schema.Types.String], required: false },
    price: { type: Schema.Types.Number, required: true },
    stock: { type: Schema.Types.Number, required: true },
    status: { type: Schema.Types.Boolean, default: true }
});
 

const ProductModel = mongoose.model( 'products', ProductSchema);

export default ProductModel