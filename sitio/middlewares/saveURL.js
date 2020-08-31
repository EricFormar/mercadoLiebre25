const session = require("express-session")

module.exports = function saveURL(req,res,next){
    req.session.urlAnterior = req.session.url //guarda la url anterior
    req.session.url = req.url //guarda la url actual
   console.log(req.session.urlAnterior)
   console.log(req.url)
   next()
    }