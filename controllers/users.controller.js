
const { response } = require('express');
const UserSchema = require('../models/user.model');
const bcryptjs = require('bcryptjs');

const usersGet = (req,res = response) => {
    const { q, name = 'No Name', id} = req.query;
    res.json({
        msg: "get API - controller",
        q,
        name,
        id
    });
};

const usersPost = async(req,res = response) => {
    const { name, password, role, email } = req.body;
    const user = UserSchema({name, password, role, email});


    //Password Crypt
    const salt = bcryptjs.genSaltSync(15);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json({
        user
    });
};

const usersPut = async(req,res = response) => {
    const id = req.params.id;
    const { password, google, email, ...caracter } = req.body;

    // TODO validar DB
    if ( password ) {
        const salt = bcryptjs.genSaltSync(15);
        caracter.password = bcryptjs.hashSync(password, salt);
    }

    const user = await UserSchema.findByIdAndUpdate( id, caracter);

    res.json({
        msg: "Put API - controller",
        user
    });
};

const usersPatch = (req,res = response) => {
    res.json({
        msg: "Patch API - controller"
    });
};


const usersDelete = (req,res = response) => {
    res.json({
        msg: "Delete API - controller"
    });
};



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}