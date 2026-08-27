const User = require("../models/User")

module.exports = async (req, res, next) =>{
    try{
        const user = await User.findOne(
            { userId: req.user.id}
        ).select("isAdmin").lean()

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        if(!user.isAdmin){
            return res.status(401).json({
                message: " Admin authorizaation required "
            })
        }

        next();
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}