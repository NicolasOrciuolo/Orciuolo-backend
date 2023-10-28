import { Router } from 'express';
import ProductManager from '../productManager.js';

const indexRouter = Router();

const producto = new ProductManager('./products.json');

indexRouter.get('/', async (req, res) => {
   const products = await producto.getProducts();

   res.render('home', {title: "Productos", products});
});

export default indexRouter;
