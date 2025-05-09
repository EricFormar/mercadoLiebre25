const db = require('../../database/models');
const { baseURL } = require('../../utils');

const getCart = async (req,res) => {
    try {

        return res.status(200).json({
            ok: true,
            data : req.session.cart 
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        })
    } 
}

const addItemToCart = async (req,res) => {
    try {
        console.log(req.params);
        
        let product = await db.Product.findByPk(req.params.id,{
            include : ['category','images']
        });
        let item = {
            id: product.id,
            nombre: product.name,
            image: `${baseURL(req)}/images/products/${product.images[0].file}`,
            precio: product.price,
            categoria: product.category.name,
            cantidad: 1,
            total: product.price,
        }

        req.session.cart.push(item)

        return res.status(200).json({
            ok: true,
            data : req.session.cart
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        })
    }
}




module.exports = {
    getCart,
    addItemToCart
}