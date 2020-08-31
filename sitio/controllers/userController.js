let dbProductos = require('../data/database'); //JSON parseado de productos
const {validationResult} = require('express-validator'); //requiero validationResult de expres-validator

module.exports = {
    login:function(req,res){
        res.render('userLogin',{
            title:"Ingresá a tu cuenta"
        })
    },
    processLogin: function(req,res){

    },
    register:function(req,res){
        res.render('userRegister',{
            title:"Registro de usuario"
        })
    },
    processRegister:function(req,res,next){
        let errors = validationResult(req); //cargo los errores, si los hubiera
        if(errors.isEmpty()){
            res.send(req.body)
        }
        else{
            res.render('userRegister',{
                title: "Registro de usuario",
                errors: errors.mapped(),
                old:req.body
            })
        }
    },
    profile: function(req, res) {
        res.render('userProfile', {
            title: "Perfil de usuario",
            productos: dbProductos.filter(producto => {
                return producto.category != "visited" & producto.category != "in-sale"
            }),
            id: undefined //????????
        })
    }
}