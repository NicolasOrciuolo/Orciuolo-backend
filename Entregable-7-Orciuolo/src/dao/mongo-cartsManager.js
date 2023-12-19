import CartModel from "./models/carts.model.js";
import ProductModel from "./models/products.model.js";

class CartsManager {
   static async addCart() {
      const cart = await CartModel.find({});

      //BUSCO EL ÚLTIMO ID PARA GENERAR NUEVO
      let newID;
      if (cart.length === 0) {
         newID = 1;
      } else {
         newID = cart[cart.length - 1].id + 1;
      }

      const newCart = {
         id: newID,
         products: []
      }
      cart.push(newCart);

      await CartModel.create(cart);
      console.log(`Carrito ${newID} generado exitosamente en el archivo.`);
      return 200;
   }

   static async getCartByID(cid) {
      const cart = await CartModel.find({ id: cid });
      if (!cart) {
         throw new Error('Carrito no encontrado 😨');
      }
      return cart;
   }

   static async addProductsInCart(productAdded) {
      const { cartID, productID, quantity } = productAdded;

      const getCart = await CartModel.find({ id: cartID });

      if (!getCart) {
         console.log('Carrito no encontrado.');
         return (404);
      }

      const cartSelected = getCart[0].products; //Ubico al carrito

      const findProduct = cartSelected.findIndex((cartSelectedFound) => cartSelectedFound.productID === productID); //Busco si ya estaba cargado el producto en el carrito

      if (findProduct !== -1) {
         const newQuantity = getCart[0].products[findProduct].quantity + quantity;
         cartSelected.quantity = newQuantity;
         await CartModel.updateOne({ id: cartID, 'products.productID': productID }, { $set: { 'products.$.quantity': newQuantity } });
      } else {
         const newProduct = {
            productID: productID,
            quantity: quantity
         }
         cartSelected.push(newProduct);
         await CartModel.updateOne({ id: cartID }, { $set: { products: cartSelected } });
         console.log(`Producto ID: ${productID} agregado exitosamente al carrito: ${cartID}. Total: ${quantity}`);
      }
      return 200;
   }

   static async deleteProduct(cid, pid) {
      const getCart = await CartModel.find({ id: cid });
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

      const findProduct = cartSelected.findIndex((cartSelectedFound) => cartSelectedFound.productID === pid); //Busco si ya estaba cargado el producto en el carrito

      if (findProduct == -1) {
         console.log(`No se encontró el producto ID: ${pid} en el carrito 😨`);
         return 404;
      }
      cartSelected.splice(findProduct, 1); //Elimino al producto
      await CartModel.updateOne({ id: cid }, { $set: { products: cartSelected } });
      console.log(`Producto ID: ${pid}, eliminado correctamente 😎`);
      return 200;
   }

   static async updateProducts(productUpdated) {
      const { cartID, productID, quantity } = productUpdated;

      const getCart = await CartModel.find({ id: cartID });

      if (!getCart) {
         console.log('Carrito no encontrado.');
         return (404);
      }
      const cartSelected = getCart[0].products; //Ubico al carrito
      const findProduct = cartSelected.findIndex((cartSelectedFound) => cartSelectedFound.productID === productID); //Busco si ya estaba cargado el producto en el carrito
      if (findProduct !== -1) {
         await CartModel.updateOne({ id: cartID, 'products.productID': productID }, { $set: { 'products.$.quantity': quantity } });
      } else {
         console.log('Producto no encontrado. 😨');
         return (404);
      }
      return 200;
   }

   static async deleteAllProducts(cid) {
      const getCart = await CartModel.find({ id: cid });

      if (!getCart) {
         console.log('Carrito no encontrado. 😨');
         return (404);
      }
      let cartSelected = getCart[0].products; //Ubico a los productos del carrito
      cartSelected.splice(0, cartSelected.length); //Elimino todos los productos
      await CartModel.updateOne({ id: cid }, { $set: { products: cartSelected } });
      console.log(`Productos eliminados exitosamente del carrito ID: ${cid}`);
      return 200;
   }
}

export default CartsManager;
