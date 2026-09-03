const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const generateToken = require("../utils/jwtHelper")

exports.register = async (req, res) =>{
    try{
        const {name, email, password} = req.body
        console.log("got req", req.body)
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "bad request no name no email or no pass"
            })
        }
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

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "Registration Successful",
            user: {
                name: user.name,
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
            return res.status(401).json({
                success: false,
                message: "Email does not exist!"
            });
        }

        const match = await bcrypt.compare(
            password, user.password
        )
        if(!match){
            return res.status(401).json({
                success:false,
                message: "Invalid Credentials"
            });
        }
        const token = await generateToken(user._id)
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            user:{
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

exports.me = async (req, res) =>{
    try{
        const user = await User.findById(req.user.id)
            .select("-password")
        
        if(!user){
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}