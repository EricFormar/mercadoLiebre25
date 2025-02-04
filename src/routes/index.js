const express = require('express');
const { index } = require('../controllers/indexController.js');
const router = express.Router();


router
    .get('/', index)



module.exports = router;