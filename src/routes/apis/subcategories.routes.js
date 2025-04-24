const express = require('express');
const { getAllSubcategories, getSubcategoryById } = require('../../controllers/apis/subCategoriesApiController');
const { getProductsBySubcategory } = require('../../controllers/apis/productsApiController');
const router = express.Router();

// api/sub-categories
router
    .get('/',getAllSubcategories)
    .get('/:id',getSubcategoryById)
    .get('/:id/products',getProductsBySubcategory)

module.exports = router;