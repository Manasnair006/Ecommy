import { useEffect, useState } from "react";
import { Product } from "../data/Product";
import fetchHome from "../randomKids/homeFetcher";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import CategoriesSection from "../components/CategoriesSection";
import TopCategorySection from "../components/TopCategorySection";
import "../styles/tailwind.css"

export interface CategoryData {
    categoryId: number;
    categoryName: string;
    products: [Product]
}

export interface HomeData {
    bestSeller: [Product] | [];
    categoriesData: [CategoryData] | []
}

export default function Homepage(){
    const [home, setHome] = useState<HomeData>({bestSeller:[], categoriesData:[]})
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        async function loadHome(){
            const newData: HomeData = await fetchHome()
            if(newData){
                setHome(newData)
            }
            setLoading(false)
        }
        loadHome();  
    }, [])    

    if(loading){
        return(
            <div>
                Loading.....
            </div>
        )
    }

    return(
        <div className="container">
            <HeroSection />
            <section className="features-banner">
                <FeatureCard h="Free Shipping" p="On orders over $50" iconUrl="/free-delivery_icon.png"/>
                <FeatureCard h="Secure Checkout" p="On orders over $50" iconUrl="/secure_checkout_icon.png"/>
                <FeatureCard h="Easy Returns" p="On orders over $50" iconUrl="/easy_returns_icon.png"/>
                <FeatureCard h="24/7 Support" p="On orders over $50" iconUrl="/24_hours_support_icon.png"/>
            </section>
            <CategoriesSection />
            <TopCategorySection name="bestSellers" products={home.bestSeller}/>
            
            {home.categoriesData.map((cat)=>{
                return(
                    <TopCategorySection key={cat.categoryId} name={cat.categoryName} products={cat.products}/>
                )
            })}
        </div>
    )
}