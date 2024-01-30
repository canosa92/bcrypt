const express=require('express')
const app =express()
const {generateToken,verifyToken} =require('./middlewares/authMiddleware');
const { hashedSecret } = require('./crypto/config');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
session({
secret: hashedSecret, // Clave secreta para firmar el token (debería ser segura, preferiblemente generada con crypto)
resave: false, // No guardar cambios en la sesión siempre, solo cuando se realice algún cambio
saveUninitialized: true, // Se guarda la inicialización de la sesión
cookie: { secure: false }, // Cambia a 'true' si estás utilizando HTTPS
})
);

app.use('/', router);

app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
})