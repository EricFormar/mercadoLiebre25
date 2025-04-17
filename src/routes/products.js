const express = require('express');
const { list, detail, add, create, edit, update, remove, search, showCart} = require('../controllers/productsController.js');
const userSessionCheck = require('../middlewares/userSessionCheck.js');
const upload = require('../middlewares/upload.js');
const productValidation = require('../validations/productValidator.js');
const router = express.Router();

// /products

router
    .get('/', list)
    .get('/detail/:id',detail)
    .get('/add',add)
    .post('/create',upload.single('image'),productValidation,create)
    .get('/edit/:id',edit)
    .put('/update/:id',upload.single('image'),productValidation,update)
    .delete('/remove/:id',remove)
    .get('/search',search)
    .get('/cart',userSessionCheck, showCart)

module.exports = router;