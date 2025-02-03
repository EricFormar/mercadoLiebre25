const fs = require('fs');
const path = require('path');

const dbProducts = require('../data/database') //requiero la base de datos de productos
const dbCategories = require('../data/db_categories'); //requiero las categorias

const {validationResult} = require('express-validator');

module.exports = { //exporto un objeto literal con todos los metodos
    list: function(req, res) {
      
    },
    detail: function(req, res) {

    },

    add: function(req, res) {
    },

    create: function(req, res, next) {
    },

    edit: function(req, res, next) {
       
    },
    update: function(req, res) {
    
    },
    remove: function(req,res){
     
    },

    search: function(req, res) {
  
    },

}