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

      let searchCode = products.find((productFound) => productFound.code === code);

      if (!searchCode) {
         const newProduct = {
            id: products.length + 1,
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

   getProducts() {
      return getProductsFromFile(this.path);
   }

   async getProductById(id) {
      //LEO EL ARCHIVO
      const products = await getProductsFromFile(this.path);

      let searchProduct = products.find((productFound) => productFound.id === id);

      if (searchProduct) {
         console.log('Product searched: ', searchProduct)
      } else {
         return console.log("Not found")
      }
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


async function test() {
   const path = './products.txt';

   const producto = new ProductManager(path);

   const product1 = {
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
   }
   const product2 = {
      title: "producto prueba 2",
      description: "Este es un producto prueba 2",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
   }
   const product3 = {
      title: "producto prueba 3",
      description: "Este es un producto prueba 3",
      price: 300,
      thumbnail: "Sin imagen",
      code: "abc1234",
      stock: 15,
   }

   await producto.addProduct(product1);

   await producto.addProduct(product2);

   await producto.addProduct(product3);

   console.log(await producto.getProducts());

   await producto.getProductById(1);
}

test();
