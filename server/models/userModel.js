const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// SCHEMA AND MODEL FOR USERS
const userModel = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    pic : {type:String,default:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}
},
{timestamps:true}
)

// CUSTOM METHOD TO CHECK PASSWORD
userModel.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// ENCRIPTING THE PASSWORD BEFORE SAVING IN DATABASE USING BCRYPT
userModel.pre('save',async function(next) {
    if (!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model("User",userModel)
module.exports = User