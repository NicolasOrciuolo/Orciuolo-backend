import { Router } from 'express';
import ProductManager from '../productManager.js';
import { v4 as uuidv4 } from 'uuid';

const productsRouter = Router();
const producto = new ProductManager('./products.json');

productsRouter.get('/products', async (req, res) => {
   const { query } = req;
   const { limit } = query;
   const products = await producto.getProducts();
   if (!limit) {
      res.status(200).json(products);
   } else {
      const productsLimited = products.filter((product) => product.id <= parseInt(limit));
      res.status(200).json(productsLimited);
   }
})

productsRouter.get('/products/:pid', async (req, res) => {
   const { params } = req;
   const productId = params.pid;

   const products = await producto.getProducts();

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
   const postStatus = await producto.addProduct(newProduct);

   if (postStatus === 201) {
      res.status(201).json(newProduct);
   } else {
      res.status(400).json({ message: "Por favor, verifique que todos los campos estén completos." })
   }
})

productsRouter.put('/products/:pid', async (req, res) => {
   const { body, params } = req;
   const id = params.pid;

   const putStatus = await producto.updateProduct(parseInt(id), body);

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

   const deleteStatus = await producto.deleteProduct(parseInt(pid));

   if (deleteStatus === 200) {
      res.status(200).json({ message: "Producto eliminado exitosamente." });
   } else {
      res.status(404).json({ message: "No se encontró el producto." })
   }
})

export default productsRouter;

