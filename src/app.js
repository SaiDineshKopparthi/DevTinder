const express = require('express');

const app = express();

app.get("/user", (req, res) => {
    res.send({firstname: "Sai Dinesh", lastname: "Kopparthi", age: 25})
});

app.post("/uset", (req, res) => {
    res.send("The user details has been updated successfully!");
});

app.use("/", (req, res) => {
    res.send("You have reached the home page. \nHOLA!!!");
})

app.listen(3000, ()=>console.log("Listening on port 3000"));