
const {Schema, model} = require('mongoose');

const CategorySchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
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
    

});

module.exports = model( 'Category', CategorySchema)