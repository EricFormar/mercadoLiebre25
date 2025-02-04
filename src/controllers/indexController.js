const products = require('../data/productsDataBase.json')

module.exports = {
    index : (req,res) => {

        return res.render('home',{
            products
        })
    }
}