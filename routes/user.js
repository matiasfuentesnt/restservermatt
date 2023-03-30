const { Router } = require('express');
const { check } = require('express-validator');
const { isRoleValidate, isEmailValidate } = require('../helpers/db-validator');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users.controller');
const { validateField } = require('../middleware/fieldValidate');

const router = Router();

    router.get('/', usersGet);
    
    router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6}),
        check('email', 'El correo no es valido').isEmail(),
        check('email').custom( isEmailValidate ),
        check('role').custom( isRoleValidate ),
        validateField  
    ], usersPost);

    router.put('/:id', usersPut);
    router.patch('/', usersPatch);

    router.delete('/', usersDelete);



module.exports = router;