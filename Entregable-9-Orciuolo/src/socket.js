import { Server } from 'socket.io'
import ProductManager from './dao/mongo-productManager.js'
import CartsManager from './dao/mongo-cartsManager.js';
import MessageModel from './dao/models/message.model.js';

export const initSocket = (httpServer) => {
   const socketServer = new Server(httpServer);

   socketServer.on('connection', async (socketClient) => {
      console.log(`Nuevo cliente socket conectado: ${socketClient.id} 🖐`);

      const products = await ProductManager.getProducts();
      socketClient.emit('getProducts', products);

      socketClient.on('addProduct', async (newProduct) => {
         const postStatus = await ProductManager.addProduct(newProduct);
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
         const deleteStatus = await ProductManager.deleteProduct(parseInt(productId));

         if (deleteStatus === 200) {
            socketClient.emit('productDeleted', productId);
            console.log(`Producto: ${productId} eliminado ✔`);
            socketClient.emit('getProducts', products);
         } else {
            console.error('No se ha podido eliminar el producto ❌');
         }
      });

      //CHAT
      const messages = await MessageModel.find({});
      socketClient.emit('update-messages', messages);

      socketClient.on('new-message', async (msg) => {
         await MessageModel.create(msg);
         const messages = await MessageModel.find({});
         socketClient.emit('update-messages', messages);
      })

      //AGREGAR PRODUCTOS AL CARRITO
      socketClient.on('addProductInCart', async (data) => {
         const { pid, quantity } = data;
         const cid = '6583995bf0633ab709d9b5a0';

         const postStatus = await CartsManager.addProductsInCart({ cid, pid, quantity });

         if (postStatus === 201) {
            socketClient.emit('productAdded', pid);
            console.log(`Producto: ${pid} agregado al carrito ${cid}✔`);
         } else {
            console.error('No se ha podido agregar el producto ❌');
         }
      });

      socketClient.on('disconnect', () => {
         console.log(`Cliente socket desconectado: ${socketClient.id} 🖐`)
      });

   })

}