const express = require('express')
const {createMessage,allMessages}= require("../controllers/messageControllers")
const router = express.Router()
const protect = require('../middleware/protectMiddleware')

router.route("/").post(protect,createMessage)
router.route("/:chatId").get(protect,allMessages)

module.exports = router