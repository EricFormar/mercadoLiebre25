const express = require('express');
const { getAllProducts, getProductById, getProductsByCategory } = require('../../controllers/apis/productsApiController');
const router = express.Router();

/* GET - /api/products */
/* GET - /api/products/:id */
/* GET - /api/products/category/:id */

router
    .get('/',getAllProducts)
    .get('/:id',getProductById)
    .get('/category/:id',getProductsByCategory)

module.exports = router;