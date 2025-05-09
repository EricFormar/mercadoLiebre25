const express = require('express');
const { getCart, addItemToCart } = require('../../controllers/apis/cartApiController');
const router = express.Router();

/* GET - /api/cart */

router
    .get('/', getCart)
    .get('/item/:id',addItemToCart)

module.exports = router;