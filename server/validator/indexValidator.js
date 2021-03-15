const {check} = require('express-validator')

exports.validatorSignup = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Le nom est requis'),
    check('email')
    .isEmail()
    .withMessage('Veuillez saisir un email valide'),
    check('password')
    .not()
    .isEmpty()
    .isLength({min:8})
    .withMessage('Le mot de passe doit contenir au moins 8 caractères'),
    check('role')
    .not()
    .isEmpty()
    .withMessage('role requis')
]
exports.validatorSignin = [
    check('email')
    .isEmail()
    .withMessage('Veuillez saisir un email valide'),
    check('password')
    .not()
    .isEmpty()
    .withMessage('Password requis')
]