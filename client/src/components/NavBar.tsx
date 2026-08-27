import { useState } from 'react';
import sandwichIcon from '../assets/sandwichbar.png';
import searchIcon from '../assets/search.png';
import "../styles/tailwind.css"

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="nav-brand">
          <button className="sandwich-btn" aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((open) => !open)}>
            <img src={sandwichIcon} alt='' className='h-5 w-5 object-contain' />
          </button>
          <a href="/" className='flex items-center gap-2' >
            <span>ECOMMY</span>
          </a>
        </div>

        <nav className= {`nav-menu ${isMenuOpen? 'open' : ''}`}>
          <a href="/" className="nav-link active">Home</a>
          <a href="products.html" className="nav-link">Products</a>
          <a href="offers.html" className="nav-link">Offers</a>
          <a href="about.html" className="nav-link">About Us</a>
        </nav>

        <div className="nav-search">
          <input type="text" placeholder="Search electronics, fashion, home..."  />
          <button type="submit">
            <img src={searchIcon} alt='' className='h-5 w-5 object-contain' />
          </button>
        </div>

        <div className="nav-actions">
          <a href="login.html" className="nav-action-btn">👤 Login</a>
          <a href="cart.html" className="nav-action-btn">
            🛒 Cart
            <span className="cart-badge">3</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
