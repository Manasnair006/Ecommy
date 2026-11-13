import "../styles/tailwind.css"
import { Product } from "../data/Product";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import { Link } from "react-router-dom";

interface TopCategorySectionProps{
    id?:number;
    name:string;
    products: Product[];
}

export default function TopCategorySection({id, name, products}:TopCategorySectionProps){
    if(!products){
        return(
            <div></div>
        )
    }
    return(
        <section className="mb-12">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold" >{name}</h2>
                <Link to={id ? `/products?cat=${id}` : "/products"} className="text-ink font-semibold hover:text-brand transition" >Explore {name} →</Link>
            </div>
            
            <ProductCarousel>
                {products.map((prod) => (
                    <div key={prod.asin} className="product-carousel-item">
                        <ProductCard {...prod} />
                    </div>
                ))}
            </ProductCarousel>
            
      </section>
    )
}