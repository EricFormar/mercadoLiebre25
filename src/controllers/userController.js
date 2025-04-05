const bcrypt = require('bcrypt');
const db = require('../database/models')

module.exports = {
  register: (req, res) => {
    return res.render("users/register");
  },
  processRegister: async (req, res) => {

    try {
      // TODO : agregar validaciones
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
  },
  login: (req, res) => {
    return res.render("users/login");
  },
  processLogin: async (req, res) => {

    try {
      // TODO: implementar validaciones
      const { email, password } = req.body
      const user = await db.User.findOne({
        email
      })
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error("Credenciales inválidas");
      }

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
  },
  profile: (req, res) => {
    return res.render('users/profile')
  },
  update: (req, res) => { },
  logout: (req, res) => { 
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.redirect('/');
  },
};
