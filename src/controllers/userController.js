const { v4: uuidv4, validate } = require('uuid');
const bcrypt = require('bcrypt');
const { readJson, saveJson } = require('../data/index.js');

module.exports = {
  register: (req, res) => {
    return res.render("users/register");
  },
  processRegister: function (req, res) {

    const users = readJson('users.json')
    const {name, surname, email, password} = req.body

    const newUser = {
      id : uuidv4(),
      name : name.trim(),
      surname : surname.trim(),
      email : email.trim(),
      password : bcrypt.hashSync(password, 10),
      token : null,
      validate : true,
      lock : false,
      rol : 'user'
    }

    users.push(newUser)
    saveJson('users.json', users);

    return res.redirect('/users/login');
  },
  login: (req, res) => {
    return res.render("users/login");
  },
  processLogin: (req, res) => {
    
    const users = readJson('users.json')
    const {email, password} = req.body

    const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password))

    if(!user){
      return res.render('users/login',{
        error : "Credenciales inválidas"
      })
    }
    
    req.session.userLogin = {
      id : user.id,
      name : user.name,
      rol : user.rol
    }

    return res.redirect('/')
  },
  profile: (req, res) => {},
  update: (req, res) => {},
  logout: (req, res) => {},
};
