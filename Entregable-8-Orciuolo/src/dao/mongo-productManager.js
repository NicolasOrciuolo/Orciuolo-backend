import ProductModel from "./models/products.model.js";

export default class ProductManager {
   static async addProduct(product) {
      const { title, description, code, price, status, stock, category, thumbnail } = product;

      if (!title || !description || !code || !price || !stock || !category) {
         console.log("No se ha podido ingresar el producto, debido a campos incompletos");
         return 400;
      }

      const products = await ProductModel.find({});

      //BUSCO EL ÚLTIMO ID PARA GENERAR NUEVO
      let newID;
      if (products.length === 0) {
         newID = 1;
      } else {
         const productsToShow = products.filter((productCategory) => productCategory.category != "deleted");
         newID = productsToShow[productsToShow.length - 1].id + 1;
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

      await ProductModel.create(products);
      console.log(`${title}, ingresado exitosamente en el archivo.`);
      return 201;
   }

   static async getProducts() {
      const products = await ProductModel.find({});
      const productsToShow = products.filter((productCategory) => productCategory.category != "deleted");
      return productsToShow;
   }

   static async getProductById(pid) {
      const product = await ProductModel.find({ id: pid });
      if (!product) {
         throw new Error('Producto no encontrado 😨');
      }
      return product;
   }

   static async updateProduct(productID, data) {
      const { id, title, description, code, price, status, stock, category, thumbnail } = data;

      const products = await ProductModel.find({});

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
         await ProductModel.updateOne({ id: productID }, { $set: data });
         console.log('Productos actualizados exitosamente.')
         return (200);
      }
   }

   static async deleteProduct(pid) {
      const product = await ProductManager.getProductById(pid);
      if (!product) {
         throw new Error('Producto no encontrado 😨');
      }
      await ProductModel.deleteOne({ id: pid });
      console.log(`Producto eliminado correctamente ${pid} 😎`);
      return 200;
   }
}
