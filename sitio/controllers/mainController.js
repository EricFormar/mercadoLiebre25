let agregaMiles = require('../functions/agregaMiles')
let dbProduct = require('../data/database') //requiero la base de datos de productos

/*dbProduct = dbProduct.map(producto => { //hago modifiaciones a los datos de la bd
    if (producto.discount != 0) { //si el descuento es distinto de 0
        producto.price = (producto.price - producto.price * producto.discount / 100).toFixed(0) //el precio del producto será el precio de lista menos el descuento sin decimales
    }
    producto.price = agregaMiles(producto.price)
    return producto
})*/

module.exports = { //exporto un objeto literal con todos los metodos
    index: function(req, res) {

        let ofertas = dbProduct.filter(producto => {
            return producto.category == "in-sale"
        })
        let visitas = dbProduct.filter(producto => {
            return producto.category == "visited"
        })
        res.render('index', { //renderizo en el navegador la vista index que contiene el HOME del sitio
            title: 'Mercado Liebre', //envío el objeto literal con la o las variables necesarias para renderizar de forma correcta el home
            ofertas: ofertas,
            visitas: visitas
        })
    }

}