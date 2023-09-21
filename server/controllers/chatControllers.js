const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")
const Chat = require("../models/chatsModel")
const User = require("../models/userModel")

const accessChat = asyncHandler(
    async (req,res) => {

    // SENDERS ID //
    const {userId} = req.body;  

    if (!userId){
        res.status(400)
        throw new Error ("user Id not provided")
    }

    // SEARCH FOR ANY CHATS BETWEEN THE TWO //
    var isChat = await Chat.find({
        isGroupChat : false,
        $and: [
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    })  //replace ids with actual data
        .populate("users","-password")
        .populate("latestMessage")  

    isChat = await User.populate(isChat,{
        path: "latestMessage.sender" ,
        select: "name pic email"
    })

    // IF CHAT EXISTS THEN SEND ELSE CREATE //
    if (isChat.length > 0){
        res.send(isChat[0])    
    }else{
        var chatData = {
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id:createdChat._id})
            .populate("users","-password")
            res.status(200).send(fullChat)

        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

module.exports = {accessChat}