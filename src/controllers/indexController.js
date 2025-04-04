const { where, or } = require('sequelize');
const db = require('../database/models')
const { toThousand, paginator } = require('../utils')

module.exports = {
    index: async (req, res) => {
        try {
            const [newest, inSale] = await Promise.all([
                db.Product.findAll({
                    where: {
                        sectionId: 1
                    },
                    include: [
                        { association: 'images' }
                    ]
                }),
                db.Product.findAll({
                    where: {
                        sectionId: 2
                    },
                    include: [
                        { association: 'images' }
                    ]
                })
            ])
            console.log(newest);

            res.render('home', {
                newest,
                inSale,
                toThousand
            });
        } catch (error) {
            return res.render('home', {
                error: "Hubo un problema en la carga de los productos"
            });
        }

    },
    admin: (req, res) => {
        return res.render('admin')
    },
    adminProducts: async (req, res) => {
        try {
            const { page, perPage, category, search } = req.query
            const query = {
                where: {}
            }
            if (category) {
                query.where = {
                    ...query.where,
                    categoryId: category
                }
            }

            if (search) {
                query.where = {
                    ...query.where,
                    name: {
                        [db.Sequelize.Op.like]: `%${search}%`
                    }
                }
            }

            const [products, categories] = await Promise.all([
                db.Product.findAll({
                    include: [
                        { association: 'images' },
                        { association: 'category' },
                        { association: 'subcategory' },
                        { association: 'brand' }
                    ],
                    ...query
                }),
                db.Category.findAll({
                    order: [['name']]
                })
            ]) 

            const { items, total } = paginator(products, page, perPage)
            return res.render('products/productsAdmin', {
                products: items,
                currentPage: page || 1,
                totalPages: total,
                categories,
                filterCategory: category,
                search,
                toThousand
            })
        } catch (error) {
            console.log(error);
            
            return res.render('admin', {
                error: "Hubo un problema en la carga de los productos"
            });
        }
    },
    adminUsers: (req, res) => {
        const users = readJson('users.json')

        const { page, perPage } = req.query

        const { items, total } = paginator(users, page, perPage)

        return res.render('users/usersAdmin', {
            users: items,
            currentPage: page || 1,
            totalPages: total,
        })
    }
}