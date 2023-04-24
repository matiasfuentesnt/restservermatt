const { Router } = require('express');
const { check } = require('express-validator');

const { validateField, validateJWT, isAdminRole } = require('../middleware/index.middleware');
const { getAllProducts, getProduct, createProduct, putProduct, deleteProduct } = require('../controllers/products.controller');
const { isProductValidate, isCategoryValidate } = require('../helpers/db-validator');

const router = Router();

router.get('/', getAllProducts);

router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isProductValidate),
    validateField
], getProduct);

router.post('/',[
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(isCategoryValidate),
    check('description', 'La descripcion es obligatorio').not().isEmpty(),
    validateField
], createProduct);

router.put('/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isProductValidate),
    validateField
], putProduct);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isProductValidate),
    validateField
], deleteProduct);

module.exports = router;