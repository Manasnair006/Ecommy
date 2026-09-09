const User = require("../models/User")

exports.updatePassword= async(req, res)=>{
    try{
        const userId = req.user.id
        const { currentPassword, newPassword } = req.body

        const user = await User.findById(
            userId
        )

        const match = await bcrypt.compare(
            user.password, currentPassword
        )
        if(!match){
            return res.status(401).json({
                message:"Wrong password"
            })
        }
        user.password = newPassword
        await user.save()

        res.status(200).json({
            message:"Password changed successfully!"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

exports.updateDetails = async(req, res)=>{
    try{
        const values= {}
        const { newName, newPhone, newEmail, newAddress} = req.body
        const userId  = req.user.id
        if(newName){
            values.name = newName
        }
        if(newPhone){
            values.phone = newPhone
        }
        if(newEmail){
            values.email = newEmail
        }
        if(newAddress){
            values.address = newAddress
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            {
                $set:values
            }
        ).select("-password").lean()
        if(!updated){
            return res.status(404).json({
                message: "Update Unsuccessful"
            })
        }
        res.status(200).json({
            user:{
                id: updated._id,
                name:updated.name,
                email:updated.email,
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

exports.getUserData = async(req, res)=>{
    try{
        const userId = req.user.id

        const user = await User.findById(
            userId
        ).select("-password").lean()

        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            })
        }

        res.status(200).json({
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}