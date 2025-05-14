const db = require('../../database/models');
const { baseURL } = require('../../utils');

const getCart = async (req, res) => {
    try {

        const order = await db.Order.findOne({
            where: {
                userId: req.session.userLogin.id,
                statusId: 1
            },
            include: [
                {
                    association: 'items', include: [
                        { association: 'product', include: ['images', 'category'] }
                    ]
                },
                { association: 'status' },
                { association: 'user' }
            ]
        });
        if (!order) {
            const newOrder = await db.Order.create({
                userId: req.session.userLogin.id,
                statusId: 1
            });
            req.session.orderId = newOrder.id;
            req.session.cart = [];
        } else {
            req.session.orderId = order.id;
            req.session.cart = order.items.map(item => {
                let productCart = {
                    id: item.product.id,
                    nombre: item.product.name,
                    image: `${baseURL(req)}/images/products/${item.product.images[0].file}`,
                    precio: item.product.price,
                    categoria: item.product.category.name,
                    cantidad: item.quantity,
                    total: item.product.price * item.quantity,
                }
                return productCart
            });
        }

        return res.status(200).json({
            ok: true,
            data: req.session.cart
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        })
    }
}

const addItemToCart = async (req, res) => {
    try {
        let product = await db.Product.findByPk(req.params.id, {
            include: ['category', 'images']
        });

        let result = req.session.cart.find(item => item.id == product.id);
        let cantidad = result ? result.cantidad + 1 : 1;
        let item = {
            id: product.id,
            nombre: product.name,
            image: `${baseURL(req)}/images/products/${product.images[0].file}`,
            precio: product.price,
            categoria: product.category.name,
            cantidad,
            total: product.price * cantidad,
        }
        if (result) {
            let index = req.session.cart.indexOf(result);
            req.session.cart[index] = item;

            await db.Item.update({
                quantity: cantidad
            }, {
                where: {
                    productId: product.id,
                    orderId: req.session.orderId
                }
            });
        } else {
            await db.Item.create({
                quantity: cantidad,
                productId: product.id,
                orderId: req.session.orderId
            })
            req.session.cart.push(item)
        }

        return res.status(200).json({
            ok: true,
            data: req.session.cart
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        })
    }
}

const removeItemFromCart = (req, res) => {
    try {
        let resultado = req.session.cart.find(item => item.id == req.params.id);
        if (resultado.cantidad > 1) {
            resultado.cantidad = resultado.cantidad - 1;
            resultado.total = resultado.precio * resultado.cantidad;

            req.session.cart = req.session.cart.map(item => {
                if (item.id == req.params.id) {
                    item = resultado;
                }
                return item
            })
        } else {
            req.session.cart = req.session.cart.filter(item => item.id != req.params.id);
        }

        return res.status(200).json({
            ok: true,
            data: req.session.cart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        })
    }
}

const removeAllItems = async (req, res) => {
    try {
        req.session.cart = [];
        return res.status(200).json({
            ok: true,
            data: req.session.cart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        })
    }
}




module.exports = {
    getCart,
    addItemToCart,
    removeItemFromCart,
    removeAllItems
}