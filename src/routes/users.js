const express = require('express');
const { register, login, processRegister, processLogin, profile, logout, update } = require('../controllers/userController.js');
const router = express.Router();

// /users
router
    .get('/register', register)
    .post('/processRegister', processRegister)
    .get('/login', login)
    .post('/processLogin', processLogin)
    .get('/logout',logout)
    .get('/profile', profile)
    .put('/update',update)

module.exports = router;