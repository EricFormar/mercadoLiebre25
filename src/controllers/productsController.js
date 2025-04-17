const fs = require('fs')
const path = require('path')
const { toThousand } = require('../utils')
const db = require('../database/models')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

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
            return res.status(500).render('error', {
                message: error.message,
            })
        }
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
    update: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {

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
                    errors: errors.mapped(),
                    sections,
                    categories,
                    subcategories,
                    brands,
                    ...product.dataValues
                })
            } else {
                const product = await db.Product.findByPk(req.params.id, {
                    include: [
                        { association: 'images' }
                    ]
                })
                const { name, price, discount, description, category, section, brand, subcategory } = req.body;
                product.set({
                    name: name.trim(),
                    description: description.trim(),
                    price: +price,
                    discount: +discount,
                    categoryId: category,
                    sectionId: section,
                    brandId: brand,
                    subcategoryId: subcategory,
                });
                await product.save();

                if(req.file) {
                    if(product.images.length){
                        const pathFile = path.join(__dirname, '../../public/images/products', product.images[0].file)
                        fs.existsSync(pathFile) && fs.unlinkSync(pathFile)
                        await db.Image.update({
                            file: req.file.filename
                        },{
                            where: {
                                productId: product.id
                            }
                        });
                    } else {
                        await db.Image.create({
                            productId: product.id,
                            file: req.file.filename
                        }); 
                    }
               
                }
               
                return res.redirect('/admin')
            }
        } catch (error) {
            console.log(error);
            
            return res.status(500).render('error', {
                message: error.message,
            })
        }
    },
    remove: async (req, res) => {

        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: [
                    { association: 'images' }
                ]
            })
            if(product.images.length){
                const pathFile = path.join(__dirname, '../../public/images/products', product.images[0].file)
                fs.existsSync(pathFile) && fs.unlinkSync(pathFile)
                await db.Image.destroy({
                    where: {
                        productId: product.id
                    }
                });
            }
            await product.destroy();

            return res.redirect('/admin')
        } catch (error) {
            return res.status(500).render('error', {
                message: error.message,
            })
        }
    },

    search: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['images'],
                where : {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${req.query.keywords}%`
                            }
                        },
                        {
                            description: {
                                [Op.like]: `%${req.query.keywords}%`
                            }
                        }
                    ]
                }
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
    showCart: (req, res) => res.render('products/productCart')

}