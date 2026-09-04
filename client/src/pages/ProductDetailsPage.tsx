import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ProductDetails } from "../data/Product";
import api from "../config/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import roundToHalf from "../randomKids/starsRounder";

export default function ProductDetailsPage(){
    const { asin } = useParams()

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
        specifications: []
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(()=>{
        async function loadProduct(){
            try{
                setLoading(true)

                const response = await api.get(`/api/products/${asin}`)
                const product: ProductDetails = response.data.product
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
                    specifications: product.specifications
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
    
    if(loading){
        return(
            <div>
                Loading Product Data....
            </div>
        )
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

                            <hr className="border-none border-t-1 text-(--border-color) my-4 " />

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
                                    <button className="qty-minus">-</button>
                                        <input type="text" value="1" readOnly />
                                    <button className="qty-plus">+</button>
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block btn-lg mb-3" data-add-cart>
                                🛒 Add to Cart
                            </button>
                            
                            <a href="checkout.html" className="btn btn-accent btn-block btn-lg mb-5">
                                ⚡ Buy Now
                            </a>

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