import mongoose from 'mongoose';
import config from "../config/config.js"

export const URI = config.mongodbUri;

export const init = async () => {
   try {
      await mongoose.connect(URI);
      console.log('Database connected succesfully 🚀');
   } catch (error) {
      console.error('Failed to connect database 😨: ',error.message);
   }
}