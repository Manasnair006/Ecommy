interface CategoryCardProps{
    iconUrl? : string;
    name: string;
}

export default function CategoryCard({iconUrl, name}:CategoryCardProps){
    return(
        <a href="products.html?cat=electronics" className="category-card">
            <div className="category-card-icon">
                {iconUrl? <img src={iconUrl} /> : "🎧"}
            </div>
            <h3 className="text-[1rem] font-semibold" >{name}</h3>
        </a>
    )
}