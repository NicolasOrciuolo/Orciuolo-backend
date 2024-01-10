(function () {
   const socket = io();

   document.getElementById('form-message')
      .addEventListener('submit', (event) => {
         event.preventDefault();
         const input = document.getElementById('input-message');
         const newMsg = {
            user,
            message: input.value,
         };
         input.value = '';
         input.focus();
         socket.emit('new-message', newMsg);
      })

   socket.on('update-messages', (messages) => {
      console.log('messages', messages);
      const logMessages = document.getElementById(`log-messages`);
      logMessages.innerText = '';
      messages.forEach((message) => {
         const p = document.createElement('p');
         p.innerText = `${message.user}: ${message.message}`
         logMessages.appendChild(p);
      })
   })

   Swal.fire({
      title: 'Identificate por favor 👮‍♂️',
      input: 'text',
      allowOutsideClick: false,
      inputValidator: (value) => {
         if (!value) {
            return 'Necesitamos que ingreses tu email para continuar.'
         }
      }
   })
      .then((result) => {
         user = result.value.trim();
         console.log(`Hola ${user}, bienvenido 🖐`)
      })
      .catch(() => {
         console.error(`Ha ocurrido un error al capturar el email 😨`, error.message);
      })

})();