const express = require('express');
const { list, detail, add, create, edit, update, remove, search, showCart} = require('../controllers/productsController.js');
const userSessionCheck = require('../middlewares/userSessionCheck.js');
const upload = require('../middlewares/upload.js');
const productValidation = require('../validations/productAdd.validator.js');
const router = express.Router();

// /products

router
    .get('/', list)
    .get('/detail/:id',detail)
    .get('/add',add) //renderiza el formulario
    .post('/create',upload.single('image'),productValidation,create) //recibe los datos del formulario
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .delete('/remove/:id',remove)
    .get('/search',search)
    .get('/cart',userSessionCheck, showCart)

module.exports = router;