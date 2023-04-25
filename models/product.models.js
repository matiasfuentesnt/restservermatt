
const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    precio: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    codigo: {
        type: Number,
    },
    stock: {
        type: Boolean,
        default: true
    },
});

ProductSchema.methods.toJSON = function() {
    const { __v, status, ...data} = this.toObject();
    return data;
}

module.exports = model( 'Product', ProductSchema)