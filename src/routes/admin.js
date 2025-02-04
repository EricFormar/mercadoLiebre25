var express = require('express');
const { listar } = require('../controllers/adminController.js');
var router = express.Router();


router.get('/listProducts', listar);



module.exports = router;