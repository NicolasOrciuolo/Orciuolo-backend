import { Router } from 'express';
import ProductModel from '../dao/models/products.model.js';
import CartModel from "../dao/models/carts.model.js";
import { buildResponsePaginated } from '../utils.js'
import { auth } from '../utils.js'
import passport from 'passport';

import ProductController from '../controllers/products.controller.js';


const viewsRouter = Router();

// const producto = new ProductManager('./products.json');

viewsRouter.get('/', auth, async (req, res) => {
   const products = await ProductController.getProducts();
   res.render('home', { products: products.map(product => product.toJSON()), title: "Productos" });
});

viewsRouter.get('/realtimeproducts', (req, res) => {
   if (!req.session.user) {
      return res.redirect('/login');
   }
   res.render('realTimeProducts', { user: req.session.user.first_name, title: 'Real Time Products' });
});

viewsRouter.get('/chat', (req, res) => {
   if (!req.session.user) {
      return res.redirect('/login');
   }
   res.render('chat', { title: 'Chat' });
})



viewsRouter.get('/products', auth, async (req, res) => {

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
   res.render('products', { ...data, user: req.user.first_name, title: 'Productos' })
})

viewsRouter.get('/carts/:cid', passport.authenticate('jwt', { session: false }), async (req, res) => {
   if (!req.user) {
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