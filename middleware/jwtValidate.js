const { response } = require('express')
const UserSchema = require('../models/user.models');
const jwt = require('jsonwebtoken')

const validateJWT = async(req, res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion. Por favor, ingrese el "x-token" en los headers.'
        })
    }
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        const user = await UserSchema.findById(uid);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido. Por favor, ingrese el "x-token" en los headers.'
        })
    }
}

module.exports = { validateJWT };