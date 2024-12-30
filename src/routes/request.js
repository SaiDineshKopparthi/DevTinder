const express = require("express");

const { userAuth } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/request/send/interested/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    
  } catch (error) {
    res
      .status(400)
      .send("Error sending the connection request: " + error.message);
  }
});

module.exports = router;