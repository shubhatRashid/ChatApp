const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../configs/generateToken")
const bcrypt = require("bcryptjs")

// REGISTER USER
const registerUser = asyncHandler(
    async (req,res) =>{

        // GET REQUIRED VALUES FROM FRONTEND
        const {name,email,password} = req.body
        
        // CHECKING IF USER ALREADY EXISTS
        const userExists = await User.findOne({"email":email})
        if (userExists){
            return res.status(404).json({message:"Email already registered,Login instead..."})
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
            res.status(404).json({ message: "Failed to register,Try again."})
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
                const match = await user.matchPassword(password)
                if (match) {
                    res.status(201).json({
                        _id : user._id,
                        name : user.name,
                        email : user.email,
                        pic:user.pic,
                        token:generateToken(user._id)
                    })
                }else{
                    res.status(404).json({message:"Invalid email or password"})
                }
                
            }else{
                res.status(404).json({message:"Invalid email or password"})
            }
    })

    // GET specific USERS //
    const allUsers = asyncHandler(
        async (req,res) => {
            const keyword = req.query.search  //get the search keyword

            //search by email or username
            ?{
                $or : [
                    {name:{$regex:req.query.search, $options:"i" }},
                    {email:{$regex:req.query.search, $options:"i" }}
                ]
            }:{};
            
            const users = await User.find(keyword).find({_id:{$ne:req.user._id}}) // get the users who satisfy the keyword except self //
            res.send(users)
        });
    module.exports = {registerUser,authUser,allUsers}