
const {Schema, model} = require('mongoose');

const CategorySchema = Schema({

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


});

CategorySchema.methods.toJSON = function() {
    const { __v, status, ...data} = this.toObject();
    return data;
}

module.exports = model( 'Category', CategorySchema)