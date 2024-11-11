const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth')

const app = express();

app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
    res.send("User login successful");
})

app.get("/user/data", userAuth, (req, res) => {
    res.send("User data has been sent successfully");
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All the users data is sent.")
})

app.get("/admin/updateData", (req, res) => {
    res.send("Data has been updated successfully.")
})

app.listen(3000, () => console.log("Listening on port 3000"));