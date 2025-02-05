const {toThousand} = require('../utils')
const products = require('../data/productsDataBase.json')

module.exports = {
    index : (req,res) => {
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
    }
}