import mongoose, { Schema } from 'mongoose';

const cartSubSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
}, { _id: false });

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false },
  password: { type: String, required: true },
  cart: { type: cartSubSchema },
  role: { type: String, default: 'user' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);