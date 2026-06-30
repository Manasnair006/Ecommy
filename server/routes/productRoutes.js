const express = require("express")
const router = express.Router()
const homeController = require("../controllers/homeController.js")

const Product = require("../models/Product")

router.get("/all", async (req, res)=>{
    console.log("Router called")
    const products = await Product.find().select("title imgUrl price").limit(100)
    console.log("Router finished")
    res.json(products)
})

router.get("/home", homeController.getHomeData)

module.exports = router
