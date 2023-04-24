
const { response } = require('express');
const UserSchema = require('../models/user.models');
const bcryptjs = require('bcryptjs');

const usersGet = async(req,res = response) => {
    const { limit = 5, to = 0 } = req.query;
    const query = {status: true}

    const [ total, users] = await Promise.all([
        UserSchema.countDocuments(query),
        UserSchema.find(query)
            .skip(Number(to))
            .limit(Number(limit))
    ])

    res.json({
        total, users
    });
};

const usersPost = async(req,res = response) => {
    const { name, password, role, email } = req.body;
    const user = UserSchema({name, password, role, email});


    //Password Crypt
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json({
        user
    });
};

const usersPut = async(req,res = response) => {
    const id = req.params.id;
    const { _id, password, google, email, ...caracter } = req.body;

    // TODO validar DB
    if ( password ) {
        const salt = bcryptjs.genSaltSync(10);
        caracter.password = bcryptjs.hashSync(password, salt);
    }

    const user = await UserSchema.findByIdAndUpdate( id, caracter);

    res.json({
        user
    });
};

const usersPatch = (req,res = response) => {
    res.json({
        msg: "Patch API - controller"
    });
};


const usersDelete = async(req,res = response) => {

    const { id } = req.params;

    const uid = req.uid;
    // const user = await UserSchema.findByIdAndDelete(id); <- Lo elimina por completo de la DB
    const user = await UserSchema.findByIdAndUpdate(id, {status: false});
    res.json({
        user,
        uid
    });
};



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}