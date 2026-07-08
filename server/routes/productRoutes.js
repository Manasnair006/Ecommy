const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

router.get("/all", productController.getAllProducts)

router.get("/", productController.getProducts)

router.get("/:asin", productController.getProductWithAsin)


module.exports = router
