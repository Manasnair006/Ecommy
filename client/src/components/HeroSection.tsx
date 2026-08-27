import '../styles/tailwind.input.css'

export default function HeroSection(){
    return(
        <section className="hero-section">
            <h1 className="hero-title">Welcome to Ecommy Store</h1>
            <p className="hero-subtitle">Discover premium electronics, trendsetting apparel, and everyday essentials at unbeatable prices with express delivery.</p>
            <div className='flex gap-4 justify-center'>
                <a href="products.html" className="btn btn-accent btn-lg">Shop Catalog Now</a>
                <a href="offers.html" className="btn btn-outline btn-lg text-white border-white">View Today's Deals</a>
            </div>
      </section>
    )
}