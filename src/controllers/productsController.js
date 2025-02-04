const products = require('../data/productsDataBase.json')

module.exports = { 
    list: (req,res) => {
        return res.render('products/products')
    },
    detail: (req, res) => {

        const product = products.find(product => product.id === +req.params.id)
        
        return res.render('products/detail',{
            ...product
        })
    },

    add: (req, res) => {
        return res.render('products/productAdd')
    },

    create: (req, res) => {

    },

    edit: (req, res ) => {
        return res.render('products/productEdit')
    },
    update: function(req, res) {
    
    },
    remove: function(req,res){
     
    },

    search: function(req, res) {
  
    },

}