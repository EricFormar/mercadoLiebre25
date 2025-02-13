const { readJson } = require('../data/index.js')
const {toThousand, paginator} = require('../utils')

module.exports = {
    index : (req,res) => {
        console.log({
            userLogin : req.session.userLogin
        });
        
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
        return res.render('admin')
    },
    adminProducts : (req,res) => {
        let products = readJson('productsDataBase.json')
        const categories = readJson('categories.json')

        const {page, perPage, category, search} = req.query

        if(category) {
            products = products.filter(product => product.category === category)
        }

        if(search) {
            products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase().trim()))
        }

        const {items, total} = paginator(products, page, perPage)

        return res.render('products/productsAdmin',{
            products: items,
            currentPage : page || 1,
            totalPages : total,
            categories,
            filterCategory : category,
            search,
            toThousand
        })
    },
    adminUsers : (req,res) => {
        const users = readJson('users.json')

        const {page, perPage} = req.query

        const {items, total} = paginator(users, page, perPage)

        return res.render('users/usersAdmin',{
            users: items,
            currentPage : page || 1,
            totalPages : total,
        })
    }
}