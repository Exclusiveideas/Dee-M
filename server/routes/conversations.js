const router = require("express").Router();
const Conversation = require("../models/Conversation.js");
// const dotenv = require("dotenv");


//new conversation
router.post("/", async (req, res) => {
    const { senderID, receiverID } = req.body
    if(!senderID || !receiverID) return res.status(400).json("incomplete body info");

    const newConversation = new Conversation({
        members: [senderID, receiverID]
    })

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
    
});


// get user's conversations
router.get("/:userId", async (req, res) => {
    const { userId } = req.params
    if(!userId) return res.status(400).json("userId needed");

    try {
        const conversations = await Conversation.find({
            members: { $in: [userId] },
        });
        res.status(200).json(conversations);
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router