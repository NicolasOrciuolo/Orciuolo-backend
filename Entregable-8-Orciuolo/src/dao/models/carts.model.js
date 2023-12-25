import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
   products: [
      {
         prodID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
         quantity: { type: Number},
         _id: false
      }
   ]

}, { timestamps: true });


export default mongoose.model('Cart', CartSchema);
