const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema(
    {
        asin: {
            type: String,
            required:true
        },
        quantity:{
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    },{
        _id:false
    }
);

const cartSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "User"
        },
        items: [cartItemSchema]

    },{
        timestamps:true,
        collection: "user_carts"
    }
);

module.exports = mongoose.model("Cart", cartSchema)