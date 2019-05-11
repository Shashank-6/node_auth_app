const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function(req, res, next) {
    userModel.create(
      {
        email: req.body.email,
        password: req.body.password
      },
      function(err, result) {
        if (err) next(err);
        else
          res.json({
            status: "1"
            //message: "User added successfully!!!",
            //data: null
          });
      }
    );
  },
  authenticate: function(req, res, next) {
    userModel.findOne({ email: req.body.email }, function(err, userInfo) {
      if (err) {
        res.json({
          status: 0
          // message: "Invalid Entry"
        });
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey")
            // { expiresIn: "1h" }
          );
          res.json({
            status: 1,
            //message: "user found!!!",
            token: token
          });
        } else {
          res.json({
            status: "error"
            //message: "Invalid email/password!!!",
            //data: null
          });
        }
      }
    });
  }
};
