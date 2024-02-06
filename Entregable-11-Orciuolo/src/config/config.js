export default {
   port: process.env.PORT || 8080,
   mongodbUri: process.env.MONGODB_URI,
   cookieSecret: process.env.COOKIE_SECRET,
   JWTSecret: process.env.JWT_SECRET
}