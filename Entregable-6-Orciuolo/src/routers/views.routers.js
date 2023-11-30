import { Router } from 'express';
import ProductManager from '../productManager.js';

const viewsRouter = Router();

const producto = new ProductManager('./products.json');

viewsRouter.get('/', async (req, res) => {
   const products = await producto.getProducts();

   res.render('home', { title: "Productos", products });
});

viewsRouter.get('/realtimeproducts', (req, res) => {
   res.render('realTimeProducts', { title: 'Real Time Products' });
});

viewsRouter.get('/chat', (req, res) => {
   res.render('chat', {title: 'Chat'});
})

export default viewsRouter;