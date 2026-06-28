const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        product_name : String,
        img_link : String
    },
    {
        collection: "amazon_products_data"
    }
)

module.exports = mongoose.model("Product", productSchema)