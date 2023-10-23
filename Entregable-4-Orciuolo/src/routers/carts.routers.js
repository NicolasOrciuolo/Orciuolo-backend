const { Router } = require('express');
const CartsManager = require('../cartsManager');

const cartsRouter = Router();
const cart = new CartsManager('./carts.json');

cartsRouter.post('/carts', async (req, res) => {
   const postStatus = await cart.addCart();

   if (postStatus === 200) {
      res.status(200).json({message: "Carrito generado exitosamente."});
   }
})

cartsRouter.get('/carts/:cid', async (req, res) => {
   const { params } = req;
   const cartId = params.cid;

   const getCart = await cart.getCart();

   const position = getCart.findIndex((findId) => {
      return findId.id === parseInt(cartId)
   });

   if (position === -1) {
      res.status(404).json({ message: 'No se encontró el producto buscado.' });
      return;
   };

   res.status(200).json(getCart[position].products);
})

cartsRouter.post('/carts/:cid/product/:pid', async (req, res) => {
   const { body, params } = req;
   const cid = params.cid;
   const pid = params.pid;

   const cartID = parseInt(cid);
   const productID = parseInt(pid);
   const quantity = body;

   const postStatus = await cart.addProductsInCart({cartID, productID, ...quantity });

   if (postStatus === 200) {
      res.status(200).json({message: "Producto agregado exitosamente."});
   } else{
      res.status(404).json({message: "Carrito no encontrado"});
   }
})

module.exports = cartsRouter;
