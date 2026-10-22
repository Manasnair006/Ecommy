const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema(
    {
        asin:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        imgUrl:{
            type: String
        },
        price:{
            type: Number,
            required: true
        },
        quantity:{
            type: Number,
            required:true,
            min: 1
        }
    },{
        _id: false
    }
)

const orderSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: {
            type: [orderItemSchema],
            required:true
        },
        totalAmount:{
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum:[
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled"
            ],
            default: "pending"
        },
        payment:{
            method:{
                type: String,
                enum:["COD", "Razorpay"],
                required: true
            },
            razorpayOrderId:{
                type: String
            },
            razorpayPaymentId:{
                type: String
            },
            razorpaySignature:{
                type: String
            },
            status:{
                type:String,
                enum:[
                    "pending",
                    "paid",
                    "failed"
                ],
                default: "pending"
            }
        },
        shippingAddress:{
            name:{
                type: String,
                required: true
            },
            address:{
                type: String,
                required: true
            },
            phone:{
                type: String,
                required: true
            }
        }
    },{
        timestamps: true,
        collection: "orders"
    }
)

module.exports = mongoose.model("Order", orderSchema)