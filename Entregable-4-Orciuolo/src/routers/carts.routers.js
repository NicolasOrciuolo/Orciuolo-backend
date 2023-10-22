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






module.exports = cartsRouter;
