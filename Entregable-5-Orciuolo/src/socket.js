import { Server } from 'socket.io'
import ProductManager from './productManager.js';

const producto = new ProductManager('./products.json');

export const init = (httpServer) => {
   const socketServer = new Server(httpServer);

   socketServer.on('connection', async (socketClient) => {
      console.log(`Nuevo cliente socket conectado: ${socketClient.id} 🖐`);

      const products = await producto.getProducts();
      socketClient.emit('getProducts', products);

      socketClient.on('addProduct', async (newProduct) => {       
         const postStatus = await producto.addProduct(newProduct);
         console.log(newProduct);

         if (postStatus === 201) {
            socketClient.emit('productAdded', newProduct);
            console.log(`Producto: ${newProduct.title} agregado ✔`);
            socketClient.emit('getProducts', products);
         } else {
            console.error('No se ha podido agregar el producto ❌');
         }
      });

      socketClient.on('deleteProduct', async (productId) => {
         const deleteStatus = await producto.deleteProduct(parseInt(productId));

         if (deleteStatus === 200) {
            socketClient.emit('productDeleted', productId);
            console.log(`Producto: ${productId} eliminado ✔`);
            socketClient.emit('getProducts', products);
         } else {
            console.error('No se ha podido eliminar el producto ❌');
         }
      });

      socketClient.on('disconnect', () => {
         console.log(`Cliente socket desconectado: ${socketClient.id} 🖐`)
      });
   })
}