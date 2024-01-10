import mongoose from 'mongoose';

export const URI = "mongodb+srv://nicolasorciuolo:ZjdhIvkhp7U4Fug0@backend-orciuolo-coderh.yp5f6xy.mongodb.net/ecommerce";

export const init = async () => {
   try {
      await mongoose.connect(URI);
      console.log('Database connected succesfully 🚀');
   } catch (error) {
      console.error('Failed to connect database 😨: ',error.message);
   }
}