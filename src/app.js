const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("./Models/user");
const { connectDB } = require("./config/database");
const { validateSignUpData } = require("./utils/validation.js");
const { userAuth } = require("./middlewares/auth.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //Generate a JWT token
      const token = await jwt.sign({ _id: user._id }, "Sweeney80085Sydney", {
        expiresIn: "3d",
      });

      //Sending JWT Token as Cookies
      res.cookie("token", token, {expires: newDate(Date.now() + (3 * 24 * 36000))});

      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error while logging the user: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    if (!req.user) {
      throw new Error("No user access");
    }
    res.send(`${req.user.firstName} has sent a connection request.`);
  } catch (error) {
    res
      .status(400)
      .send("Error sending the connection request: " + error.message);
  }
});

//Connecting to Database and Making the server listen for requests
connectDB()
  .then(() => {
    console.log("Connection to MongoDB successful");
    app.listen(3000, () => console.log("Listening on port 3000"));
  })
  .catch((error) => {
    console.log("Problem connecting to MongoDB");
  });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.send("No users available");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {}
// });

// app.get("/user", async (req, res) => {
//   const emailID = req.body.emailID;

//   try {
//     const user = await User.findOne({ emailID: emailID });

//     if (!user) {
//       res.send("No user found!");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const id = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["photoURL", "gender", "age", "skills"];

//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Cannot update one of these fields");
//     }
//     if (data.skills?.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }
//     await User.findByIdAndUpdate({ _id: id }, data, {
//       runValidators: true,
//     });
//     res.send("User data updated successfully");
//   } catch (error) {
//     res.status(400).send(`Something went wrong: ${error.message}`);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userID = req.body.userID;

//   try {
//     await User.findByIdAndDelete({ _id: userID });
//     res.send("User deleted from the collection!");
//   } catch (error) {
//     res.status(400).send(`Something went wrong: ${error.messages}`);
//   }
// });
