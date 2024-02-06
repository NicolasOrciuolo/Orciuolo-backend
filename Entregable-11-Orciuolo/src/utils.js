import path from 'path';
import url from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config/config.js';

const __filename = url.fileURLToPath(import.meta.url);

export const JWT_SECRET = config.JWTSecret;

export const __dirname = path.dirname(__filename);

export const URL_BASE = 'http://localhost:8080';

export const buildResponsePaginated = (data, baseUrl = URL_BASE) => {
   return {
      //status:success/error
      status: 'success',
      // payload: Resultado de los productos solicitados
      payload: data.docs.map((doc) => doc.toJSON()),
      // totalPages: Total de páginas
      totalPages: data.totalPages,
      // prevPage: Página anterior
      prevPage: data.prevPage,
      // nextPage: Página siguiente
      nextPage: data.nextPage,
      // page: Página actual
      page: data.page,
      // hasPrevPage: Indicador para saber si la página previa existe
      hasPrevPage: data.hasPrevPage,
      // hasNextPage: Indicador para saber si la página siguiente existe.
      hasNextPage: data.hasNextPage,
      // prevLink: Link directo a la página previa (null si hasPrevPage=false)
      prevLink: data.hasPrevPage ? `${baseUrl}/products?limit=${data.limit}&page=${data.prevPage}` : null,
      // nextLink: Link directo a la página siguiente (null si hasNextPage=false)
      nextLink: data.hasNextPage ? `${baseUrl}/products?limit=${data.limit}&page=${data.nextPage}` : null,
   }
}

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const createToken = (user) => {
   const {
      _id,
      first_name,
      last_name,
      email,
   } = user;

   const payload = {
      id: _id,
      first_name,
      last_name,
      email
   }

   return jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' });
}

export const verifyToken = (token) => {
   return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (error, payload) => {
         if (error) {
            return reject(error);
         }
         resolve(payload);
      })
   })
}

export const auth = async (req, res, next) => {
   const { token } = req.cookies;
   if (!token) {
      return res.status(401).json({ message: 'No deberías estar acá' })
   }
   const payload = await verifyToken(token);
   if (!payload) {
      return res.status(401).json({ message: 'No deberías estar acá' })
   }
   req.user = payload;
   next();
}