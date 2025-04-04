const express = require('express');
const { index, admin, adminProducts, adminUsers } = require('../controllers/indexController.js');
const adminCheck = require('../middlewares/adminCheck.js');
const router = express.Router();


router
    .get('/', index)
    .get('/admin', admin)
    .get('/admin/products', adminProducts)
    .get('/admin/users',  adminUsers)



module.exports = router;