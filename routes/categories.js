const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middleware/fieldValidate');
const { validateJWT } = require('../middleware/jwtValidate');
const { createCategory, getAllCategories, getCategory, putCategory, deleteCategory } = require('../controllers/categories.controller');
const { isCategoryValidate } = require('../helpers/db-validator');
const { isAdminRole } = require('../middleware/adminValidate');

const router = Router();

router.get('/', getAllCategories);

router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isCategoryValidate),
    validateField
], getCategory);

router.post('/',[
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validateField
], createCategory);

router.put('/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isCategoryValidate),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validateField
], putCategory);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isCategoryValidate),
    validateField
], deleteCategory);

module.exports = router;