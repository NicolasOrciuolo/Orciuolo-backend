import mongoose from 'mongoose';

const productItemSchema = new mongoose.Schema({
   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, { _id: false });

const CartSchema = new mongoose.Schema({
   id: { type: Number, required: true },
   products: { type: [productItemSchema], default: []}
}, { timestamps: true });

// CartSchema.pre('find', function () {
//    this.populate('products.id');
//    console.log('llegue')
// });

export default mongoose.model('Cart', CartSchema);
