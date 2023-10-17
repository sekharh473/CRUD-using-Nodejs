var Userdb = require("../model/model");

//create and save new user

exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ Message: "Content can not be empty!" });
    return;
  }

  console.log("body---", req.body);

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in the database
  user
    .save(user)
    .then((data) => {
      // res.send(data)
      return res.json({
        message: "User added successful.",
        success: true,
      });
      // res.redirect('/add-user')
    })
    .catch((err) => {
      // console.log("error----", err)
      return res.json({
        message: err.Message || "User add failed.",
        success: false,
      });
      // res.status(500).send({Message:err.Message||"Some error occurred while creating a create operation"})
    });
};

//retrive and return all user/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found user with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `Error retriving user id with id ${id}` });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error occurred while retriving user information",
          });
      });
  }
};

//UPDATE a new identified by user id
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;

  Userdb.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot update user with id${id},maybe user not found`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error Update user information" });
    });
};

//delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `can not delete with id ${id},Maybe its wronng` });
      } else {
        res.send({
          message: "user was deleted succecfully!",
        });
      }
    })
    .catch((err) => {
      response
        .status(500)
        .send({ message: `could not delete user with ${id}` });
    });
};
