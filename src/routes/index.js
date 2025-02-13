const express = require('express');
const { index, admin, adminProducts, adminUsers } = require('../controllers/indexController.js');
const adminCheck = require('../middlewares/adminCheck.js');
const router = express.Router();


router
    .get('/', index)
    .get('/admin',adminCheck, admin)
    .get('/admin/products',adminCheck, adminProducts)
    .get('/admin/users', adminCheck, adminUsers)



module.exports = router;