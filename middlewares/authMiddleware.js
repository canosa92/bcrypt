const jwt =require('jsonwebtoken')
const {secret}=require('../crypto/config')

function generateToken(user) {
    return jwt.sign({ user: user.id }, secret, { expiresIn: '1h' });
    }

function verifyToken(req, res, next) {
    const token = req.session.token;

    if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
    jwt.verify(token, secret, (err, decoded) => {
    if (err) {
    return res
    .status(401)
    .json({ message: 'Token inválido', error: err.message });
    }
    
        req.user = decoded.user;
        next();
    
    });
    }

module.exports={
    generateToken,
    verifyToken
}