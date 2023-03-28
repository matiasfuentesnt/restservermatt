
const { response } = require('express')

const usersGet = (req,res = response) => {
    const { q, name = 'No Name', id} = req.query;
    res.json({
        msg: "get API - controller",
        q,
        name,
        id
    });
};

const usersPost = (req,res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: "Post API - controller",
        nombre,
        edad
    });
};

const usersPut = (req,res = response) => {
    const id = req.params.id;
    res.json({
        msg: "Put API - controller",
        id
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