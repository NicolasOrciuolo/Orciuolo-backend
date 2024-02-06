import ProductManager from "../dao/mongo-productManager.js";

export default class productsService {
   static getProducts(filter = {}){
      return ProductManager.getProducts(filter);
   }

   static create(data){
      return ProductManager.addProduct(data);
   }

   static async getById(pid){
      const result = await ProductManager.getProductById({ _id: pid });
      return result[0];
   }

   static updateByID(pid, data) {
      return result = ProductManager.updateProduct(pid, data);
   }

   static deleteByID(pid) {
      return result = ProductManager.deleteProduct(pid);
   }

}