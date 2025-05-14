const express = require('express');
const { getCart, addItemToCart, removeItemFromCart, removeAllItems } = require('../../controllers/apis/cartApiController');
const router = express.Router();

/* GET - /api/cart */

router
    .get('/', getCart)
    .post('/add/:id',addItemToCart)
    .delete('/remove/:id', removeItemFromCart)
    .delete('/remove/all',removeAllItems)

module.exports = router;