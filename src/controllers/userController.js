module.exports = {
  register: (req, res) => {
    return res.render("users/register");
  },
  processRegister: function (req, res) {},
  login: (req, res) => {
    return res.render("users/login");
  },
  processLogin: (req, res) => {},
  profile: (req, res) => {},
  update: (req, res) => {},
  logout: (req, res) => {},
};
