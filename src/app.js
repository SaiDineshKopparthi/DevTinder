const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth')

const app = express();

app.use("/admin", adminAuth);

app.get("/getUserData", (req, res) => {
    try{
        throw new Error("Gotcha!");
    } catch (err) {
        res.status(500).send("Some Error: Contact Support Team.")
    }
    
});

app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send(`Something went wrong - ${err}`);
    }
});

app.listen(3000, () => console.log("Listening on port 3000"));