const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password.");
  }
};

const validateEditProfileData = (req) => {
  const allowedFieldsForEdit = [
    "firstName",
    "lastName",
    "emailID",
    "photoURL",
    "gender",
    "age",
    "about",
    "skills",
  ];

  return Object.keys(req.body).every((field) =>
    allowedFieldsForEdit.includes(field)
  );
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};