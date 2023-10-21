const express = require('express');
const ProductManager = require('./productManager');
const productsRouter = require('./routers/products.routers');
const indexRouter = require('./routers/index.routers');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/api', productsRouter);


app.listen(PORT, () => {
   console.log(`Server running in http://localhost:${PORT}`);
});