import "../styles/tailwind.css"
import { Product } from "../data/Product";
import ProductCard from "./ProductCard";

interface CategorySectionProps {
    name: string;
    products: [Product] | []
}

export default function TopCategorySection({name, products}:CategorySectionProps){
    let categoryName = name
    if (name === 'besSellers'){
        categoryName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase
    }
    if(!products){
        return(
            <div></div>
        )
    }
    return(
        <section className="mb-12">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold" >{categoryName}</h2>
                <a href="products.html" className="text-ink font-semibold" >Explore {categoryName} →</a>
            </div>
            
            <div className="product-grid">
                {products.map((prod) =>{
                    return(
                        <ProductCard key={prod.asin} {...prod}/>
                    )
                })}
            </div>
      </section>
    )
}