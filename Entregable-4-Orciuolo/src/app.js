const express = require('express');
const ProductManager = require('./productManager');
const productsRouter = require('./routers/products.routers');
const indexRouter = require('./routers/index.routers');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/api', productsRouter);


app.listen(8080, () => {
   console.log('Server running in http://localhost:8080');
});