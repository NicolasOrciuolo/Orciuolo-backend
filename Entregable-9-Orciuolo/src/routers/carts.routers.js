import { Router } from 'express';
import CartsManager from '../dao/mongo-cartsManager.js';

const cartsRouter = Router();

cartsRouter.post('/carts', async (req, res) => {
   const postStatus = await CartsManager.addCart();

   if (postStatus === 200) {
      res.status(200).json({ message: "Carrito generado exitosamente." });
   }
})

cartsRouter.get('/carts/:cid', async (req, res) => {
   const { params } = req;
   const cartId = params.cid;

   const getCart = await CartsManager.getCartByID(cartId);

   res.status(200).json(getCart[0].products);
})

cartsRouter.post('/carts/:cid/product/:pid', async (req, res) => {
   const { body, params } = req;
   const cid = params.cid;
   const pid = params.pid;

   const quantity = body;

   const postStatus = await CartsManager.addProductsInCart({ cid, pid, ...quantity });
   if (postStatus === 200) {
      res.status(200).json({ message: "Producto agregado exitosamente." });
   } else {
      res.status(404).json({ message: "Carrito no encontrado" });
   }
})

cartsRouter.delete('/carts/:cid/products/:pid', async (req, res) => {
   const { params } = req;
   const cid = params.cid;
   const pid = params.pid;

   const deletePID = await CartsManager.deleteProduct(cid, pid);
   if (deletePID == 200){
      res.status(deletePID).json(`Producto ID: ${pid}, eliminado correctamente 😎`);
   } else{
      res.status(deletePID).json(`No se encontró el producto ID: ${pid} en el carrito 😨`);
   }
})

cartsRouter.put('/carts/:cid', async (req, res) => {
   const { body, params } = req;
   const cid = params.cid;

   const product = body;

   const status = await CartsManager.updateCart({ cid, product });
   if (status === 200) {
      res.status(200).json({ message: "Producto actualizado exitosamente." });
   } else {
      res.status(404).json({ message: "Carrito o producto no encontrado." });
   }
})

cartsRouter.put('/carts/:cid/products/:pid', async (req, res) => {
   const { body, params } = req;
   const cid = params.cid;
   const pid = params.pid;

   const quantity = body;

   const status = await CartsManager.updateProducts({ cid, pid, ...quantity });

   if (status === 200) {
      res.status(200).json({ message: "Producto actualizado exitosamente." });
   } else {
      res.status(404).json({ message: "Carrito o producto no encontrado." });
   }
})

cartsRouter.delete('/carts/:cid', async (req, res) => {
   const { params } = req;
   const cid = params.cid;

   const deleteProducts = await CartsManager.deleteAllProducts(cid);
   if (deleteProducts == 200){
      res.status(deleteProducts).json(`Productos eliminados correctamente del carrito ID: ${cid} 😎`);
   } else{
      res.status(deleteProducts).json(`No se encontró el carrito ID: ${cid} 😨`);
   }
})

export default cartsRouter;
