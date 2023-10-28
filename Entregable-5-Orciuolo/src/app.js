const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const productsRouter = require('./routers/products.routers');
const cartsRouter = require('./routers/carts.routers');
const indexRouter = require('./routers/index.routers');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', indexRouter);
app.use('/api', productsRouter, cartsRouter);

app.listen(PORT, () => {
   console.log(`Server running in http://localhost:${PORT}`);
});