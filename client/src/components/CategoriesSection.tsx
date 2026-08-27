import "../styles/tailwind.input.css"
import CategoryCard from "./CategoryCard"

export default function CategoriesSection(){
    return(
        <section className="mb-12">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold" >Browse By Categories</h2>
                <a href="products.html" className="text-ink font-semibold">View All →</a>
            </div>
            <div className="category-grid">
                <CategoryCard name="Top Deals" iconUrl="/fire_icon.png" />
                <CategoryCard name="Electronics" />
                <CategoryCard name="Fashion" />
                <CategoryCard name="Home & Kitchen" />
                <CategoryCard name="Books & Media" />
                <CategoryCard name="Beaauty & Care" />
            </div>
        </section>
    )
}