const express = require('express');
const { getAllProducts, getProductById, createNewProduct } = require('../../controllers/apis/productsApiController');
const upload = require('../../middlewares/upload');
const router = express.Router();

/* GET - /api/products */
/* GET - /api/products/:id */
/* POST - /api/products */

router
    .get('/',getAllProducts)
    .get('/:id',getProductById)
    .post('/', upload.single('image'), createNewProduct)

module.exports = router;