import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ProductDetails } from "../data/Product";
import api from "../config/api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import roundToHalf from "../randomKids/starsRounder";
import { useCart } from "../context/CartContext";
import useNotification from "../context/NotificationContext";

export default function ProductDetailsPage(){
    const { asin } = useParams()

    const { addToCart } = useCart()
    const { notify } = useNotification()
    const navigate = useNavigate()

    const [productData, setProductData] = useState<ProductDetails>({
        _id: "",
        asin: "",
        title: "",
        imgUrl: "",
        price: 0,
        listPrice: 0,
        boughtInLastMonth: 0,
        category_id: 0,
        isBestSeller: false,
        reviews: 0,
        stars: 0,
        description:"",
        highlights: [],
        specifications: [],
        quantity:0,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(()=>{
        async function loadProduct(){
            try{
                setLoading(true)

                const response = await api.get(`/api/products/${asin}`)
                const product = response.data.product
                console.log(response.data)

                setProductData({
                    _id: product._id,
                    asin: product.asin,
                    title: product.title,
                    imgUrl: product.imgUrl,
                    price: product.price,
                    listPrice: product.listPrice,
                    boughtInLastMonth: product.boughtInLastMonth,
                    category_id: product.category_id,
                    isBestSeller: product.isBestSeller,
                    reviews: product.reviews,
                    stars: product.stars,
                    description: product.description,
                    highlights: product.highlights,
                    specifications: product.specifications,
                    quantity: 1
                })
            }catch(err){
                if(axios.isAxiosError(err)){
                    console.log(err)
                    setError("Product fetch failed")
                }else{
                    console.error(err)
                    setError("Unexpected Error Try Again")
                }
            }finally{
                setLoading(false)
            }
        }
        loadProduct();
    },[])
    
    const handleProductQuantity = (quantity: number) =>{
        setProductData((prev)=> ({
            ...prev,
            quantity: quantity
        }))
    }

    if(error){
        notify({
            type: "error",
            message: error
        })
    }

    if(loading){
        return(
            <div>
                Loading Product Data....
            </div>
        )
    }

    function handleBuyNow(){
        navigate(`/checkout?buyNowItemAsin=${productData.asin}&qty=${productData.quantity}`)
    }
    return(
        <>

            <NavBar />

            <main className="page-wrapper mb-2">
                <div className="container">
                    
                    <nav className="text-[0.85rem] text-muted mb-5" >
                        <a href="index.html">Home</a> / <a href="products.html">Electronics</a> / <span className="text-ink">{productData.title}</span>
                    </nav>

                    <div className="product-detail-grid">
                    
                        <div className="gallery-container">
                            <img src={productData.imgUrl} alt="Main Product Preview" className="gallery-main" />
                            <div className="gallery-thumbs">
                                <img src={productData.imgUrl} alt="Thumb 1" className="gallery-thumb active" />
                                <img src={productData.imgUrl} alt="Thumb 2" className="gallery-thumb" />
                                <img src={productData.imgUrl} alt="Thumb 3" className="gallery-thumb" />
                                <img src={productData.imgUrl} alt="Thumb 4" className="gallery-thumb" />
                            </div>
                        </div>

                        <div className="detail-info">
                            {productData.isBestSeller
                                ? <span className="badge badge-bestseller mb-2">Best Seller</span>
                                : ""}
                            <h1 className="detail-title">{productData.title}</h1>
                            <div className="text-[0.9rem] text-muted mb-3">
                                <strong className="text-ink">Ecommy</strong>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="rating-stars"><img className="w-30" src={`/stars/${roundToHalf(productData.stars)}.png`} /></div>
                                <a href="#reviews" className="text-[0.9rem] text-ink font-semibold" >{productData.reviews} Customer Ratings</a>
                            </div>

                            <hr className="border-none border-t text-(--border-color) my-4 " />

                            <h3 className="text-[1.1rem] font-bold mb-3" >Description</h3>
                            <p>{productData.description}</p>


                            <h3 className="text-[1.1rem] font-bold mb-3" >Key Features</h3>
                            <ul className="pl-5 leading-[1.7] text-[0.95rem] text-ink mb-6">
                                {productData.highlights.map((high)=>{
                                    return(
                                        <li key={`highlight-${productData.highlights.indexOf(high)}`}>{high}</li>
                                    )
                                })}
                            </ul>

                            <h3 className="text-[1.1rem] font-bold mb-3">Specifications</h3>
                            <table className="detail-specs-table">
                                <tbody>
                                    {productData.specifications.map((spec)=>{
                                        return(
                                            <tr key={spec.name}>
                                                <td>{spec.name}</td>
                                                <td>{spec.value}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="buy-box">
                            <div className="buy-box-price">${productData.price.toFixed(2)}</div>
                            <div className="text-[0.9rem] text-muted line-through mb-2">
                                List Price: ${productData.listPrice}
                            </div>

                            <span className="stock-tag">✓ In Stock - Ships Today</span>

                            <div className="mb-4">
                                <label className="text-[0.85rem] font-semibold block mb-1.5">Quantity:</label>
                                <div className="qty-picker">
                                    <button className="qty-minus"
                                        disabled={productData.quantity === 1}
                                        onClick={()=>{
                                            handleProductQuantity(productData.quantity-1)
                                        }}>-
                                    </button>
                                    <input type="text" value={productData.quantity} readOnly />
                                    <button className="qty-plus"
                                        onClick={()=>{
                                            handleProductQuantity(productData.quantity+1)
                                        }}>+
                                    </button>
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block btn-lg mb-3" data-add-cart onClick={()=>{addToCart({asin: productData.asin, quantity: productData.quantity})}}>
                                🛒 Add to Cart
                            </button>
                            
                            <button className="btn btn-accent btn-block btn-lg mb-5"
                                    onClick={handleBuyNow}>
                                ⚡ Buy Now
                            </button>

                            <div className="text-[0.85rem] text-muted leading-[1.6] border-t pt-4" >
                                <p> Ships from: <strong>ECOMMY Warehouse</strong></p>
                                <p> Sold by: <strong>Ecommy Authorized Store</strong></p>
                                <p> Return Policy: <strong>30-Day Easy Return</strong></p>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
            <Footer />

        </>
    )
}