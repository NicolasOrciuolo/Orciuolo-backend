import { Router } from 'express';
import ProductModel from '../dao/models/products.model.js';
import ProductManager from '../dao/mongo-productManager.js';
import { buildResponsePaginated } from '../utils.js'


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

viewsRouter.get('/products', async (req, res) => {
   const { limit = 10, page = 1, sort, query } = req.query;

   const criteria = {};
   const options = { limit, page };

   if (sort) {
      options.sort = { price: sort };
   }
   if (query) {
      criteria.category = query;
   }
   const result = await ProductModel.paginate(criteria, options);
   const data = buildResponsePaginated({ ...result, sort, query });
   res.render('products', {...data, title:'Productos'})
})

export default viewsRouter;