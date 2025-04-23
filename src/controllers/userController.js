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
          email
        })
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
      const user = await db.User.findByPk(req.session.userLogin.id)
      return res.render('users/profile', {
        user
      })
    } catch (error) {
      return res.status(500).render('error', {
        message: error.message,
      })
    }
  },
  update: (req, res) => { },
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
