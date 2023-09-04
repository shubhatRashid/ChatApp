const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    pic : {type:String,default:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}
},
{timestamps:true}
)

const User = mongoose.model("User",userModel)
module.exports = User