const express = require('express');
const { getAllBrands } = require('../../controllers/apis/brandsApiController');
const router = express.Router();

/* GET - /api/sections */

router
    .get('/', getAllBrands)

module.exports = router;