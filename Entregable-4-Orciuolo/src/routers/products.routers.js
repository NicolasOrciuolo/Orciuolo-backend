const { Router } = require('express');
const ProductManager = require('../productManager');


const productsRouter = Router();
const producto = new ProductManager('./products.json');


productsRouter.get('/products', async (req, res) => {
   const { query } = req;
   const { limit } = query;
   const products = await producto.getProducts();
   if (!limit) {
      res.status(200).json(products);
   } else {
      const productsLimited = products.filter((product) => product.id <= parseInt(limit));
      res.status(200).json(productsLimited);
   }
})

productsRouter.get('/products/:pid', async (req, res) => {
   const { params } = req;
   const productId = params.pid;

   const products = await producto.getProducts();

   const position = products.findIndex((findId) => {
      return findId.id === parseInt(productId)
   });

   if (position === -1){
      res.status(404).json({message: 'No se encuentró el producto buscado.'});
      return;
   };

   res.status(200).json(products[position]);
})



module.exports = productsRouter;

