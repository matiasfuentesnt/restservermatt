const { response } = require("express");
const { Product } = require('../models')

const getAllProducts = async(req, res) => { // OBTENER TODOS LOS PRODUCTOS
    const { limit = 5, to = 0 } = req.query;
    const query = {status: true}
    const [ total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('usuario', 'name')
            .skip(Number(to))
            .limit(Number(limit))
    ])
    res.status(200).json({
        total, products
    });
}

const getProduct = async(req, res) => { // OBTENER PRODUCTO POR ID
    const id = req.params.id;
    const product = await Product.findById(id).populate('usuario','name');
    res.status(200).json({product})
}

const createProduct = async(req,res = response) => { // CREAR PRODUCTO
    const body = req.body;
    let codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const product = await Product.findOne({nombre});
    if(product) {
        return res.status(400).json({
            msg: `El producto ${product.nombre}, ya existe.`
        });
    }
    if(!codigo){
        codigo = Math.floor(Math.random() * 99999)
    }
    const data = {
        ...body,
        usuario: req.user._id,
        codigo
    }
    const products = new Product(data);
    await products.save();
    res.status(201).json(products)
}

const putProduct = async(req, res) => { // ACTUALIZAR INFO PRODUCTO
    const id = req.params.id;
    const { _id, status, usuario, ...rest } = req.body;
    const product = await Product.findByIdAndUpdate( id, rest);
    res.json({product})
}

const deleteProduct = async(req, res) => { // BORRAR PRODUCTO (PONE STATUS EN FALSE)
    const { id } = req.params;
    const uid = req.uid;
    const user = await Product.findByIdAndUpdate(id, {status: false});
    res.json({
        user,
        uid
    });
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    putProduct,
    deleteProduct
}