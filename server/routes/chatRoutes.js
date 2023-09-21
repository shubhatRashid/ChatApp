const express = require('express')
const protect = require('../middleware/protectMiddleware')
const router = express.Router()
const {accessChat} = require("../controllers/chatControllers")

router.route("/")
    .post(protect,accessChat)
//     .get(protect,fetchChats)

// router.route("/group").post(protect,createGroupChat)
// router.route("/rename").put(protect,renameGroupChat)
// router.route("/groupremove").put(protect,removeFromGroup)
// router.route("/groupadd").put(protect,addToGroup)

module.exports = router