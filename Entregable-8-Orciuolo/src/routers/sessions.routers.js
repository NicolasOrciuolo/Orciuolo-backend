import { Router } from 'express';
import userModel from '../dao/models/user.model.js'

const sessionsRouter = Router();

sessionsRouter.post('/sessions/login', async (req, res) => {
   const { body: {
      email,
      password
   } } = req;
   if (!email || !password) {
      return res.render('error', { title: '', messageError: 'Todos los campos son requeridos' })
   }
   const user = await userModel.findOne({ email });
   if (!user) {
      return res.render('error', { title: '', messageError: 'Correo o contraseña inválidos.' })

   }
   if (user.password !== password) {
      return res.render('error', { title: '', messageError: 'Correo o contraseña inválidos.' })
   }
   const {
      first_name,
      last_name,
      age
   } = user;
   req.session.user = {
      first_name,
      last_name,
      email,
      age
   };
   res.redirect('/products');
});

sessionsRouter.post('/sessions/register', async (req, res) => {
   const { body: {
      first_name,
      last_name,
      email,
      age,
      password
   } } = req;
   if (!first_name || !last_name || !email || !password) {
      return res.render('error', { title: '', messageError: 'Todos los campos son requeridos' })
   }
   const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password
   });
   res.redirect('/login');
});

sessionsRouter.get('/sessions/logout', async (req, res) => {
   req.session.destroy((error) => {
      if (error){
         return res.render('error', { title: '', messageError: error.message })
      }
   });
   res.redirect('/login');
})

export default sessionsRouter;