const express = require("express");

// controllers
const { signup_user, login_user } = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", login_user);

// signup route
router.post("/signup", signup_user);

module.exports = router;
