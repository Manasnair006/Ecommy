const Cart = require("../models/Cart")
const Product = require("../models/Product")

exports.getCart = async (req, res) =>{
    try{
        const cart = await Cart.findOne(
           { userId: req.user.id }
        ).lean()

        if(!cart){
            return res.status(200).json({
                items: []
            })
        }

        const asins = cart.items.map(item=> item.asin)

        const products = await Product.find(
            { asin : {$in : asins}}
        ).select("asin  title imageUrl price listPrice stars").lean()

        const productMap = new Map(
            products.map(product=> [
                product.asin,
                product
            ])
        )

        const items = cart.items.map(
            item=> {
                const product = productMap.get(item.asin)
                if(!product){
                    return null
                }
                return {
                    ...product,
                    quantity: item.quantity
                }
            }
        ).filter(Boolean)

        return res.status(200).json({
            items
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

exports.addToCart = async (req, res) =>{
    try{
        const { asin, quantity=1 } = req.body 
        if(!asin){
            return res.status(400).json({
                message: "Bad Request! asin is required"
            })
        }

        const product = await Product.findOne(
            { asin: asin}
        ).select("asin").lean()
        if(!product){
            return res.status(404).json({
                message:"Product Not Found"
            })
        }

        let cart = await Cart.findOne(
            { userId: req.user.id}
        )
        if(!cart){
            cart = await Cart.create({
                userId: req.user.id,
                items:[{
                    asin,
                    quantity
                }]
            })
        }else{
            const existingItem = cart.items.find(
                item=> item.asin === product.asin
            )
            if(existingItem){
                existingItem.quantity+= quantity
            }else{
                cart.items.push({
                    asin,
                    quantity
                })
            }
            await cart.save()
        }

        return res.status(201).json({
            message: "Product Added to Cart",
            cart
        }) 
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

exports.updateCartItem = async (req, res) =>{
    try{
        const { asin } = req.params
        if(!asin){
            return res.status(400).json({
                message: "Bad Request! Asin required"
            })
        }

        const { quantity } = req.body
        if(!quantity || quantity<1){
            return res.status(400).json({
                message: "Bad Request! Quantity atleast one"
            })
        }

        const cart = await Cart.findOne(
            { userId: req.user.id}
        )
        if(!cart){
            return res.status(404).json({
                message: "Cart Not Found"
            })
        }

        const item = cart.items.find(item=> item.asin === asin)
        if(!item){
            return res.status(401).json({
                message: "Product Not In Cart"
            })
        }
        item.quantity = quantity
        await cart.save()

        return res.status(201).json({
            message: "Cart Updated",
            cart
        })
        
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

exports.removeFromCart = async (req, res) =>{
    try{
        const { asin } = req.params
        if(!asin){
            return res.status(400).json({
                message: "Asin required"
            })
        }

        const cart = await Cart.findOne(
            { userId: req.user.id}
        )
        if(!cart){
            return res.status(404).json({
                message: "Cart Not Found"
            })
        }

        cart.items = cart.items.filter(item=> item.asin != asin)
        await cart.save()

        return res.status(200).json({
            message: "Item removed",
            cart
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

exports.deleteCart = async (req, res) =>{
    try{
        const cart = await Cart.findOne(
            { userId: req.user.id}
        )
        if(!cart){
            return res.status(200).json({
                message: "Cart already empty"
            })
        }
        cart.items = []
        await cart.save()

        return res.status(200).json({
            message: "Cart Cleared"
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}