const express = require("express");

const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = [`ignored`, 'interested'];

    if(!allowedStatus.includes(status)){
      throw new Error(`Invalid status type - ${status}`);
    }

    if(!await User.findById(toUserId)){
      throw new Error('No User Exists!')
    }

    const connectionRequestExist = await ConnectionRequest.findOne({
      $or: [
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ]
    });

    if(connectionRequestExist){
      throw new Error("The connection between you two already exists");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.json({
      message: "Connection action is success!",
      data,
    });
  } catch (error) {
    res
      .status(400)
      .send("Error sending the connection request: " + error.message);
  }
});

module.exports = router;