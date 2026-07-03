const Product = require("../models/Product")

exports.getAllProducts = async(req, res)=>{
    const products = await Product.find().select("title imgUrl price").limit(100)
    res.json(products);
}

exports.getProductWithAsin = async(req,res)=>{
    try{
        const { asin } = req.params

        const product = await Product.findOne({
            asin: asin
        }).select("title imgUrl price listPrice").lean()

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }
        return res.status(200).json({
            success: true,
            product
        })
        
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }
}