const Products = require("../models/Product")
const Categories = require("../models/Category")

exports.getHomeData = async (req, res)=>{

    const bestSellers = await Products.find(
        { isBestSeller: true}
    ).select("title imgUrl price listPrice")
    .limit(7);
    
    const topCategories = await Products.aggregate([
        {
            $group:{
                _id: "$category_id",
                totalBought:{
                    $sum: "$boughtInLastMonth"
                }
            }
        },
        {
            $sort:{
                totalBought: -1
            }
        },
        {
            $limit: 5
        }
    ])

    const categoriesData = []

    const categoriesProducts = await Promise.all(
        topCategories.map( category =>
            Products.find(
                { category_id: category._id }
            ).sort({ boughtInLastMonth: -1 })
            .limit(7)
            .select("title imgUrl price listPrice")
        )
    )

    const categoriesName = await Promise.all(
        topCategories.map(category=>
            Categories.find(
                { id: category._id }
            ).select("category_name")
        )
    )

    for (let i=0; i<5; i++){
        categoriesData.push({
            categoryId: topCategories[i]._id,
            categoryName: categoriesName[i][0].category_name,
            products: categoriesProducts[i]
        });
    }

    res.json({
        bestSellers: bestSellers,
        categoriesData: categoriesData
    })
    
}