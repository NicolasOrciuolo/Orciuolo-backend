import { Router } from 'express';

const realTimeProducts = Router();

realTimeProducts.get('/realtimeproducts', (req, res) => {
   res.render('realTimeProducts', {title: 'Real Time Products'});
});

export default realTimeProducts;