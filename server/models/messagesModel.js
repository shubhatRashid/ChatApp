const mongoose= require("mongoose")

// SCHEMA AND MODEL FOR MESSAGES
const messageModel = mongoose.Schema({
    sender : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String,trim:true},
    messageType : {type:String,trim:true},
    mediaName:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"}
},{timestamps:true})

const Message = mongoose.model("Message",messageModel)
module.exports = Message