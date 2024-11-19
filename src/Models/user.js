const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
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
        if(!validator.isEmail(value)){
            throw new Error("Invalid email format")
        }
    }
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18
  },
  gender: {
    type: String,
  },
  photoURL: {
    type: String,
    default: "https://wallpapers.com/images/high/angel-default-pfp-a1ur2igijuw6g02n.webp",
    validate(value) {
        if(!validator.isURL(value)){
            throw new Error("Invalid Photo URL")
        }
    }
  },
  skills: {
    type: [String]
  }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
