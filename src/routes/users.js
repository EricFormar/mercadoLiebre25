const express = require('express');
const { register, login } = require('../controllers/userController.js');
const router = express.Router();

// /users
router
    .get('/register', register)
    .get('/login', login)



module.exports = router;