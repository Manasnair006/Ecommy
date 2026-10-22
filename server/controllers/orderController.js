const Cart = require("../models/Cart")
const Order = require("../models/Order")
const Product = require("../models/Product")
const razorpay = require("../config/razorpay")
const User = require("../models/User")

exports.createRazorpayOrder = async (req , res) =>{
    try{
        let cart = {}

        if (req.body && req.body.buyNowItem){
            cart.items = [req.body.buyNowItem]
        }else{
            cart = await Cart.findOne(
                    { userId : req.user.id}
                ).lean()
        }

        if(!cart || cart.items.length === 0){
            return res.status(404).json({
                message: "Cart Not Found"
            })
        }

        const user = await User.findById(req.user.id)
            .select("name address phone")
            .lean();

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
            totalPrice+= (product.price * item.quantity) + (product.price * item.quantity * 0.05)

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
                method: "Razorpay",
                status: "pending"
            },
            shippingAddress:{
                name: user.name,
                address: user.address,
                phone: user.phone
            }
        });
        
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(totalPrice * 100),
            currency: "INR",
            receipt: order._id.toString()
        })

        order.payment.razorpayOrderId = razorpayOrder.id

        await order.save()
        
        console.log("order ccreated")
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

exports.createCODOrder = async (req, res) => {
    try {
        let cart = {};

        // 1. Handle Buy Now or regular cart
        if (req.body && req.body.buyNowItem) {
            cart.items = [req.body.buyNowItem];
        } else {
            cart = await Cart.findOne({
                userId: req.user.id
            }).lean();
        }

        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(404).json({
                message: "Cart Not Found"
            });
        }

        // 2. Fetch user's delivery details
        const user = await User.findById(req.user.id)
            .select("name address phone")
            .lean();

        if (!user || !user.address || !user.phone) {
            return res.status(400).json({
                message: "Please add a valid delivery address and phone number"
            });
        }

        // 3. Fetch current product details from database
        const asins = cart.items.map(item => item.asin);

        const products = await Product.find({
            asin: { $in: asins }
        }).select("asin title imgUrl price").lean();

        const productMap = new Map(
            products.map(product => [
                product.asin,
                product
            ])
        );

        // 4. Calculate total and prepare order items
        let totalPrice = 0;

        const items = cart.items.map(item => {
            const product = productMap.get(item.asin);

            if (
                !product ||
                !Number.isFinite(product.price) ||
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
            ) {
                throw new Error(`Invalid cart item: ${item.asin}`);
            }

            totalPrice +=
                (product.price * item.quantity) +
                (product.price * item.quantity * 0.05);

            return {
                asin: product.asin,
                title: product.title,
                imgUrl: product.imgUrl,
                price: product.price,
                quantity: item.quantity
            };
        });

        totalPrice = Math.round(totalPrice * 100) / 100;

        const order = await Order.create({
            userId: req.user.id,
            items,
            totalAmount: totalPrice,
            status: "confirmed",
            payment: {
                method: "COD",
                status: "pending"
            },
            shippingAddress: {
                name: user.name,
                address: user.address,
                phone: user.phone
            }
        });

        if (!(req.body && req.body.buyNowItem)) {
            await Cart.findOneAndUpdate(
                { userId: req.user.id },
                {
                    $set: {
                        items: []
                    }
                }
            );
        }

        console.log("COD order created");

        return res.status(201).json({
            message: "COD Order Created Successfully",
            id: order._id,
            order
        });

    } catch (error) {
        console.error("COD order creation error:", error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

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