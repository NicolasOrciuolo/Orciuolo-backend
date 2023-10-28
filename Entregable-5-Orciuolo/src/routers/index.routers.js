const { Router } = require('express');

const indexRouter = Router();

const ProductManager = require('../productManager');
const producto = new ProductManager('./products.json');

indexRouter.get('/', async (req, res) => {
   const products = await producto.getProducts();

   res.render('home', {title: "Productos", products});
});

module.exports = indexRouter;
