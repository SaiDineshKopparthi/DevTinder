const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
    },
    emailID: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          if (/\s/.test(value)) {
            throw new Error("Email cannot contain spaces.");
          }
        },
      },
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
    },
    photoURL: {
      type: String,
      default:
        "https://wallpapers.com/images/high/angel-default-pfp-a1ur2igijuw6g02n.webp",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL");
        }
      },
    },
    skills: {
      type: [String], 
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  return await jwt.sign({ _id: user._id }, "Sweeney80085Sydney", {
    expiresIn: "3d",
  });
};

userSchema.methods.validatePassword = async function (userInputPassword) {
  const user = this;
  const hashedPassword = user.password;

  return await bcrypt.compare(userInputPassword, hashedPassword);
};

module.exports = mongoose.model("User", userSchema);
