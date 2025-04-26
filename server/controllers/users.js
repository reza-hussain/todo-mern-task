const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");
const { generateHash, compareHash } = require("../lib/bcrypt");

const registerUser = async (req, res) => {
  if (!req.body?.email?.length || !req.body?.password?.length) {
    return res
      .status(400)
      .json({ message: "Username and Password are required" });
  }

  const { email, password } = req.body;

  if (email?.length && password?.length) {
    User.find({ email })
      .then(async (user) => {
        if (user?.length) {
          return res.status(400).json({ message: "User already exists" });
        } else {
          const hashedPassword = await generateHash(password);
          req.body.password = hashedPassword;

          const newUser = new User({ email, password: hashedPassword });
          return newUser.save();
        }
      })
      .then(() => {
        res.status(201).json({ message: "User registered successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    res.status(400).json({ message: "Invalid input" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email?.length && password?.length) {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = compareHash(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        req.user = user;
        res.status(200).json({ message: "Login successful", user, token });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
