import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema({
    products: {
        type: [{
            _id: { type: Schema.Types.ObjectId, required: true, ref: 'products'  },
            quantity: { type: Schema.Types.Number, required: true },
          }],
        default: []
    }
});
 

const CartModel = mongoose.model( 'carts', CartSchema);

export default CartModel