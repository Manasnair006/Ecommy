import { useNavigate } from "react-router-dom";

interface CategoryCardProps{
    id?: number;
    iconUrl? : string;
    name: string;
}

export default function CategoryCard({id, iconUrl, name}:CategoryCardProps){
    const navigate = useNavigate()
    return(
        <div onClick={()=>{if(id) navigate(`/products?cat=${id}`)}} className="category-card">
            <div className="category-card-icon">
                {iconUrl? <img src={iconUrl} /> : "🎧"}
            </div>
            <h3 className="text-[1rem] font-semibold" >{name}</h3>
        </div>
    )
}