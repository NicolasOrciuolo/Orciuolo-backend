const fs = require('fs');

class CartsManager {
   constructor(path) {
      this.path = path;
   }

   async addCart() {
      const cart = await getCartsFromFile(this.path);

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

      await saveCartsinFile(this.path, cart);
      console.log(`Carrito ${newID} generado exitosamente en el archivo.`);
      return 200;
   }

   async getCart() {
      const cart = await getCartsFromFile(this.path);

      const cartToShow = cart.filter((cartID) => cartID.id != "deleted");

      return cartToShow;
   }

   async addProductsInCart(productAdded) {
      const { cartID, productID, quantity } = productAdded;

      const getCart = await getCartsFromFile(this.path);

      const cartPosition = getCart.findIndex((cartFound) => cartFound.id === cartID);
      if (cartPosition === -1) {
         console.log('Carrito no encontrado.');
         return (404);
      }

      getCart[cartPosition].products.push({productID, quantity}); 

      await saveCartsinFile(this.path, getCart);
      console.log(`ID Producto: ${productID} agregado exitosamente al carrito: ${cartID}.`);
      return 200;
   }

}

const getCartsFromFile = async (path) => {
   if (!fs.existsSync(path)) {
      return [];
   }
   const content = await fs.promises.readFile(path, 'utf-8');
   return JSON.parse(content);
}

const saveCartsinFile = (path, data) => {
   const content = JSON.stringify(data, null, '\t');
   return fs.promises.writeFile(path, content, 'utf-8');
}

module.exports = CartsManager;
