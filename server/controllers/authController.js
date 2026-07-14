const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const generateToken = require("../utils/jwtHelper")

exports.register = async (req, res) =>{
    try{
        const {name, email, password} = req.body
        
        const exists = await User.findOne({email});
        if(exists){
             return res.status(400).json({
                success:false,
                message:"Bad Request. Email Already Exists!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token = await generateToken(user._id);
        res.status(201).json({
            token,
            user:{
                id: user._id,
                username: user.name,
                email: user.email
            }
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

exports.login = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(401).json({
                success: false,
                message: "Email does not exist!"
            })
        }

        const match = await bcrypt.compare(
            password, user.password
        )
        if(!match){
            res.status(401).json({
                success:false,
                message: "Invalid Credentials"
            })
        }
        const token = await generateToken(user._id)
        res.status(201).json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
}