const express = require('express');
const { getAllSections } = require('../../controllers/apis/sectionsApiController');
const router = express.Router();

/* GET - /api/sections */

router
    .get('/', getAllSections)

module.exports = router;