import CartModel from "./models/carts.model.js";
import ProductModel from "./models/products.model.js";

class CartsManager {
   static async addCart() {
      const cart = await CartModel.find({});

      const newCart = {
         prodID: 0,
         quantity: 0
      }
      cart.push(newCart);

      await CartModel.create(cart);
      console.log(`Carrito generado exitosamente en el archivo.`);
      return 200;
   }

   static async getCartByID(cid) {
      const cart = await CartModel.find({ _id: cid }).populate('products.prodID');
      if (!cart) {
         throw new Error('Carrito no encontrado 😨');
      }
      return cart;
   }

   static async addProductsInCart(productAdded) {
      const { cid, pid, quantity } = productAdded;

      const getCart = await CartModel.findById({ _id: cid });

      if (!getCart) {
         console.log('Carrito no encontrado.');
         return (404);
      }

      const cartSelected = getCart[0].products; //Ubico al carrito

      const findProduct = cartSelected.findIndex((cartSelectedFound) => cartSelectedFound.prodID === pid); //Busco si ya estaba cargado el producto en el carrito

      if (findProduct !== -1) {
         const newQuantity = cartSelected[findProduct].quantity + quantity;
         cartSelected[findProduct].quantity = newQuantity;
         await CartModel.updateOne({ _id: cid, 'products.prodID': pid }, { $set: { 'products.$.quantity': newQuantity } });
         console.log(`Producto ID: ${pid} actualizado exitosamente al carrito: ${cid}. Total: ${newQuantity}`);

      } else {
         const newProduct = {
            prodID: pid,
            quantity: quantity
         }
         cartSelected.push(newProduct);
         await CartModel.updateOne({ _id: cid }, { $set: { products: cartSelected } });
         console.log(`Producto ID: ${pid} agregado exitosamente al carrito: ${cid}. Total: ${quantity}`);
      }
      return 200;
   }

   static async deleteProduct(cid, pid) {
      const getCart = await CartModel.find({ _id: cid });
      const getProduct = await ProductModel.find({ id: pid });

      if (!getCart) {
         console.log('Carrito no encontrado. 😨');
         return (404);
      }
      if (!getProduct) {
         console.log('Producto no encontrado. 😨');
         return (404);
      }

      const cartSelected = getCart[0].products; //Ubico al carrito

      const findProduct = cartSelected.findIndex((cartSelectedFound) => cartSelectedFound.prodID === pid); //Busco si ya estaba cargado el producto en el carrito

      if (findProduct == -1) {
         console.log(`No se encontró el producto ID: ${pid} en el carrito 😨`);
         return 404;
      }
      cartSelected.splice(findProduct, 1); //Elimino al producto
      await CartModel.updateOne({ _id: cid }, { $set: { products: cartSelected } });
      console.log(`Producto ID: ${pid}, eliminado correctamente 😎`);
      return 200;
   }

   static async updateCart(productUpdated) {
      const { cid, product } = productUpdated;

      const getCart = await CartModel.find({ _id: cid });

      if (!getCart) {
         console.log('Carrito no encontrado.');
         return (404);
      }

      await CartModel.updateOne({ _id: cid }, { $set: { products: product } });
      return (200);
   }

   static async updateProducts(productUpdated) {
      const { cid, productID, quantity } = productUpdated;

      const getCart = await CartModel.find({ _id: cid });

      if (!getCart) {
         console.log('Carrito no encontrado.');
         return (404);
      }
      const cartSelected = getCart[0].products; //Ubico al carrito
      const findProduct = cartSelected.findIndex((cartSelectedFound) => cartSelectedFound.prodID === pid); //Busco si ya estaba cargado el producto en el carrito
      if (findProduct !== -1) {
         await CartModel.updateOne({ _id: cid, 'products.prodID': pid }, { $set: { 'products.$.quantity': quantity } });
      } else {
         console.log('Producto no encontrado. 😨');
         return (404);
      }
      return 200;
   }

   static async deleteAllProducts(cid) {
      const getCart = await CartModel.find({ _id: cid });

      if (!getCart) {
         console.log('Carrito no encontrado. 😨');
         return (404);
      }
      let cartSelected = getCart[0].products; //Ubico a los productos del carrito
      cartSelected.splice(0, cartSelected.length); //Elimino todos los productos
      await CartModel.updateOne({ _id: cid }, { $set: { products: cartSelected } });
      console.log(`Productos eliminados exitosamente del carrito ID: ${cid}`);
      return 200;
   }
}

export default CartsManager;
