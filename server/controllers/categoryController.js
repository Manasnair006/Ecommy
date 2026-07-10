const Category = require("../models/Category")

exports.getAllCategories= async (req, res)=>{
    try{
        const categoryData = await Category.find()
        .select("id category_name")
        .sort({category_name:1})
        .lean();

        res.status(200).json({
            categoryData
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    } 
}