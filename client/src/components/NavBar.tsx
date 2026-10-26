
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import sandwichIcon from "../assets/sandwichbar.png";
import "../styles/tailwind.css";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, loading: loadingUser } = useAuth();
  const { cartLength } = useCart();

  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/products?q=${encodeURIComponent(query)}`);
    setSearchQuery("");
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="nav-brand">
          <button
            type="button"
            className="sandwich-btn"
            aria-label={isMenuOpen ? "Close menu" : "Toggle menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <img
              src={sandwichIcon}
              alt=""
              className="h-5 w-5 object-contain"
            />
          </button>

          <Link
            to="/home"
            className="flex items-center gap-2"
            onClick={closeMenu}
          >
            <span>ECOMMY</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className={`nav-menu ${isMenuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMenu}
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMenu}
          >
            About Us
          </NavLink>
        </nav>

        {/* Search */}
        <form className="nav-search" onSubmit={handleSearch} role="search">
          <span className="nav-search-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>

          <input
            type="search"
            placeholder="Search electronics, fashion, home..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />

          {searchQuery && (
            <button
              type="button"
              className="nav-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="size-3.5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}

          <button type="submit" className="nav-search-submit" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </form>

        {/* Actions */}
        <div className="nav-actions">
          {loadingUser ? (
            <span className="nav-action-btn">Loading...</span>
          ) : user ? (
            <NavLink to="/profile" 
               className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }>
              Hello! {user.name}
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-action-btn">
              Login
            </NavLink>
          )}

          <NavLink to="/cart" className="nav-action-btn">
            Cart
            {cartLength > 0 && (
              <span className="cart-badge">{cartLength}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
