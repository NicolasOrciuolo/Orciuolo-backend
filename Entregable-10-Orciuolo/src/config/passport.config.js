import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userModel from '../dao/models/user.model.js';
import { createHash, isValidPassword, JWT_SECRET } from '../utils.js';

export const init = () => {
   const registerOptions = {
      usernameField: 'email',
      passReqToCallback: true,
   };
   passport.use('register', new LocalStrategy(registerOptions, async (req, email, password, done) => {
      const { body: {
         first_name,
         last_name,
         age,
      } } = req;
      if (!first_name || !last_name || !age) {
         return done(new Error('Todos los campos son requeridos'))
      }
      const user = await userModel.findOne({ email });
      if (user) {
         return done(new Error(`Ya existe el usuario con el correo ${email} en el sistema.`))
      }
      const newUser = await userModel.create({
         first_name,
         last_name,
         email,
         age,
         password: createHash(password),
         role: (email === 'adminCoder@coder.com' && password === 'adminCod3r123') ? 'admin' : 'user'
      });
      done(null, newUser);
   }));

   passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await userModel.findOne({ email });
      if (!user) {
         return done(new Error('Correo o contraseña inválidos.'));
      }
      const isNotValidPass = !isValidPassword(password, user.password);
      if (isNotValidPass) {
         return done(new Error('Correo o contraseña inválidos.'));
      }
      done(null, user);
   }));

   const githubOptions = {
      clientID: 'Iv1.ebbea299d3594f48',
      clientSecret: '84e9f4a8ec820d3ee3888d2f507ff8786dd433a4',
      callbackURL: 'http://localhost:8080/auth/github/callback'
   }
   passport.use('github', new GithubStrategy(githubOptions, async (accesstoken, refreshToken, profile, done) => {
      const email = profile._json.email;
      let user = await userModel.findOne({ email })
      if (user) {
         return done(null, user);
      }
      user = {
         first_name: profile._json.name,
         last_name: '',
         email,
         password: '',
         age: '',
         role: (email === 'adminCoder@coder.com' && password === 'adminCod3r123') ? 'admin' : 'user'
      }
      const newUser = await userModel.create(user);
      console.log('newUser', newUser)
      done(null, newUser);
   }))

   const cookieExtractor = (req) => {
      let token = null;
      if (req && req.cookies) {
         token = req.cookies['token'];
      }
      console.log('token', token);
      return token;
   }

   passport.use('jwt', new JwtStrategy({
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
   }, (payload, done) => {
      console.log('payload', payload);
      done(null, payload);
   }))


}