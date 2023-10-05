const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")
const Chat = require("../models/chatsModel")
const User = require("../models/userModel")
const { use } = require("../routes/chatRoutes")

// ACCESS A PARTICULAR CHAT
const accessChat = asyncHandler(
    async (req,res) => {

    // SENDERS ID //
    const {userId,chatName} = req.body;  
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
            chatName:chatName,
            isGroupChat:false,
            users:[req.user._id,userId]
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id:createdChat._id})
            .populate("users","-password")
            .populate("latestMessage")
            res.status(200).send(fullChat)

        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

// FETCH ALL CHATS //
const fetchChats = asyncHandler(
    async (req,res) => {
        try {
            Chat.find({isGroupChat:false,users:{$elemMatch:{ $eq:req.user._id }}})
                .populate("users","-password")
                .populate("latestMessage")
                .populate("groupAdmin","-password")
                .sort({updatedAt:-1})
                .then(async(result) => {
                    result = await User.populate(result,{
                        path: "latestMessage.sender" ,
                        select: "name pic email"
                    })

                    res.status(200).send(result)
                })
              
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
)

// CREATE A GROUP //
const createGroupChat = asyncHandler(
   async (req,res) => {

        // CHECK IF ALL FIELDS ARE FILLED //
        if (!req.body.name || !req.body.users){
           res.status(400).send({message:'Please fill all the fields'})
        }
        const users = req.body.users

        // IF NUMBER OF USERS IF LESS THAN 3 //
        if (users.length < 2){
            res.status(400).send({message:"At least 3 users required to create a group"})
        }

        // APPEND SELF TO USERS OF GROUP //
        users.push(req.user)

        // TRY TO CREATE A GROUP
        try {
            groupChat = await Chat.create({
                chatName:req.body.name,
                isGroupChat:true,
                users: users,
                groupAdmin:req.user
            })

            const fullGroupChat  = await Chat.findOne({_id:groupChat._id})
                .populate("users","-password")
                .populate("groupAdmin","-password")
            res.status(200).send(fullGroupChat)
        } catch (error) {
            res.status(400).send({message:error.message})
        }
   }
)

// FETCH ALL GROUPS //
const fetchGroups = asyncHandler(
    async (req,res) => {
        try {
            Chat.find({isGroupChat:true,users:{$elemMatch:{ $eq:req.user._id }}})
                .populate("users","-password")
                .populate("latestMessage")
                .populate("groupAdmin","-password")
                .sort({updatedAt:-1})
                .then(async(result) => {
                    result = await User.populate(result,{
                        path: "latestMessage.sender" ,
                        select: "name pic email"
                    })

                    res.status(200).send(result)
                })
              
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
)

// RENAME A GROUP-CHAT //
const renameGroupChat = asyncHandler(
    async (req,res) => {
        const {chatId,chatName} = req.body
        const updatedChat = await Chat.findByIdAndUpdate(chatId,{chatName:chatName},{new:true})
            .populate("users","-password")
            .populate("groupAdmin","-password")
        
        if (!updatedChat){
            res.status(400).send({message:error.message})
        }else{
            res.json(updatedChat)
        }
    }

)

// ADD TO GROUP
const addToGroup = asyncHandler(
    
    async (req,res) =>{
        const {chatId,userId} = req.body
        try {
            const updatedChat =await Chat.findByIdAndUpdate(
                chatId,
                {$push:{users:userId}}, // push new userId inside users array in mongodb //
                {new:true}
                )
                        .populate("users","-password")
                        .populate("groupAdmin","-password")
            if (updatedChat){
                res.json(updatedChat)
            }else{
                res.status(400).send({message:"No chat found"})
            }
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    }
)

// REMOVE FROM GROUP
const removeFromGroup = asyncHandler(
    
    async (req,res) =>{
        const {chatId,userId} = req.body
        try {
            const updatedChat = await Chat.findByIdAndUpdate(
                chatId,
                {$pull:{users:userId}}, // pull userId inside users array in mongodb //
                {new:true}
                )
                        .populate("users","-password")
                        .populate("groupAdmin","-password")
            if (updatedChat){
                res.json(updatedChat)
            }else{
                res.status(400).send({message:"No chat found"})
            }
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    }
)
module.exports = {accessChat,fetchChats,fetchGroups,createGroupChat,renameGroupChat,addToGroup,removeFromGroup}