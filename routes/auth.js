const { Router } = require('express');
const { check } = require('express-validator');
const login = require('../controllers/auth.controller');
const { validateField } = require('../middleware/fieldValidate');

const router = Router();

    router.post('/login',[
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateField
    ], login);




module.exports = router;