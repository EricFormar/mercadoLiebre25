const fs = require('fs')
const path = require('path')

const {toThousand} = require('../utils')
const products = require('../data/productsDataBase.json')
const categories = require('../data/categories.json')

module.exports = { 
    list: (req,res) => {
        return res.render('products/products',{
            products,
            toThousand
        })
    },
    detail: (req, res) => {

        const product = products.find(product => product.id === +req.params.id)
        
        return res.render('products/productDetail',{
            ...product,
            toThousand
        })
    },

    add: (req, res) => {
        return res.render('products/productAdd',{
            categories
        })
    },

    create: (req, res) => {

        const {name, price, discount, description, category} = req.body

        const newProduct = {
            id : products[products.length - 1].id + 1,
            name : name.trim(),
            description : description.trim(),
            price : +price,
            discount : +discount,
            image : "default-image.png",
            category
        }

        products.push(newProduct)

        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'),JSON.stringify(products, null, 3),'utf-8')

        return res.redirect('/products/detail/' + newProduct.id)
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