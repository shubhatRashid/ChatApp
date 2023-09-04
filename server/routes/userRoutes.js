const express = require('express')
const {registerUser,authUser}= require("../controllers/userControllers")
const router = express.Router()

router.post('/signUp',(req,res) => {registerUser(req,res)})
router.route('/login').get((req,res) => {authUser()})

module.exports = router