const { Role, UserSchema, Category, Product } = require('../models');

const isRoleValidate = async(role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole){
        throw new Error(`El role ${role} no esta registrado en la base de datos`)
    }
};

const isEmailValidate = async(email) => {
    const existMail = await UserSchema.findOne({email});
    if (existMail) {
        throw new Error(`El mail ${email} esta registrado`)
    }
};

const isUserIDValidate = async(id) => {
    const existID = await UserSchema.findById(id);
    if (!existID) {
        throw new Error(`El ID ${id} no existe`)
    }
};

const isCategoryValidate = async(id) => {
    const existCategory = await Category.findById(id);
    if (!existCategory) {
        throw new Error(`El ID ${id} no existe`)
    }
};

const isProductValidate = async(id) => {
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`El ID ${id} no existe`)
    }
};

module.exports = {
    isRoleValidate,
    isEmailValidate,
    isUserIDValidate,
    isCategoryValidate,
    isProductValidate
}