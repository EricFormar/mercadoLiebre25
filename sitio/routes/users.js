/*****************MODULOS*********************/
const express = require('express');
const router = express.Router();


/*****************CONTROLADORES*********************/
const controller = require('../controllers/userController')


/*****************VALIDACIONES*********************/
const registerValidator = require('../validations/registerValidator'); //valido los datos ingresados en el formulario de registro


/*****************RUTAS*********************/
router.get('/register',controller.register); //formulario de registro
router.post('/register', registerValidator,controller.processRegister); //derivo al método que guardará al usuario

router.get('/login',controller.login); //formulario de logueo
router.post('/login',controller.processLogin) //derivo al método que procesará el login

router.get('/profile', controller.profile); //vista de perfil de usuario

module.exports = router;