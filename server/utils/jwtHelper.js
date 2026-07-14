const jwt = require("jsonwebtoken")

async function generateToken(userId){
    return jwt.sign(
        {
            id: userId
        },process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES_IN
        }
    )
}

module.exports = generateToken