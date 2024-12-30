const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    //Validation of the data
    validateSignUpData(req);

    const { firstName, lastName, emailID, password } = req.body;

    //Encrypting a password
    const passwordHash = await bcrypt.hash(password, 10);

    //Create a new "user" document using "User" model
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added in the Collection!");
  } catch (error) {
    res.status(400).send("Error while creating the user: " + error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //Generate a JWT token
      const token = await user.getJWT();

      //Sending JWT Token as Cookies
      res.cookie("token", token, {
        expires: new Date(Date.now() + 3 * 24 * 36000),
      });

      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error while logging the user: " + error.message);
  }
});

router.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("User Logout Successful");
});

module.exports = router;