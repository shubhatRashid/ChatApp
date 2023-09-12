const express = require('express')
const {registerUser,authUser}= require("../controllers/userControllers")
const router = express.Router()

// ROUTE FOR SIGNUP PAGE 
router.post('/signUp',(req,res) => {registerUser(req,res)})

// ROUTE OFR LOGIN PAGE 
router.route('/login').post((req,res) => {authUser(req,res)})

module.exports = router