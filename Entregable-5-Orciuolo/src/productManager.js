import fs from 'fs';

class ProductManager {
   constructor(path) {
      this.path = path;
   }

   async addProduct(product) {
      const { title, description, code, price, status, stock, category, thumbnail } = product;

      if (!title || !description || !code || !price || !stock || !category) {
         console.log("No se ha podido ingresar el producto, debido a campos incompletos");
         return 400;
      }

      const products = await getProductsFromFile(this.path);

      //BUSCO EL ÚLTIMO ID PARA GENERAR NUEVO
      let newID;
      if (products.length === 0) {
         newID = 1;
      } else {
         const productsToShow = products.filter((productID) => productID.id != "deleted");
         newID = productsToShow[productsToShow.length - 1].id + 1;
         console.log(newID);
      }

      const newProduct = {
         id: parseInt(newID),
         title,
         description,
         code,
         price,
         status,
         stock,
         category,
         thumbnail
      }
      products.push(newProduct);

      await saveProductsinFile(this.path, products);
      console.log(`${title}, ingresado exitosamente en el archivo.`);
      return 201;
   }

   async getProducts() {
      const products = await getProductsFromFile(this.path);

      const productsToShow = products.filter((productID) => productID.id != "deleted");

      return productsToShow;
   }

   async getProductById(id) {
      const products = await getProductsFromFile(this.path);

      let searchProduct = products.find((productFound) => productFound.id === id);
      if (searchProduct) {
         console.log('Resultado de la búsqueda: ', searchProduct)
      } else {
         throw new Error('Producto no encontrado.');
      }
   }

   async updateProduct(productID, data) {
      const { id, title, description, code, price, status, stock, category, thumbnail } = data;

      const products = await getProductsFromFile(this.path);

      const productPosition = products.findIndex((productFound) => productFound.id === productID);
      if (productPosition === -1) {
         console.log('Producto no encontrado.');
         return (404);
      }

      if (id) {
         console.log('No es posible modificar el ID de un producto.');
         return (400);
      }
      else {
         if (title) {
            products[productPosition].title = title;
         }
         if (description) {
            products[productPosition].description = description;
         }
         if (price) {
            products[productPosition].price = price;
         }
         if (thumbnail) {
            products[productPosition].thumbnail = thumbnail;
         }
         if (code) {
            products[productPosition].code = code;
         }
         if (stock) {
            products[productPosition].stock = stock;
         }
         if (status) {
            products[productPosition].status = status;
         }
         if (category) {
            products[productPosition].category = category;
         }

         await saveProductsinFile(this.path, products);
         console.log('Productos actualizados exitosamente.')
         return (200);
      }
   }

   async deleteProduct(id) {
      const products = await getProductsFromFile(this.path);

      const productPosition = products.findIndex((productFound) => productFound.id === id);
      if (productPosition === -1) {
         console.log('Producto no encontrado.');
         return 404;
      }

      products[productPosition].id = 'deleted';

      await saveProductsinFile(this.path, products);
      console.log(`Producto: ${products[productPosition].title} eliminado exitosamente.`)
      return 200;
   }
}

const getProductsFromFile = async (path) => {
   if (!fs.existsSync(path)) {
      return [];
   }
   const content = await fs.promises.readFile(path, 'utf-8');
   return JSON.parse(content);
}

const saveProductsinFile = (path, data) => {
   const content = JSON.stringify(data, null, '\t');
   return fs.promises.writeFile(path, content, 'utf-8');
}

export default ProductManager;
