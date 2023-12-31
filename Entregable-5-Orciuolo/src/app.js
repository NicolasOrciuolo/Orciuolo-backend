import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';

import productsRouter from './routers/products.routers.js';
import cartsRouter from './routers/carts.routers.js';
import viewsRouter from './routers/views.routers.js';

const app = express();
import { __dirname } from './utils.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api', productsRouter, cartsRouter);

app.use((error, req, res, next) => {
   const message = `Ha ocurrido un error desconocido 😨: ,${error.message}`;
   console.error(message);
   res.status(500).json({message});
});

export default app;