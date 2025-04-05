const { toThousand } = require('../utils')
const categories = [];

const db = require('../database/models')

module.exports = {
    list: async (req, res) => {

        try {
            const products = await db.Product.findAll({
                include : ['images']
            })
            return res.render('products/productsList', {
                products,
                toThousand
            })
        } catch (error) {
            return res.status(500).render('error', {
                message: error.message,
            })
        }
    },
    detail: async (req, res) => {

        try {
            const { id } = req.params;
            const product = await db.Product.findByPk(id, {
                include: [
                    {
                        association: 'images'
                    }
                ]
            })

            return res.render('products/productDetail', {
                ...product.dataValues,
                admin: req.query.admin,
                toThousand
            })
        } catch (error) {
            return res.status(500).render('error', {
                message: error.message,
            })
        }
    },

    add: (req, res) => {
        return res.render('products/productAdd', {
            categories
        })
    },

    create: (req, res) => {

        const products = readJson('productsDataBase.json')
        const { name, price, discount, description, category } = req.body

        const newProduct = {
            id: products[products.length - 1].id + 1,
            name: name.trim(),
            description: description.trim(),
            price: +price,
            discount: +discount,
            image: "default-image.png",
            category
        }

        products.push(newProduct)

        saveJson('productsDataBase.json', products)

        return res.redirect('/products/detail/' + newProduct.id)
    },

    edit: (req, res) => {

        const { id } = req.params
        const products = readJson('productsDataBase.json')
        const categories = readJson('categories.json')

        const product = products.find(product => product.id === +id)

        return res.render('products/productEdit', {
            categories,
            ...product
        })
    },
    update: function (req, res) {

        const products = readJson('productsDataBase.json')

        const { name, price, discount, description, category } = req.body

        const productsModify = products.map(product => {
            if (product.id === +req.params.id) {
                product.name = name.trim();
                product.price = +price;
                product.discount = +discount;
                product.description = description.trim();
                product.category = category;
            }
            return product
        })

        saveJson('productsDataBase.json', productsModify)

        return res.redirect('/admin')

    },
    remove: function (req, res) {

        const products = readJson('productsDataBase.json');
        const { id } = req.params;

        const productsModify = products.filter(product => product.id !== +id)

        saveJson('productsDataBase.json', productsModify)

        return res.redirect('/admin')

    },

    search: function (req, res) {

    },
    showCart: (req, res) => res.render('products/productCart')

}