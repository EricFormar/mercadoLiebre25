const { readJson } = require('../data/index.js')
const {toThousand} = require('../utils')

module.exports = {
    index : (req,res) => {
        const products = readJson('productsDataBase.json')

        let inSale = products.filter(producto => {
            return producto.category == "in-sale"
        })
        let newest = products.filter(producto => {
            return producto.category == "visited"
        })
        res.render('home', { 
            newest,
            inSale,
            toThousand
        })
    },
    admin : (req,res) => {
        const products = readJson('productsDataBase.json')

        return res.render('admin',{
            products
        })
    }
}