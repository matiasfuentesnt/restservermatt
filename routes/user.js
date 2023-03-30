const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users.controller');
const { validateField } = require('../middleware/fieldValidate');
const Role = require('../models/role.models')
const router = Router();

    router.get('/', usersGet);
    
    router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6}),
        check('email', 'El correo no es valido').isEmail(),
        check('role').custom( async(role = '') => {
            const existRole = await Role.findOne({role});
            if (!existRole){
                throw new Error(`El role ${role} no esta registrado en la base de datos`)
            }
        }),
        validateField  
    ], usersPost);

    router.put('/:id', usersPut);
    router.patch('/', usersPatch);

    router.delete('/', usersDelete);



module.exports = router;