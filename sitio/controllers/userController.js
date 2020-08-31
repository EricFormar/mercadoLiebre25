let dbProductos = require('../data/database'); //JSON parseado de productos
const {validationResult} = require('express-validator'); //requiero validationResult de expres-validator

module.exports = {
    login:function(req,res){
        res.render('userLogin',{
            title:"Ingresá a tu cuenta",
            css:"index.css"
        })
    },
    processLogin: function(req,res){
        req.session.user = "Yo";

        if(req.session.url){
            console.log("--------> " + req.session.url)
             url = req.session.url
        }
        console.log(url)
        return res.redirect(url)
    },
    register:function(req,res){
        res.render('userRegister',{
            title:"Registro de usuario",
            css:"index.css"
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
                css:"index.css",
                errors: errors.mapped(),
                old:req.body
            })
        }
    },
    profile: function(req, res) {
        res.render('userProfile', {
            title: "Perfil de usuario",
            css:"profile.css",
            productos: dbProductos.filter(producto => {
                return producto.category != "visited" & producto.category != "in-sale"
            }),
            id: undefined //????????
        })
    }
}