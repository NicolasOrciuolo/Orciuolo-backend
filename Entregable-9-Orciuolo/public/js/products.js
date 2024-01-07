(function (user) {

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
   console.log('👍 Producto enviado desde el Cliente: ', data.toJSON())

});

})();