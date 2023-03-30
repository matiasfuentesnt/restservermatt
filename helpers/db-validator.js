const Role = require('../models/role.models');
const UserSchema = require('../models/user.model');

const isRoleValidate = async(role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole){
        throw new Error(`El role ${role} no esta registrado en la base de datos`)
    }};

const isEmailValidate = async(email) => {
    const existMail = await UserSchema.findOne({email});
    if (existMail) {
        throw new Error(`El mail ${email} esta registrado`)
        };
    }

module.exports = {
    isRoleValidate,
    isEmailValidate
}