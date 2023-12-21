import { Router } from 'express';
// import ProductManager from '../dao/productManager.js';
import ProductManager from '../dao/mongo-productManager.js';

const viewsRouter = Router();

// const producto = new ProductManager('./products.json');

viewsRouter.get('/', async (req, res) => {
   const products = await ProductManager.getProducts();
   res.render('home', { products: products.map(product => product.toJSON()),  title: "Productos"});
});

viewsRouter.get('/realtimeproducts', (req, res) => {
   res.render('realTimeProducts', { title: 'Real Time Products' });
});

viewsRouter.get('/chat', (req, res) => {
   res.render('chat', {title: 'Chat'});
})

viewsRouter.get('/products', (req, res) => {
   res.render('products', {title: 'Products'});
})

export default viewsRouter;