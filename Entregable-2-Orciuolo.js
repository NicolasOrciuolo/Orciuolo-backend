class ProductManager {
   constructor() {
      this.products = [];
   }

   addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
         return console.log("Por favor, verifique la completitud de los campos ingresados")
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

let producto = new ProductManager();

producto.getProducts();

producto.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

producto.getProducts();

producto.getProductById(1)

producto.getProductById(2)

producto.addProduct("producto prueba 2", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

producto.getProducts();

