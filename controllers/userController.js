const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const login_user = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ displayName: user.displayName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signup_user = async (req, res) => {
  const { displayName, email, password, photoURL, online } = req.body;

  try {
    const user = await User.signup(
      displayName,
      email,
      password,
      photoURL,
      online
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ displayName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signup_user, login_user };
