const { response } = require("express");
const { Category } = require('../models')

const getAllCategories = async(req, res) => { // OBTENER TODAS LAS CATEGORIAS
    const { limit = 5, to = 0 } = req.query;
    const query = {status: true}
    const [ total, categorias] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('usuario', 'name')
            .skip(Number(to))
            .limit(Number(limit))
    ])
    res.json({
        total, categorias
    });
}

const getCategory = async(req, res) => { // OBTENER CATEGORIA POR ID
    const id = req.params.id;
    const category = await Category.findById(id).populate('usuario','name');
    res.json({category})
}

const createCategory = async(req,res = response) => { // CREAR CATEGORIA
    const nombre = req.body.nombre;
    const categoryDB = await Category.findOne({nombre});
    if(categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.nombre}, ya existe.`
        });
    }
    const data = {
        nombre,
        usuario: req.user._id
    }
    const category = new Category(data);
    await category.save();
    res.status(201).json(category)
}

const putCategory = async(req, res) => { // ACTUALIZAR INFO CATEGORIA
    const id = req.params.id;
    const { _id, status, usuario, ...caracter } = req.body;
    const category = await Category.findByIdAndUpdate( id, caracter);
    res.json({category})
}

const deleteCategory = async(req, res) => { // BORRAR CATEGORIA (PONE STATUS EN FALSE)
    const { id } = req.params;
    const uid = req.uid;
    const user = await Category.findByIdAndUpdate(id, {status: false});
    res.json({
        user,
        uid
    });
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    putCategory,
    deleteCategory
}