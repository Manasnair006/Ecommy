const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        asin : String ,
        boughtInLastMonth : Number,
        category_id : Number,
        imgUrl : String,
        isBestSeller : Boolean,
        listPrice: Number,
        price : Number,
        productURL: String,
        reviews: Number,
        stars: Number,
        title: String
    },
    {
        collection: "amazon_products"
    }
)

module.exports = mongoose.model("Product", productSchema)