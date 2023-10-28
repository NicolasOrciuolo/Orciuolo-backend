const { Router } = require('express');

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
   res.status(200).send('<h1>Primera Pre-entrega curso Backend - Nicolás Orciuolo</h1>')
});

module.exports = indexRouter;
