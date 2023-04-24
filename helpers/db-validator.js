const Role = require('../models/role.models');
const UserSchema = require('../models/user.models');

const isRoleValidate = async(role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole){
        throw new Error(`El role ${role} no esta registrado en la base de datos`)
    }};

const isEmailValidate = async(email) => {
    const existMail = await UserSchema.findOne({email});
    if (existMail) {
        throw new Error(`El mail ${email} esta registrado`)
        }
    };

const isUserIDValidate = async(id) => {
    const existID = await UserSchema.findById([id]);
    if (!existID) {
        throw new Error(`El ID ${id} no existe`)
        }
    };

module.exports = {
    isRoleValidate,
    isEmailValidate,
    isUserIDValidate
}