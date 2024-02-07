import productsService from "../services/products.service.js";

export default class ProductController {
   static getProducts(filter = {}) {
      return productsService.getProducts(filter);
   }

   static create(data) {
      return productsService.create(data)
   }

   static async getByID(pid) {
      const product = await productsService.getByID(pid);
      if (!product) {
         console.log('No se encuentra el producto.');
         return (400);
      }
      return product;
   }

   static async updateByID(pid, data) {
      const product = await productsService.getByID(pid);
      if (!product) {
         console.log('No es posible modificar el producto.');
         return (400);
      }
      return productsService.updateByID(pid, data)
   }

   static async deleteByID(pid) {
      const product = await productsService.getByID(pid);
      if (!product) {
         console.log('No es posible eliminar el producto.');
         return (400);
      }
      return productsService.deleteByID(pid)
   }
}