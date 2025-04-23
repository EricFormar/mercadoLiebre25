const express = require('express');
const { register, login, processRegister, processLogin, profile, logout, update, remove } = require('../controllers/userController.js');
const userRegisterValidator = require('../validations/userRegisterValidator.js');
const userLoginValidator = require('../validations/userLoginValidator.js');
const router = express.Router();

// /users
router
    .get('/register', register)
    .post('/processRegister', userRegisterValidator, processRegister)
    .get('/login', login)
    .post('/processLogin', userLoginValidator, processLogin)
    .get('/logout',logout)
    .get('/profile', profile)
    .put('/update',update)
    .delete('/remove/:id', remove)

module.exports = router;