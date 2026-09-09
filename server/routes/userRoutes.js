const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const userController = require("../controllers/userController")

router.get("/", authMiddleware, userController.getUserData)
router.patch("/updatePassword", authMiddleware, userController.updatePassword)
router.patch("/updateDetails", authMiddleware, userController.updateDetails)

module.exports = router