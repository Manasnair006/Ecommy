const mongoose = require("mongoose")

const catSchema = mongoose.Schema(
    {
        category_name : String,
        id : Number
    
    },
    {
        collection: "amazon_categories"
    }
)

module.exports = new mongoose.model("Categories", catSchema)