const express = require("express");

const { userAuth } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/sendConnectionRequest", userAuth, async (req, res) => {
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

module.exports = router;