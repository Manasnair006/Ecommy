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
        }
    },{
        timestamps: true,
        collection: "orders"
    }
)

module.exports = mongoose.model("Order", orderSchema)