const axios = require("axios");

exports.homeRoutes = (req, res) => {
  //making a get request to /api/user

  axios
    .get("http://localhost:3000/api/user")
    .then(function (response) {
      // console.log(response.data) //Testing Purpose
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/user", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
