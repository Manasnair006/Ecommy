const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")

router.get("/", cartController.getCart)

router.post("/", cartController.addToCart)

router.patch("/:asin", cartController.updateCartItem)

router.delete("/:asin", cartController.removeFromCart)

router.delete("/", cartController.deleteCart)


module.exports = router