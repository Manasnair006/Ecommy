const crypto = require("crypto")

function validateSignature(body, signature){
    if(!body || !signature){
        throw Error("Invalid Parameters")
    }
    body = body.toString()

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(body).digest('hex')
    return expectedSignature == signature
}

module.exports = validateSignature;