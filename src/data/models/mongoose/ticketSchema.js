import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const TicketSchema = new Schema({
    //code: { type: Schema.Types.String, required: true },
    purchaseDateTime: { type: Schema.Types.Date, default: Date.now },
    purchaser: { type: Schema.Types.String, required: true },
    amount: { type: Schema.Types.String, required: true },
    products: {
        type: [{
            _id: { type: Schema.Types.ObjectId, required: true, ref: 'products'  },
            quantity: { type: Schema.Types.Number, required: true },
          }],
    }
    
});
 
TicketSchema.plugin(paginate);

const TicketModel = mongoose.model( 'tickets', TicketSchema);

export default TicketModel;