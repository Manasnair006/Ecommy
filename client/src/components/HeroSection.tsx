import { useNavigate } from 'react-router-dom'
import '../styles/tailwind.css'

export default function HeroSection(){
    const navigate = useNavigate()
    return(
        <section className="hero-section mt-0! px-4">
            <h1 className="hero-title text-2xl sm:text-4xl">Welcome to Ecommy Store</h1>
            <p className="hero-subtitle text-base sm:text-xl">Discover premium electronics, trendsetting apparel, and everyday essentials at unbeatable prices with express delivery.</p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto'>
                <button onClick={()=> navigate("/products")} className="btn btn-accent btn-md sm:btn-lg w-full sm:w-auto">Shop Catalog Now</button>
                <button onClick={()=> navigate("/products")} className="btn btn-outline btn-md sm:btn-lg text-white border-white w-full sm:w-auto">View Today's Deals</button>
            </div>
      </section>
    )
}