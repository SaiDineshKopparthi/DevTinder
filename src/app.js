const express = require('express');

const app = express();

app.use("/admin", (req, res, next) => {
    console.log("Admin authorization is being checked");

    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    
    if(!isAdminAuthorized){
        res.status(401).send("The admin doesn't have proper access");
    } else {
        next();
    }
});

app.get("/user", (req, res) => {
    res.send("User data has been sent successfully");
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All the users data is sent.")
})

app.get("/admin/updateData", (req, res) => {
    res.send("Data has been updated successfully.")
})

app.listen(3000, () => console.log("Listening on port 3000"));