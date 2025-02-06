const express = require('express');
const { index, admin } = require('../controllers/indexController.js');
const router = express.Router();


router
    .get('/', index)
    .get('/admin',admin)



module.exports = router;