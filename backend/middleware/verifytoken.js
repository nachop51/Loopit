const jwt = require('jsonwebtoken')
const key = require('../config').key

const verifytoken = (req,res,next) =>{
    if (req.url === '/login' || req.url === '/register'){
        next()
    }else{
        const token = req.header('auth-token')
    if (!token){
        return res.status(401).json({error: "acceso denegado"})
    }
    try {
        const verificar = jwt.verify(token, key)
        req.user = verificar
        next()
    } catch (error) {
        return res.status(401).json({error: "acceso denegado, token no es valido"})
    }
    }
}

module.exports = verifytoken;
