import { Router } from 'express';
import ProductModel from '../dao/models/products.model.js';
import CartModel from "../dao/models/carts.model.js";
import ProductManager from '../dao/mongo-productManager.js';
import CartsManager from '../dao/mongo-cartsManager.js';
import { buildResponsePaginated } from '../utils.js'


const viewsRouter = Router();

// const producto = new ProductManager('./products.json');

viewsRouter.get('/', async (req, res) => {
   if (!req.session.user) {
      return res.redirect('/login');
   }
   const products = await ProductManager.getProducts();
   res.render('home', { products: products.map(product => product.toJSON()), title: "Productos" });
});

viewsRouter.get('/realtimeproducts', (req, res) => {
   if (!req.session.user) {
      return res.redirect('/login');
   }
   res.render('realTimeProducts', { title: 'Real Time Products' });
});

viewsRouter.get('/chat', (req, res) => {
   if (!req.session.user) {
      return res.redirect('/login');
   }
   res.render('chat', { title: 'Chat' });
})

viewsRouter.get('/products', async (req, res) => {
   if (!req.session.user) {
      return res.redirect('/login');
   }
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
   res.render('products', { ...data, title: 'Productos' })
})

viewsRouter.get('/carts/:cid', async (req, res) => {
   if (!req.session.user) {
      return res.redirect('/login');
   }
   const { cid } = req.params;

   const getCart = await CartModel.find({ _id: cid }).populate('products.prodID');

   const result = getCart[0].products.map(prod => { return { title: prod.prodID.title, description: prod.prodID.description, quantity: prod.quantity, price: prod.prodID.price, total: (prod.prodID.price * prod.quantity) } })

   res.render('carts', { result, title: 'Carrito de Compras' });

});

viewsRouter.get('/login', (req, res) => {
   res.render('login', { title: 'Login' });
});

viewsRouter.get('/register', (req, res) => {
   res.render('register', { title: 'Registro' });
});

export default viewsRouter;