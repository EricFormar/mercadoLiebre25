const express = require('express');
const { list, detail, add, create, edit, update, remove, search} = require('../controllers/productsController.js');
const router = express.Router();

// /products

router
    .get('/', list)
    .get('/detail/:id',detail)
    .get('/add',add) //rendieriza el formulario
    .post('/create',create) //recibe los datos del formulario
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .delete('/remove/:id',remove)
    .get('/search',search)

module.exports = router;