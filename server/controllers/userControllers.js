const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../configs/generateToken")

// REGISTER USER
const registerUser = asyncHandler(
    async (req,res) =>{

        // GET REQUIRED VALUES FROM FRONTEND
        const {name,email,password} = req.body
        
        // CHECKING IF ALL FIELDS EXIST
        if (!name || !email || !password){
            res.status(400)
            throw new Error("Some fields are empty")
        }

        // CHECKING IF USER ALREADY EXISTS
        const userExists = await User.findOne({"email":email})
        if (userExists){
            throw new Error("Email already registered")
        }

        // REGISTERING NEW USER
        const user = await User.create({
            "name" : name,
            "email" : email,
            'password' : password
        })

        if (user){

            // SEND BACK USER INFO
            res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                pic:user.pic,
                token:generateToken(user._id)
            })
        }else{
            throw new Error("Failed to register,Try again.")
        }
    })
    
    // LOGIN USER
    const authUser = asyncHandler(
        async (req,res) => {

            // GET THE CREDENTIALS
            const {email,password} = req.body

            // CHECK IF USER EXISTS AND PASSWORD IS CORRECT
            const user = await User.findOne({"email":email})
            if (user){
                if (user.matchPassword(password)) {
                    res.status(201).json({
                        _id : user._id,
                        name : user.name,
                        email : user.email,
                        pic:user.pic,
                        token:generateToken(user._id)
                    })
                }
                
            }else{
                throw new Error("Invalid email or password")
            }


    })
    module.exports = {registerUser,authUser}