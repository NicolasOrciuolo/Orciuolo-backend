import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import sessions from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import { URI } from './db/mongodb.js'
import { init as initPassport } from './config/passport.config.js'

import productsRouter from './routers/products.routers.js';
import cartsRouter from './routers/carts.routers.js';
import viewsRouter from './routers/views.routers.js';
import sessionsRouter from './routers/sessions.routers.js';

const SESSION_SECRET = '$7qdkC5bd*5xas';

const app = express();
import { __dirname } from './utils.js';

app.use(sessions({
   store: MongoStore.create({
      mongoUrl: URI,
      mongoOptions: {},
      ttl: 150
   }),
   secret: SESSION_SECRET,
   resave: true,
   saveUninitialized: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter, sessionsRouter);
app.use('/api', productsRouter, cartsRouter);

app.use((error, req, res, next) => {
   const message = `Ha ocurrido un error desconocido 😨: ,${error.message}`;
   console.error(message);
   res.status(500).json({ message });
});

export default app;