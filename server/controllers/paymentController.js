const Order = require("../models/Order")
const validateSignature = require("../utils/razorpayHelper")
const Cart = require("../models/Cart")

exports.verifyRazorpayPayment = async (req, res)=>{
    try{
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = req.body

        const order = await Order.findOne({
            _id: req.body.orderId,
            userId: req.user.id
        })
        if(!order){
            return res.status(404).json({
                status: "failed",
                message: "Order Not Found"
            })
        }

        const body = order.payment.razorpayOrderId + "|" + razorpay_payment_id
        const validated = validateSignature(body, razorpay_signature)

        if(!validated){
            return res.status(400).json({
                status: "failed",
                message: "Invalid Payment Signature"
            })
        }

        order.payment.razorpayPaymentId = razorpay_payment_id
        order.payment.razorpaySignature = razorpay_signature

        order.status = "confirmed"
        order.payment.status = "paid"

        await order.save()

        await Cart.findOneAndUpdate(
            { userId: req.user.id},
            {
                $set:{
                    items: []
                }
            }
        );

        return res.status(200).json({
            status: "ok",
            message: "Payment Verifies Successfully",
            orderId: order._id
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            status: "failed",
            message: "Payment Verification Failed"
        })
    }
}