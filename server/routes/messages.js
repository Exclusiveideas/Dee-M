const router = require("express").Router();
const Message = require("../models/Message.js");

// create message 
router.post("/", async (req, res) => {
    const { conversationId, senderId, text } = req.body
    if(!conversationId || !senderId || !text) return res.status(400).json("incomplete body info");

    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(err)
    }
});

// get messages
router.get("/:conversationId", async (req, res) => {
    const { conversationId} = req.params
    if(!conversationId) return res.status(400).json("incomplete parameters");

    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages);
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router