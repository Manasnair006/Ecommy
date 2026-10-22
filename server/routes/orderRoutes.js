const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController")

router.post("/razorpay", orderController.createRazorpayOrder)

router.post("/cod", orderController.createCODOrder)

router.get("/", orderController.getOrder)

router.get("/:id", orderController.getOrderById)

module.exports = router