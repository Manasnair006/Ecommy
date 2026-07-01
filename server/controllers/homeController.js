const Products = require("../models/Product");
const Categories = require("../models/Category");
const redisGetOrSet = require("../utils/redisCache");

exports.getHomeData = async (req, res) => {
    try {

        const homeData = await redisGetOrSet("home", async () => {

            // Run independent queries together
            const [bestSellers, topCategories] = await Promise.all([

                Products.find({
                    isBestSeller: true
                })
                .select("title imgUrl price listPrice")
                .limit(7)
                .lean(),

                Products.aggregate([
                    {
                        $group: {
                            _id: "$category_id",
                            totalBought: {
                                $sum: "$boughtInLastMonth"
                            }
                        }
                    },
                    {
                        $sort: {
                            totalBought: -1
                        }
                    },
                    {
                        $limit: 5
                    }
                ])

            ]);

            // Fetch category names and products in parallel
            const categoryPromises = topCategories.map(async (category) => {

                const [categoryInfo, products] = await Promise.all([

                    Categories.findOne({
                        id: category._id
                    })
                    .select("category_name")
                    .lean(),

                    Products.find({
                        category_id: category._id
                    })
                    .sort({
                        boughtInLastMonth: -1
                    })
                    .limit(7)
                    .select("title imgUrl price listPrice")
                    .lean()

                ]);

                return {
                    categoryId: category._id,
                    categoryName: categoryInfo?.category_name ?? "Unknown",
                    products
                };

            });

            const categoriesData = await Promise.all(categoryPromises);

            return {
                bestSellers,
                categoriesData
            };

        });

        res.json(homeData);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};