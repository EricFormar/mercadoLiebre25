const bcrypt = require('bcrypt');
const db = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {
  register: (req, res) => {
    return res.render("users/register");
  },
  processRegister: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    } else {
      try {
        const { name, surname, email, password } = req.body
  
        db.User.create({
          name: name.trim(),
          surname: surname.trim(),
          email: email.trim(),
          password: bcrypt.hashSync(password, 10),
          token: null,
          validate: true,
          lock: false,
          rolId: 2
        })
  
        return res.redirect('/users/login');
  
      } catch (error) {
        return res.status(500).render('error', {
          message: error.message,
        })
      }
    }
  },
  login: (req, res) => {
    return res.render("users/login");
  },
  processLogin: async (req, res) => {
    const errors = validationResult(req);    
    if (!errors.isEmpty()) {
      return res.render("users/login", {
        errors: errors.mapped(),
        old: req.body,
      });
    }else {
      try {
        const { email } = req.body
        const user = await db.User.findOne({
          where : {email}
        })
        req.session.cart = [];
        req.session.userLogin = {
          id: user.id,
          name: user.name,
          rol: user.rolId
        }
  
        return res.redirect('/')
  
      } catch (error) {
        return res.status(500).render('error', {
          message: error.message,
        })
      }
    }
  },
  logout: (req, res) => { 
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.redirect('/');
  },
  profile: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.session.userLogin.id, {
        include: [
          { association: 'rol'},
          { association: 'address'}
        ]
      })
            
      return res.render('users/profile', {
        user
      })
    } catch (error) {
      return res.status(500).render('error', {
        message: error.message,
      })
    }
  },
  update: async (req, res) => {
    try {
      const {name, surname, street, number, code, city, province} = req.body
      
      await db.User.update({
        name: name.trim(),
        surname: surname.trim(),
      },{
        where : {
          id: req.params.id
        }
      });

      const [address, created] = await db.Address.findOrCreate({
        where: {
          userId: req.params.id
        }, 
      });
      
      if(address) {
        address.update({
          street: street ? street.trim() : address.street,
          number: number ? number : address.number,
          code: code ? code.trim() : address.code,
          city: city ? city.trim() : address.city,
          provice: province ? province.trim() : address.provice,
        });
        await address.save();
      }
   
      return res.redirect('/users/profile')
      
    } catch (error) {
      console.log(error);
      
      return res.status(500).render('error', {
        message: error.message,
      })
    }
   },
  remove : async (req, res) => {
    try {
      await db.User.destroy({
        where: {
          id: req.params.id
        }
      })
      return res.redirect('/admin/users')
    } catch (error) {
      return res.status(500).render('error', {
        message: error.message,
      })
    }
   }
};
