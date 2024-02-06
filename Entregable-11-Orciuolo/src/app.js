import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import sessions from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParse from 'cookie-parser';
import config from './config/config.js';

import { init as initPassport } from './config/passport.config.js'

import productsRouter from './routers/products.routers.js';
import cartsRouter from './routers/carts.routers.js';
import viewsRouter from './routers/views.routers.js';
import authRouter from './routers/auth.router.js';

const COOKIE_SECRET = process.env.cookieSecret;

const app = express();
import { __dirname } from './utils.js';

app.use(cookieParse());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassport();
app.use(passport.initialize());

app.use('/', viewsRouter, authRouter);
app.use('/api', productsRouter, cartsRouter);

app.use((error, req, res, next) => {
   const message = `Ha ocurrido un error desconocido 😨: ,${error.message}`;
   console.error(message);
   res.status(500).json({ message });
});

export default app;