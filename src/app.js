const express = require('express');

const app = express();

app.use("/user", 
    (req, res, next) => {
    console.log("Handling the route user");
    //If we use this next() function the next route handler will be invoked.
    //This next() function is given by Express.js
    res.send("Handles here first");
    next(); 
    },
    (req, res) => {
        console.log("Handling the route user - two");
        res.send("Handled");
    } //In the first route handler there is no response being sent. 
    //So if we hit this API, it will run for infinitely, even though we have a second route handler with res.send();
)

app.listen(3000, () => console.log("Listening on port 3000"));