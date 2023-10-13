const fs = require('fs');

class ProductManager {
   constructor(path) {
      this.path = path;
   }

   async addProduct(product) {
      const { title, description, price, thumbnail, code, stock } = product;

      if (!title || !description || !price || !thumbnail || !code || !stock) {
         throw new Error('Por favor, verifique la completitud de los campos ingresados')
      }

      const products = await getProductsFromFile(this.path);

      //BUSCO EL ÚLTIMO ID PARA GENERAR NUEVO
      let newID;
      if (products.length === 0) {
         newID = 1;
      } else {
         newID = products[products.length - 1].id + 1;
      }

      let searchCode = products.find((productFound) => productFound.code === code);
      if (!searchCode) {
         const newProduct = {
            id: newID,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
         }
         products.push(newProduct);

         await saveProductsinFile(this.path, products);
         console.log(`${title}, ingresado exitosamente en el archivo.`);
      } else {
         return console.log(`No se ha podido ingresar el producto: ${title}, por repetición del code: ${code}`)
      }
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
      const { id, title, description, price, thumbnail, code, stock } = data;

      const products = await getProductsFromFile(this.path);

      const productPosition = products.findIndex((productFound) => productFound.id === productID);
      if (productPosition === -1) {
         throw new Error('Producto no encontrado.');
      }

      if (id) {
         console.log('No es posible modificar el ID de un producto.')
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

         await saveProductsinFile(this.path, products);
         console.log('Productos actualizados exitosamente.')
      }
   }

   async deleteProduct(id) {
      const products = await getProductsFromFile(this.path);

      const productPosition = products.findIndex((productFound) => productFound.id === id);
      if (productPosition === -1) {
         throw new Error('Producto no encontrado.');
      }

      products[productPosition].id = 'deleted';

      await saveProductsinFile(this.path, products);
      console.log(`Producto: ${products[productPosition].title} eliminado exitosamente.`)
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


// TEST ####################################################
async function test() {
   const path = './products.txt';

   const producto = new ProductManager(path);

   const product1 = {
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc1",
      stock: 25,
   }
   const product2 = {
      title: "producto prueba 2",
      description: "Este es un producto prueba 2",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc1",
      stock: 25,
   }
   const product3 = {
      title: "producto prueba 3",
      description: "Este es un producto prueba 3",
      price: 300,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 15,
   }
   const product4 = {
      title: "producto prueba 4",
      description: "Este es un producto prueba 4",
      price: 300,
      thumbnail: "Sin imagen",
      code: "abc1234",
      stock: 15,
   }

   await producto.addProduct(product1); //Ingreso un producto
   await producto.addProduct(product2); //Ingreso un producto
   await producto.addProduct(product3); //Ingreso un producto
   console.log(await producto.getProducts()); //Muestro los productos de la BD
   await producto.getProductById(1); //Muestro el producto con ID=1
   await producto.updateProduct(2, { id: 4 }); //Intento modificar el ID de un producto
   await producto.updateProduct(2, { price: 4000 }); //Intento modificar el PRECIO de un producto
   await producto.deleteProduct(1); //Elimino el producto con ID 1
   console.log(await producto.getProducts()); //Muestro los productos de la BD (no debería mostrar el producto con ID=1)
   await producto.addProduct(product4); //Ingreso un producto
   console.log(await producto.getProducts()); //Muestro los productos de la BD (no debería repetir el ID en el último producto agregado)
}

test();
