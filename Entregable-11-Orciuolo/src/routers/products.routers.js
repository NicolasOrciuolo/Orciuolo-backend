import { Router } from 'express';
import ProductModel from '../dao/models/products.model.js';
import { v4 as uuidv4 } from 'uuid';
import { buildResponsePaginated } from '../utils.js'

import ProductController from '../controllers/products.controller.js';

const productsRouter = Router();

productsRouter.get('/products', async (req, res) => {
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
   res.status(200).json(buildResponsePaginated({ ...result, sort, query }));
})

productsRouter.get('/products/:pid', async (req, res) => {
   const { params } = req;
   const productId = params.pid;

   const products = await ProductController.getProducts();

   const position = products.findIndex((findId) => {
      return findId.id === parseInt(productId)
   });

   if (position === -1) {
      res.status(404).json({ message: 'No se encontró el producto buscado.' });
      return;
   };

   res.status(200).json(products[position]);
})

productsRouter.post('/products', async (req, res) => {
   const { body } = req;
   const newProduct = {
      ...body,
      code: uuidv4(),
      status: true
   }
   const postStatus = await ProductController.addProduct(newProduct);

   if (postStatus === 201) {
      res.status(201).json(newProduct);
   } else {
      res.status(400).json({ message: "Por favor, verifique que todos los campos estén completos." })
   }
})

productsRouter.put('/products/:pid', async (req, res) => {
   const { body, params } = req;
   const id = params.pid;

   const putStatus = await ProductController.updateProduct(parseInt(id), body);

   if (putStatus === 200) {
      res.status(200).json({ message: "Producto actualizado exitosamente." });
   } else if (putStatus === 404) {
      res.status(404).json({ message: "No se encontró el producto." })
   } else {
      res.status(400).json({ message: "No se permite modificar el ID de un producto." })
   }
})

productsRouter.delete('/products/:pid', async (req, res) => {
   const { params } = req;
   const pid = params.pid;

   const deleteStatus = await ProductController.deleteProduct(pid);

   if (deleteStatus === 200) {
      res.status(200).json({ message: "Producto eliminado exitosamente." });
   } else {
      res.status(404).json({ message: "No se encontró el producto." })
   }
})

export default productsRouter;

