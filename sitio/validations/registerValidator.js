const {check,validationResult,body} = require('express-validator');
module.exports = [
    check('nombre')
    .isLength({min:3})
    .withMessage("Debes ingresar tu nombre"),
    
    check('apellido')
    .isLength({min:3})
    .withMessage("Debes ingresar tu apellido"),

    check('email')
    .isEmail()
    .withMessage("Debes ingresar un email válido"),

    check('pass')
    .isLength({min:6, max:12})
    .withMessage("Debes ingresar una contraseña entre 6 y 12 caracteres"),

    body('pass2')
    .custom((value,{req})=>{
        if(value !== req.body.pass){
            return false
        }
        return true
    })
    .withMessage("Las contraseñas no coinciden")
]