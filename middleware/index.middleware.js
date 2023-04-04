const validateFields = require('../middleware/fieldValidate');
const validateJWTs = require('../middleware/jwtValidate');
const validateRoles = require('../middleware/adminValidate');

module.exports = {
    ...validateFields,
    ...validateJWTs,
    ...validateRoles
}