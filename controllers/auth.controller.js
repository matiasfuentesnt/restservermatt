const { response } = require("express");
const UserSchema = require('../models/user.models');
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await UserSchema.findOne({email});
        if(!user) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrecto'
            })
        }
        if(!user.status){
            return res.status(400).json({
                msg: 'Usuario no es correcto porque el status es False.'
            })
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        }
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

};


module.exports = login;