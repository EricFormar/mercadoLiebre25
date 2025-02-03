var express = require('express');
var router = express.Router();


router.get('/register', (req,res) => {
    return res.render('register')
});

router.get('/login', (req,res) => {
    return res.render('login')
});



module.exports = router;