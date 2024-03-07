const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  getUser,
  login,
  update
} = require("../controllers/user.controller");

const verifyToken = require("../middlewares/staticAuth");


router
  .get("/users", verifyToken,  getAllUsers)
  .get("/user", verifyToken,  getUser)
  .patch("/user", verifyToken, update)
  .post("/register", register)
  .post("/login", login)


module.exports = router;
