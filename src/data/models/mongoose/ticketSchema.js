import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const TicketSchema = new Schema({
    purchaseDateTime: { type: Schema.Types.Date, default: Date.now },
    purchaser: { type: Schema.Types.String, required: true },
    amount: { type: Schema.Types.Number, required: true },
    status: { type: Schema.Types.String, default: 'confirmed'},
    products: {
        type: [{
            _id: { type: Schema.Types.ObjectId, required: true, index: true, ref: 'products'  },
            quantity: { type: Schema.Types.Number, required: true },
          }],
    }
});
 
TicketSchema.plugin(paginate);

TicketSchema.pre('find', function () {
    this.populate(['products._id']);
});

TicketSchema.pre('findOne', function () {
    this.populate(['products._id']);
});

const TicketModel = mongoose.model( 'tickets', TicketSchema);

export default TicketModel;