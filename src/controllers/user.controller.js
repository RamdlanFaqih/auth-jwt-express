const userModel = require("../models/user.model");
const { generateToken } = require("../helpers/jwt");
const bcrypt = require("bcrypt");
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await userModel.findUsers();
      res.status(200).json({
        message: "Get users Successfully",
        data: result.rows,
      });
    } catch (err) {
      res.status(500).json({
        message: "Interval Server Error",
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const result = await userModel.findById(req.id);
      res.status(200).json({
        message: "Get user successfully",
        data: result.rows[0],
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      const { nama, email, password } = req.body;
      if (!password) {
        return res.status(400).json({
          message: "Password is required",
        });
      }

      const hash = await bcrypt.hash(password, 10);
      const result = await userModel.createUser(nama, email, hash);
      res.status(200).json({
        message: "Register successfully",
        data: result.rows,
      });
    } catch (err) {
      console.log("register failed", err.message);
      res.status(500).json({
        message: "Interval Server Error",
        error: err.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email or Password are required",
        });
      }
      const result = await userModel.findByEmail(email);
      if (result.rows.length > 0) {
        const userId = result.rows[0].id;
        const userEmail = result.rows[0].email;
        const userPassword = result.rows[0].password;
        const compare = await bcrypt.compare(password, userPassword);
        console.log(compare);

        if (compare) {
          const token = await generateToken({
            id: userId,
            email: userEmail,
          });
          res.status(200).json({
            message: "Login succesfully",
            generateToken: token,
          });
        } else {
          res.json({
            message: "Login failed",
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      const {nama} = req.body;
      const data = {id:req.id, nama}

      const result = await userModel.updateUser(data);
      res.status(200).json({
        message: "User updated successfully",
        data: result,
      })
    } catch (err) {
      res.json({
        message: err.message,
      })
    }
  }
};

module.exports = userController;
