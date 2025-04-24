const express = require('express');
const { getProductsByCategory } = require('../../controllers/apis/productsApiController');
const { getAllCategories, getCategoryById } = require('../../controllers/apis/categoriesApiController');
const { getSubcategoriesByCategory } = require('../../controllers/apis/subCategoriesApiController');
const router = express.Router();

// api/categories
router
    .get('/',getAllCategories)
    .get('/:id',getCategoryById)
    .get('/:id/products',getProductsByCategory)
    .get('/:id/subcategories', getSubcategoriesByCategory)

module.exports = router;