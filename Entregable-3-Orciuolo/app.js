const express = require('express');
const ProductManager = require('./Entregable-3-Orciuolo');

const app = express();
app.use(express.urlencoded({ extended: true }));

const producto = new ProductManager('./products.txt');

app.get('/', (req, res) => {
   res.send('<h1>Entregable 3 - Nicolás Orciuolo</h1>')
})

app.get('/products/', async (req, res) => {
   const { query } = req;
   const { limit } = query;
   const products = await producto.getProducts();
   if (!limit) {
      res.json(products);
   } else {
      const productsLimited = products.filter((product) => product.id <= parseInt(limit));
      res.json(productsLimited);
   }
})

app.get('/products/:pid', async (req, res) => {
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

app.listen(8080, () => {
   console.log('Server running in http://localhost:8080');
});

