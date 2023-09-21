const express = require('express')
const {registerUser,authUser,allUsers}= require("../controllers/userControllers")
const router = express.Router()
const protect = require('../middleware/protectMiddleware')

 // ROUTE FOR SIGNUP PAGE 
router.post('/signUp',registerUser) 

// ROUTE OFR LOGIN PAGE 
router.route('/login').post(authUser)

//ROUTE FOR GETTING USERS
router.route('/').get(protect,allUsers)
module.exports = router