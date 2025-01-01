const express = require("express");

const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

const router = express.Router();

const SAFE_USER_DATA = [
  "_id",
  "firstName",
  "lastName",
  "gender",
  "age",
  "photoURL",
  "skills",
];

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", SAFE_USER_DATA); //If no parameters are sent after `fromUserId` then all the feeds will be sent.

    res.send(connectionRequests);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: user._id, status: "accepted" },
        { fromUserId: user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", SAFE_USER_DATA)
      .populate("toUserId", SAFE_USER_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId.equals(user._id)) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.send(data);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

router.get("/user/feed", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) < 50 ? parseInt(req.query.limit) : 50;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }],
    }).select("fromUserId toUserId");

    const usersToHide = new Set();

    connectionRequests.forEach((req) => {
      usersToHide.add(req.fromUserId.toString());
      usersToHide.add(req.toUserId.toString());
    });

    const users = await User.find({
      _id: { $nin: Array.from(usersToHide) },
    })
      .select(SAFE_USER_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});
module.exports = router;
