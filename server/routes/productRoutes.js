const express = require("express")
const router = express.Router()

const Product = require("../models/Product")

router.get('/', async (req, res)=>{
    const products = await Product.find().select("product_name img_link")
    console.log("Router called")
    res.json(products)
})

module.exports = router
