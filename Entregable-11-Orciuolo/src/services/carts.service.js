import CartsManager from '../dao/mongo-cartsManager.js'

export default class CartsService {
   static create() {
      return CartsManager.addCart();
   }

   static async getCartByID(cid) {
      return await CartsManager.getCartByID(cid);
   }

   static addProductsInCart(products) {
      return CartsManager.addProductsInCart(products);
   }

   static deleteProduct(cid, pid) {
      return CartsManager.deleteProduct(cid, pid);
   }

   static updateCart(product) {
      return CartsManager.updateCart(product);
   }

   static updateProducts(product) {
      return CartsManager.updateProducts(product);
   }

   static deleteAllProducts(cid) {
      return CartsManager.deleteAllProducts(product);
   }
}
