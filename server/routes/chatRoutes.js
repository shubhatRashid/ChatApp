const express = require('express')
const protect = require('../middleware/protectMiddleware')
const router = express.Router()
const {accessChat,fetchChats,fetchGroups,createGroupChat,renameGroupChat,addToGroup,removeFromGroup,updateGroup} = require("../controllers/chatControllers")

router.route("/")
    .post(protect,accessChat)
    .get(protect,fetchChats)

router.route("/groups")
    .get(protect,fetchGroups)
    .post(protect,createGroupChat)

router.route("/renamegroup").put(protect,renameGroupChat)

router.route("/groupremove").put(protect,removeFromGroup)
router.route("/groupadd").put(protect,addToGroup)

module.exports = router