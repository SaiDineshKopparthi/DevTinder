const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./Models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //Create a new "user" document using "User", model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added in the Collection!");
  } catch (error) {
    res.status(400).send("Error while creating the user: " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.send("No users available");
    } else {
      res.send(users);
    }
  } catch (error) {}
});

app.get("/user", async (req, res) => {
  const emailID = req.body.emailID;

  try {
    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      res.send("No user found with the given email");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const id = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoURL", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Cannot update one of these fields");
    }
    if (data.skills?.length > 10){
        throw new Error("Skills cannot be more than 10")
    }
    await User.findByIdAndUpdate({ _id: id }, data, {
      runValidators: true,
    });
    res.send("User data updated successfully");
  } catch (error) {
    res.status(400).send(`Something went wrong: ${error.message}`);
  }
});

app.delete("/user", async (req, res) => {
  const userID = req.body.userID;
  console.log(userID);

  try {
    await User.findByIdAndDelete({ _id: userID });
    res.send("User deleted from the collection!");
  } catch (error) {
    res.status(400).send("Something went wrong");
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
