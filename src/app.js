const express = require('express');
const { connectDB } = require("./config/database")
const User = require("./Models/user")

const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {

    //Create a new "user" document using "User", model
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User Added in the Collection!");
    } catch (error) {
        res.status(400).send("Error while creating the user: " + error.message);
    }
})

//Connecting to Database and Making the server listen for requests
connectDB().then(() => {
    console.log("Connection to MongoDB successful");
    app.listen(3000, () => console.log("Listening on port 3000"));
}).catch(error => {
    console.log("Problem connecting to MongoDB");
})