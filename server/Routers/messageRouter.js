const express = require("express");
const router = express.Router();
const Message = require('../Models/Message');
const User = require('../Models/UserModel'); // Make sure to import User model
const Chat = require('../Models/ChatModel'); // Make sure to import Chat model
const authMiddleware = require('../Authentication/Middleware');

router.get("/:chatId", authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    try {
        let message = await Message.create({
            sender: req.user._id,
            content: content,
            chat: chatId,
        });

        // Fetch the message with populated fields
        message = await Message.findById(message._id)
            .populate("sender", "name pic")
            .populate("chat")
            .exec();

        message = await User.populate(message, {
            path: "chat.users",
            select: "name email",
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


module.exports = router;
