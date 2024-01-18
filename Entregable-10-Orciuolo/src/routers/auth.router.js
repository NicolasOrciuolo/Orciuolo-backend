import { Router } from 'express';
import userModel from '../dao/models/user.model.js';
import passport from 'passport';
import { createHash, createToken, isValidPassword, verifyToken, auth } from '../utils.js'

const authRouter = Router();

authRouter.post('/auth/register', async (req, res) => {
   const { body: {
      first_name,
      last_name,
      email,
      age,
      password,
   } } = req;

   if (!first_name ||
      !last_name ||
      !email ||
      !age ||
      !password
   ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' })
   }

   let user = await userModel.findOne({ email });

   if (user) {
      return res.status(400).json({ message: 'Usuario ya registrado' })
   }

   user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
   })

   res.redirect('/login');
})

authRouter.post('/auth/login', async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(401).json({ message: 'Todos los campos son obligatorios' })
   }

   let user = await userModel.findOne({ email });

   if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña inválidos' })
   }

   const isNotValidPassword = !isValidPassword(password, user);

   if (isNotValidPassword) {
      return res.status(400).json({ message: 'Correo o contraseña inválidos' })
   }

   const token = createToken(user);

   res.cookie('token', token, { maxAge: 1000 * 60 * 30, httpOnly: true })
      .status(200)
      .redirect('/products');
})


authRouter.get('/auth/current', auth, (req, res) => {
   res.status(200).json(req.user);
})

authRouter.get('/auth/logout', async (req, res) => {
   res
      .clearCookie('token')
      .redirect('/login');
})

authRouter.get('/auth/github', passport.authenticate('github', { scope: ['user:email'], session: false }));

authRouter.get('/auth/github/callback', passport.authenticate('github', { session: false, failureRedirect: '/login' }), (req, res) => {
   const token = createToken(req.user);
   res
      .cookie('token', token, { maxAge: 1000 * 60 * 30, httpOnly: true })
      .redirect('/products');
});

export default authRouter;