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
        }).select(
            "asin title imgUrl price listPrice " +
            "stars reviews boughtInLastMonth isBestSeller " +
            "description highlights specifications category_id")
        .lean()

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        // Generic fallback 
        if (!product.description) {
            product.description =
                `${product.title} is designed for everyday use with a practical and convenient design.`;
        }

        if (!product.highlights || product.highlights.length === 0) {
            product.highlights = [
                "Designed for everyday use",
                "Practical and convenient design",
                "Easy to use",
                "Suitable for a variety of needs"
            ];
        }

        if (!product.specifications || product.specifications.length === 0) {
            product.specifications = [
                {
                    name: "Product Type",
                    value: "General Product"
                },
                {
                    name: "Use",
                    value: "Everyday Use"
                }
            ];
        }

        return res.status(200).json({
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

exports.productSearch = async(req, res)=>{
    try{
        const {q} = req.query

        if(!q || q.trim() == ""){
            return res.status(400).json({
                success:false,
                message:"Search query is required"
            })
        }

        const page = parseInt(req.query.page) || 1
        const limit = 20;
        const skip = Math.ceil(page -1)*limit;

        const [products, totalproducts] = await Promise.all([
            Product.find(
                {
                    $text:{
                        $search:q
                    }
                },
                {
                    score:{
                        $meta:"textScore"
                    }
                }
            ).select("title imgUrl price listPrice")
            .sort({
                score:{
                    $meta:"textScore"
                }
            }).skip(skip)
            .limit(limit)
            .lean()
            ,
            Product.countDocuments({
                $text:{
                    $search:q
                }
            })
        ])

        res.status(200).json({
            success:true,
            page,
            totalPages: Math.ceil(totalproducts/limit),
            totalproducts,
            products
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message: "Internal Server Error"
        });
    }
}

exports.getProducts= async(req, res)=>{
    try{
        const filter = {}
        const{ q, category, minPrice, maxPrice, stars, bestSeller, discount, sort, page=1} = req.query

        /*if(page<=0 || category<=0 || minPrice<0 || minPrice>maxPrice || stars<0 || stars>5){
            return res.status(400).json({
                success:false,
                message: "Bad Request"
            })
        }
        */

        if(category) filter.category_id = {
            $in: category.split(",").map(Number)
        }
        if(minPrice || maxPrice){
            filter.price = {}
            if(minPrice){
                filter.price.$gte = parseInt(minPrice)
            }
            if(maxPrice){
                filter.price.$lte = parseInt(maxPrice)
            }
        }
        if(stars) filter.stars = { $gte: parseInt(stars)}
        if(bestSeller) filter.isBestSeller = true
        if(discount){
            filter.$expr={
                $lt:["$price", "$listPrice"]
            }
        }
        if(q && q.trim() !== ""){
            filter.$text={
                $search: q.trim()
            }  
        }
        let sortOption= q
            ? {score:{$meta:"textScore" }}
            : {boughtInLastMonth:-1}

        const sortMap={
            priceAsc:{price:1},
            priceDesc: {price:-1},
            ratings: {stars:-1},
            reviews: {reviews:-1}
        }
        if(sortMap[sort]) sortOption = sortMap[sort]
        const limit = 20
        const skip = (page-1)*limit
        
        const [products, totalProducts] = await Promise.all([
            Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(20)
            .select("asin title imgUrl price listPrice stars")
            .lean(),
            
            Product.countDocuments(filter)
        ])
        console.log(filter)

        res.status(200).json({
            page,
            totalPages: Math.ceil(totalProducts/limit),
            totalProducts,
            products
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
    
}