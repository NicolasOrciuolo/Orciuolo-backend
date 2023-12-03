import CartModel from "./models/carts.model.js";

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
      if (!cart){
         throw new Error('Carrito no encontrado 😨');
      }
      return cart;
   }

   static async addProductsInCart(productAdded) {
      const { cartID, productID, quantity } = productAdded;

      const getCart = await CartModel.find({});

      const cartPosition = getCart.findIndex((cartFound) => cartFound.id === cartID);
      if (cartPosition === -1) {
         console.log('Carrito no encontrado.');
         return (404);
      }

      const cartSelected = getCart[cartPosition].products; //Ubico al carrito

      const findProduct = cartSelected.findIndex((cartSelectedFound) => cartSelectedFound.productID === productID); //Busco si ya estaba cargado el producto en el carrito

      if (findProduct !== -1) {
         const newQuantity = cartSelected[findProduct].quantity + quantity;
         cartSelected[findProduct].quantity = newQuantity;
         console.log(`Producto ID: ${productID} agregado exitosamente al carrito: ${cartID}. Total: ${newQuantity}`);
      } else {
         // cartSelected.push({ productID, quantity });
         await CartModel.updateOne({ id: productID }, { $quantity: quantity });

         console.log(`Producto ID: ${productID} agregado exitosamente al carrito: ${cartID}. Total: ${quantity}`);
      }

      return 200;
   }
}

export default CartsManager;
