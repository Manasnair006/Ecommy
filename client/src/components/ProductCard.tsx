import { useNavigate } from "react-router-dom";
import { Product } from "../data/Product";
import "../styles/tailwind.css"

export default function ProductCard(product:Product){
    const naviagte = useNavigate()
    function handleClick(){
        naviagte(`/products/${product.asin}`)
    }
    return(
        <div className="product-card cursor-pointer" onClick={handleClick}>
            <img src={product.imgUrl} alt={product.title} className="product-card-img" />
            <div className="product-card-body">
                <h3 className="product-card-title"><a href="product-detail.html">{product.title}</a></h3>
                <div className="rating-stars">★★★★☆ <span className="rating-count">(10)</span></div>
                <div className="product-card-price">
                    <span className="price-current">${product.price}</span>
                    <span className="price-list">${product.listPrice}</span>
                </div>
                <div className="product-card-footer">
                    <button className="btn btn-primary btn-block btn-sm" data-add-cart>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}