import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
   id: { type: Number, required: true },
   title: { type: String, required: true },
   description: { type: String, required: true },
   code: { type: String, required: true },
   price: { type: String, required: true },
   status: { type: String, required: true },
   stock: { type: Number, required: true },
   category: { type: String, required: true },
   thumbnail: { type: String },   
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
