/************ BASES DE DATOS ************/

let dbProductos = require('../data/database'); //JSON parseado de productos
const dbCategories = require('../data/db_categories'); //requiero las categorias
let dbUsers = require('../data/dbUsers');

/*************** MODULOS ****************/

const {validationResult} = require('express-validator'); //requiero validationResult de expres-validator
const bcrypt =require('bcrypt');
const fs = require('fs');
const path = require('path');
const upload = require('../middlewares/upAvatares');

module.exports = {
    register:function(req,res){
        res.render('userRegister',{
            title:"Registro de usuario",
            css:"register.css",
            categorias:dbCategories
        })
    },
    processRegister:function(req,res){

        let errors = validationResult(req); //cargo los errores, si los hubiera
        let lastID = 1;
        dbUsers.forEach(user=>{
            if(user.id > lastID){
                lastID = user.id
            }
        })
        if(errors.isEmpty()){ //si no hay errores
            let nuevoUsuario = { //creo un objeto literal con el nuevo usuario
                id:lastID+1,//incremento el numero del ID
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                email:req.body.email,
                avatar:(req.files[0])?req.files[0].filename:"default.png",
                pass:bcrypt.hashSync(req.body.pass,10),
                rol:"user"
            }
            dbUsers.push(nuevoUsuario);
            dbUsers.sort(function(a,b){ //ordeno los usuarios por id
                return ((a.id<b.id)?-1:(a.id>b.id)?1:0)
            })

            fs.writeFileSync(path.join(__dirname,'..','data','dbUsers.json'),JSON.stringify(dbUsers),'utf-8')
            return res.redirect('/users/login')
        }
        else{ //de lo contrario vuelvo a la vista de registro de usuario
             res.render('userRegister',{
                title: "Registro de usuario",
                css:"index.css",
                errors: errors.mapped(),
                old:req.body
            })
        }
    },
    login:function(req,res){
        res.render('userLogin',{
            title:"Ingresá a tu cuenta",
            css:"index.css",
            categorias:dbCategories

        })
    },
    processLogin: function(req,res){
        let url = '/'; //asigno a url la ruta del home
        if(req.session.url){
            url = req.session.url //si se deriva por medio de sessionUserCheck, guardo la url de origen para luego, una vez logueado lo redirija a esa pagina
        }
        let errors = validationResult(req);
        if(errors.isEmpty()){
         
            dbUsers.forEach(user => {
                if(user.email == req.body.email){
                    req.session.user = {
                        id: user.id,
                        nick: user.nombre + " " + user.apellido,
                        email: user.email,
                        avatar: user.avatar
                    }
                }
                if(req.body.recordar){ //si viene tildada el checkbox creo la cookie
                    res.cookie('userMercadoLiebre',req.session.user, {maxAge:1000*60*5})
                }
               
            });
            res.locals.user = req.session.user;
            console.log(res.locals.user)
            res.redirect(url)
        }else{
            res.render('userLogin',{
                title:"Ingresá a tu cuenta",
                css:"index.css",
                errors:errors.mapped(),
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
            categorias:dbCategories

        })
    },
    logout:function(req,res){
        req.session.destroy(); //elimino la sesion
        if(req.cookies.userMercadoLiebre){ //chequeo que la cookie exista
            res.cookie('userMercadoLiebre','',{maxAge:-1}); //borro la cookie
        }
        return res.redirect('/')
    }
}