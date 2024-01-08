import { Router } from 'express';
import userModel from '../dao/models/user.model.js';
import passport from 'passport';
import { createHash, isValidPassword } from '../utils.js'

const sessionsRouter = Router();

// sessionsRouter.post('/sessions/login', async (req, res) => {
//    const { body: {
//       email,
//       password
//    } } = req;
//    if (!email || !password) {
//       return res.render('error', { title: '', messageError: 'Todos los campos son requeridos' })
//    }
//    const user = await userModel.findOne({ email });
//    if (!user) {
//       return res.render('error', { title: '', messageError: 'Correo o contraseña inválidos.' })

//    }
//    if (user.password !== password) {
//       return res.render('error', { title: '', messageError: 'Correo o contraseña inválidos.' })
//    }
//    const {
//       first_name,
//       last_name,
//       age
//    } = user;
//    req.session.user = {
//       first_name,
//       last_name,
//       email,
//       age,
//       role: (email === 'adminCoder@coder.com' && password === 'adminCod3r123') ? 'admin' : 'user'
//    };

//    if (req.session.user.role === 'admin') {
//       res.redirect('/realTimeProducts');
//    } else {
//       res.redirect('/products');
//    }
// });

sessionsRouter.post('/sessions/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
   res.redirect('/products');
})

// sessionsRouter.post('/sessions/register', async (req, res) => {
//    const { body: {
//       first_name,
//       last_name,
//       email,
//       age,
//       password
//    } } = req;
//    if (!first_name || !last_name || !email || !password) {
//       return res.render('error', { title: '', messageError: 'Todos los campos son requeridos' })
//    }
//    const user = await userModel.create({
//       first_name,
//       last_name,
//       email,
//       age,
//       password
//    });
//    res.redirect('/login');
// });

sessionsRouter.post('/sessions/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
   res.redirect('/login');
})

sessionsRouter.get('/sessions/logout', async (req, res) => {
   req.session.destroy((error) => {
      if (error) {
         return res.render('error', { title: '', messageError: error.message })
      }
   });
   res.redirect('/login');
})

sessionsRouter.get('/sessions/github', passport.authenticate('github', { scope: ['user:email'] }), () => {
});

sessionsRouter.get('/sessions/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
   res.redirect('/products');
});

export default sessionsRouter;