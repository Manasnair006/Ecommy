import "../styles/tailwind.css"
import { Product } from "../data/Product";
import ProductCard from "./ProductCard";

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
                <a href={`products.html/${id}`} className="text-ink font-semibold" >Explore {name} →</a>
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