// (function () {

//    const socket = io();

//    socket.on('getProducts', (products) => {
//       const productList = document.getElementById('products-list');
//       productList.innerHTML = "";

//       products.forEach(product => {
//          const productCard = document.createElement("div")
//          productCard.innerHTML = `
//          <p><strong>Title: </strong> ${product.title}</p>
//          <p><strong>Description: </strong> ${product.description}</p>
//          <p><strong>Code: </strong> ${product.code}</p>
//          <p><strong>Price: </strong> ${product.price}</p>
//          <p><strong>Stock: </strong> ${product.stock}</p>
//          <p><strong>Category: </strong> ${product.category}</p>
//          <p><strong>Thumbnail: </strong> ${product.thumbnail}</p>
//          <button id="delete-product${product.id}" class="contrast">Eliminar Producto</button>
//          <hr>       
//          `;
//          productList.appendChild(productCard);
//       });

//       products.forEach(product => {
//          const deleteProduct = document.getElementById(`delete-product${product.id}`);
//          deleteProduct.addEventListener('click', () => {
//             socket.emit('deleteProduct', product.id)
//          });
//       });
//    })

//    const addProduct = document.getElementById('add-product');
//    addProduct.addEventListener('click', (event) => {
//       event.preventDefault();

//       const title = document.getElementById('input-title').value;
//       const description = document.getElementById('input-description').value;
//       const code = document.getElementById('input-code').value;
//       const price = document.getElementById('input-price').value;
//       const status = document.getElementById('input-status').value;
//       const stock = document.getElementById('input-stock').value;
//       const category = document.getElementById('input-category').value;
//       const thumbnail = document.getElementById('input-thumbnail').value;

//       const newProduct = {
//          title,
//          description,
//          code,
//          price,
//          status,
//          stock,
//          category,
//          thumbnail
//       };

//       socket.emit('addProduct', newProduct);
//       console.log('👍 Producto enviado desde el Cliente: ', newProduct)
//    })

//    const addProductInCart = document.getElementById('add-productcart');
//    addProductInCart.addEventListener('click', (event) => {
//       event.preventDefault();
//       console.log('llegue')

//       const product = '656becb28aa813f57807d463';



//       socket.emit('addProductInCart', product);
//       console.log('👍 Producto enviado desde el Cliente: ', product)

//       // const title = document.getElementById('input-title').value;

//    })

// })();

//agregar producto y cantidad al carrito

const socket = io();

document.addEventListener('submit', function (event) {
   event.preventDefault();
   const form = event.target;
   const productId = form.getAttribute('data-id');
   const quantityInput = document.getElementById(`${"quantityIn" + productId}`);
   const quantityAd = parseInt(quantityInput.value);

   const data = {
      pid: productId,
      quantity: quantityAd
   };

   socket.emit('addProductInCart', data);
   console.log('👍 Producto enviado desde el Cliente: ', data)

});
