import { Router } from 'express';
import CartsManager from '../dao/mongo-cartsManager.js';

const cartsRouter = Router();

cartsRouter.post('/carts', async (req, res) => {
   const postStatus = await CartsManager.addCart();

   if (postStatus === 200) {
      res.status(200).json({message: "Carrito generado exitosamente."});
   }
})

cartsRouter.get('/carts/:cid', async (req, res) => {
   const { params } = req;
   const cartId = params.cid;

   const getCart = await CartsManager.getCartByID(parseInt(cartId));

   res.status(200).json(getCart[0].products);
})

cartsRouter.post('/carts/:cid/product/:pid', async (req, res) => {
   const { body, params } = req;
   const cid = params.cid;
   const pid = params.pid;

   const cartID = parseInt(cid);
   const productID = parseInt(pid);
   const quantity = body;

   const postStatus = await CartsManager.addProductsInCart({cartID, productID, ...quantity });

   if (postStatus === 200) {
      res.status(200).json({message: "Producto agregado exitosamente."});
   } else{
      res.status(404).json({message: "Carrito no encontrado"});
   }
})

export default cartsRouter;
