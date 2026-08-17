const Cart = require("../models/Cart")
const Order = require("../models/Order")
const Product = require("../models/Product")
const razorpay = require("../config/razorpay")

exports.createOrder = async (req , res) =>{
    try{
        const cart = await Cart.findOne(
            { userId : req.user.id}
        ).lean()
        if(!cart || cart.items.length === 0){
            return res.status(404).json({
                message: "Cart Not Found"
            })
        }
        const asins = cart.items.map(item=> item.asin)
        const products = await Product.find(
            { asin: { $in: asins}}
        ).select("asin title imgUrl price").lean()

        const productMap = new Map(
            products.map(product=>[
                product.asin,
                product
            ])
        )

        let totalPrice = 0
        const items = cart.items.map(item=>{
            const product = productMap.get(item.asin)
            totalPrice+= product.price * item.quantity

            return {
                asin: product.asin,
                title: product.title,
                imgUrl: product.imgUrl,
                price: product.price,
                quantity: item.quantity
            }
        })

        const order = await Order.create({
            userId: req.user.id,
            items,
            totalAmount: totalPrice,
            status: 'pending',
            payment:{
                status: "pending"
            }
        });
        
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round( totalPrice * 100),
            currency: "INR",
            receipt: order._id.toString()
        })

        order.payment.razorpayOrderId = razorpayOrder.id

        await order.save()

        res.status(201).json({
            message: "Order Created Successfully",
            id: order._id,
            razorpayOrderId: razorpayOrder.id,
            currency: razorpayOrder.currency,
            amount: razorpayOrder.amount,
            key: process.env.RAZORPAY_KEY
        });

    }catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

exports.getOrder = async (req, res) => {
    try{
        const orders = await Order.find({
            userId: req.user.id
        }).sort(
            { createdAt: -1 }
        ).lean()

        if(!orders){
            return res.status(404).json({
                message: "Order Not Found"
            })
        }

        res.status(200).json({
            orders
        })
    }catch(error){
        console.error(error)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.getOrderById = async (req, res) => {
    try{
        const orderId = req.params.id

        const order= await Order.findOne({
            _id: orderId,
            userId: req.user.id
        }).lean()

        if(!order){
            return res.status(404).json({
                message: "Order Not Found"
            })
        }

        res.status(200).json({
            order
        })
    }catch(error){
        console.error(error)

        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}