const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");
const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!")
    }
    
    const user = req.user;

    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    })

    await user.save();

    res.json({
      message: `${user.firstName}, your profile is updated successfully.`,
      data: user
    });
  } catch (error){
    res.status(400).send("Error: " + error.message);
  }
});

router.patch("/profile/password", userAuth, async (req, res) => {
  try{

    const { oldPassword, newPassword } = req.body;
    if(!oldPassword || !newPassword){
      throw new Error("Both old and new passwords are needed.");
    }

    const user = req.user;

    const isOldPasswordValid = await user.validatePassword(oldPassword);

    if(!isOldPasswordValid){
      throw new Error("The old password is incorrect!");
    }

    if(!validator.isStrongPassword(newPassword)){
      throw new Error("The new password is not strong enough!");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user["password"] = newHashedPassword;
    await user.save();

    res.json({
      message: `${user.firstName}, your password is updated successfully.`
    });
  } catch (error){
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = router;