const fs = require('fs');

class ProductManager {
   constructor(path) {
      this.products = [];
      this.path = path;
   }

   addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
         throw new Error('Por favor, verifique la completitud de los campos ingresados')
      } else {
         let searchCode = this.products.find((products) => products.code === code);

         if (!searchCode) {
            this.products.push({
               id: this.products.length + 1,
               title,
               description,
               price,
               thumbnail,
               code,
               stock,
            })
            if (this.products.length === 1){
               fs.writeFileSync(this.path, "abc", 'utf-8');   //VER ACÁ
            } else{
               if (!fs.existsSync(path)) {
                  return console.log('El archivo no se encuentra')
               }
               fs.appendFileSync(this.path, this.products, 'utf-8');
            }
         } else {
            return console.log(`No se ha podido ingresar el producto: ${title}, por repetición del code: ${code}`)
         }
      }
   }

   getProducts() {
      return console.log(this.products)
   }

   getProductById(id){
      let searchProduct = this.products.find((products) => products.id === id);

      if(searchProduct){
         console.log(searchProduct)
      }else{
         return console.log("Not found")
      }
   }
}

const path = './products.txt';

let producto = new ProductManager(path);

producto.getProducts();

producto.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

producto.getProducts();
