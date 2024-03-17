const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  onUserSignIn: async function (req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        res.json({
          success: false,
          message: "Please Enter Email and Password",
        });
      } else {
        let securePassword = await bcrypt.hash(req.body.password, 10);
        let user = new User({
          name: req.body.name,
          email: req.body.email,
          password: securePassword,
        });

        await user.save();

        let token = jwt.sign(user.toJSON(), process.env.SECREAT_KEY, {
          expiresIn: "900s",
        });

        res.json({
          success: true,
          message: "User Created Successfully!",
          token: token,
        });
      }
    } catch (error) {
      console.log("Error While Get User Signin ", error);
    }
  },

  onUserLogin: async function (req, res) {
    try {
      let findUser = await User.findOne({ email: req.body.email });
      if (findUser) {
        let matchPassword = await bcrypt.compare(
          req.body.password,
          findUser.password
        );
        if (matchPassword) {
          let token = jwt.sign(findUser.toJSON(), process.env.SECREAT_KEY, {
            expiresIn: "900s",
          });

          res.json({
            success: true,
            message: "User Login Successfully!",
            token: token,
          });
        } else {
          res.json({
            success: false,
            message: "Please Enter Valid Password!",
          });
        }
      } else {
        res.json({
          success: false,
          message: "User Not Found!",
        });
      }
    } catch (error) {
      console.log("Error While Get User Login ", error);
    }
  },

  onGetUser: async function (req, res) {
    try {
      let id = req.decoded._id;
      let findUser = await User.findOne({ _id: id });

      if (findUser) {
        res.json({
          success: true,
          user: findUser,
        });
      } else {
        res.json({
          success: false,
          message: "User Not Found!",
        });
      }
    } catch (error) {
      console.log("Error While Get User Data ", error);
    }
  },
};
