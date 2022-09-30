const router = require("express").Router();
const User = require("../models/User.js");

// get user 
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    if(!userId && !username) return res.status(400).json("Incomplete query info");

    try {
        // query user either userId or username
        const user = userId
        ? await User.findById(userId) 
        : await User.findOne({ username});
        const { password, updatedAt, createdAt, ...other } = user?._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;