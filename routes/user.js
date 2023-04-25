const { Router } = require('express');
const { check } = require('express-validator');

const { validateField, validateJWT, getRole, isAdminRole} = require('../middleware/index.middleware');

const { isRoleValidate, isEmailValidate, isUserIDValidate } = require('../helpers/db-validator');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users.controller');

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

router.put('/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isUserIDValidate),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6}),
    check('role').custom( isRoleValidate ),
    validateField
], usersPut);

router.delete('/:id',[
    validateJWT,
    getRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isUserIDValidate),
    validateField
], usersDelete);



module.exports = router;