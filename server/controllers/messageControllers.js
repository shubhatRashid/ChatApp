const AsyncHandler = require("express-async-handler");
const Message = require("../models/messagesModel")
const Chat = require("../models/chatsModel")


// CONTROLLER FOR SENDING  A MESSAGE //
const createMessage = AsyncHandler(
    async (req,res) => {
        console.log(req.body)
        const {chatId,content,messageType,mediaName} = req.body

        if (!chatId || !content){
            res.status(400).send({message:"chatId or content not found"})
        }
        
        const newMessage = {
            sender : req.user._id,
            content: content,
            messageType:messageType,
            mediaName:mediaName,
            chat:chatId
        }

        try {
            var message = await Message.create(newMessage)
                message = await message.populate("sender","name pic")
                message = await message.populate("chat")
                message = await message.populate("chat.users", "name email pic")
                
            await Chat.findByIdAndUpdate(chatId,{
                latestMessage:message
            })

            res.status(200).json(message)
        } catch (error) {
            res.status(400).send({message:error.message})
        }

    }
)
const allMessages = AsyncHandler(
    async (req,res) => {
        try {
            const messages = await Message.find({chat:req.params.chatId})
                .populate("sender", "name pic email")
                .populate("chat")
            
                res.status(200).json(messages)
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    }
)
module.exports = {createMessage,allMessages}