const { Router } = require('express');
const ProductManager = require('../productManager');
const { v4: uuidV4 } = require('uuid')


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

   if (position === -1) {
      res.status(404).json({ message: 'No se encontró el producto buscado.' });
      return;
   };

   res.status(200).json(products[position]);
})

productsRouter.post('/products', async (req, res) => {
   const { body } = req;
   const newProduct = {
      ...body,
      code: uuidV4(),
      status: true
   }
   const postStatus = await producto.addProduct(newProduct);

   if (postStatus === 201) {
      res.status(201).json(newProduct);
   } else {
      res.status(400).json({ message: "Por favor, verifique que todos los campos estén completos." })
   }
})

productsRouter.put('/products/:pid', (req, res) => {
   const { body } = req;

   
})


module.exports = productsRouter;

