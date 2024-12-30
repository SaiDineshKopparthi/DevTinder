const express = require("express");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/database");

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//Connecting to Database and Making the server listen for requests
connectDB()
  .then(() => {
    console.log("Connection to MongoDB successful");
    app.listen(3000, () => console.log("Listening on port 3000"));
  })
  .catch((error) => {
    console.log("Problem connecting to MongoDB");
  });