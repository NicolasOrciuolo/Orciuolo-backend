import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
   id: { type: Number, required: true },
   products: { type: Array, required: true } 
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);
