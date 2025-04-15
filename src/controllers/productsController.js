const { toThousand } = require('../utils')
const db = require('../database/models')
const { validationResult } = require('express-validator')

module.exports = {
    list: async (req, res) => {

        try {
            const products = await db.Product.findAll({
                include: ['images']
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

    add: async (req, res) => {
        try {
            const [sections, categories, subcategories, brands] = await Promise.all([
                db.Section.findAll({
                    order: [['name']]
                }),
                db.Category.findAll({
                    order: [['name']]
                }),
                db.Subcategory.findAll({
                    order: [['name']]
                }),
                db.Brand.findAll({
                    order: [['name']]
                })
            ])

            return res.render('products/productAdd', {
                sections,
                categories,
                subcategories,
                brands
            })
        } catch (error) {
            return res.status(500).render('error', {
                message: error.message,
            })
        }
    },

    create: async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                const [sections, categories, subcategories, brands] = await Promise.all([
                    db.Section.findAll({
                        order: [['name']]
                    }),
                    db.Category.findAll({
                        order: [['name']]
                    }),
                    db.Subcategory.findAll({
                        order: [['name']]
                    }),
                    db.Brand.findAll({
                        order: [['name']]
                    })
                ])
                return res.status(422).render('products/productAdd', {
                    errors: errors.mapped(),
                    sections,
                    categories,
                    subcategories,
                    brands,
                });
            } else {
                const { name, price, discount, description, category, section, subcategory, brand } = req.body;

                const newProduct = await db.Product.create({
                    name: name.trim(),
                    description: description.trim(),
                    price: +price,
                    discount: +discount,
                    categoryId: category,
                    sectionId: section,
                    subcategoryId: subcategory,
                    brandId: brand
                });

                req.file && await db.Image.create({
                    productId: newProduct.id,
                    file: req.file.filename
                });

                return res.redirect('/admin/products?page=2');
            }


        } catch (error) {
            console.log(error);

            return res.status(500).render('error', {
                message: error.message,
            })
        }

        /*  const products = readJson('productsDataBase.json')
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
 
         return res.redirect('/products/detail/' + newProduct.id) */
    },

    edit: async (req, res) => {
        try {
            const [product, sections, categories, subcategories, brands] = await Promise.all([
                db.Product.findByPk(req.params.id, {
                    include: [
                        { association: 'images' }
                    ]
                }),
                db.Section.findAll({
                    order: [['name']]
                }),
                db.Category.findAll({
                    order: [['name']]
                }),
                db.Subcategory.findAll({
                    order: [['name']]
                }),
                db.Brand.findAll({
                    order: [['name']]
                })
            ])

            return res.render('products/productEdit', {
                sections,
                categories,
                subcategories,
                brands,
                ...product.dataValues
            })
        } catch (error) {
            return res.status(500).render('error', {
                message: error.message,
            })
        }
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