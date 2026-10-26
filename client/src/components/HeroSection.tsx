import { useNavigate } from 'react-router-dom'
import '../styles/tailwind.input.css'

export default function HeroSection(){
    const navigate = useNavigate()
    return(
        <section className="hero-section mt-0!">
            <h1 className="hero-title">Welcome to Ecommy Store</h1>
            <p className="hero-subtitle">Discover premium electronics, trendsetting apparel, and everyday essentials at unbeatable prices with express delivery.</p>
            <div className='flex gap-4 justify-center'>
                <button onClick={()=> navigate("/products")} className="btn btn-accent btn-lg">Shop Catalog Now</button>
                <button onClick={()=> navigate("/products")} className="btn btn-outline btn-lg text-white border-white">View Today's Deals</button>
            </div>
      </section>
    )
}