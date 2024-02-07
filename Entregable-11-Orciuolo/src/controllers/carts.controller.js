import CartsService from "../services/carts.service.js";

export default class CartsController {
   static create() {
      return CartsService.addCart();
   }

   static async getCartByID(cid) {
      return await CartsService.getCartByID(cid);
   }

   static addProductsInCart(products) {
      return CartsService.addProductsInCart(products);
   }

   static deleteProduct(cid, pid) {
      return CartsService.deleteProduct(cid, pid);
   }

   static updateCart(product) {
      return CartsService.updateCart(product);
   }

   static updateProducts(product) {
      return CartsService.updateProducts(product);
   }

   static deleteAllProducts(cid) {
      return CartsService.deleteAllProducts(product);
   }
}