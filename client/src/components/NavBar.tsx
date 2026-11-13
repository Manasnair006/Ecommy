
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User as UserIcon, Search, X, Menu, Package, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styles/tailwind.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const { user, logout } = useAuth();
  const { cartLength } = useCart();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  // Focus mobile search input when opened
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    navigate(`/products?q=${encodeURIComponent(query)}`);
    setSearchQuery("");
    setIsMobileSearchOpen(false);
    closeMenu();
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/home");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Left: Hamburger menu toggle + Brand Logo */}
        <div className="nav-brand">
          <button
            type="button"
            className="sandwich-btn"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="size-6 text-white" />
          </button>

          <Link
            to="/home"
            className="flex items-center gap-2 select-none"
            onClick={closeMenu}
          >
            <span>ECOMMY</span>
          </Link>
        </div>

        {/* Desktop Navigation Links (hidden on tablet/mobile) */}
        <nav className="nav-menu" aria-label="Main navigation">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            About Us
          </NavLink>
        </nav>

        {/* Desktop Search Bar (hidden on mobile/tablet) */}
        <form className="nav-search hidden lg:flex" onSubmit={handleSearch} role="search">
          <span className="nav-search-icon" aria-hidden="true">
            <Search className="size-4" />
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
              <X className="size-3.5" />
            </button>
          )}

          <button type="submit" className="nav-search-submit" aria-label="Search">
            <Search className="size-4" />
          </button>
        </form>

        {/* Action Group: Mobile Search Toggle + Profile/Login + Cart (ALWAYS visible) */}
        <div className="nav-actions">
          {/* Mobile search toggle button */}
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/15 lg:hidden"
            onClick={() => setIsMobileSearchOpen((open) => !open)}
            aria-label={isMobileSearchOpen ? "Close search" : "Open search"}
          >
            {isMobileSearchOpen ? (
              <X className="size-5" />
            ) : (
              <Search className="size-5" />
            )}
          </button>

          {/* Desktop User / Login button */}
          <div className="hidden lg:flex items-center">
            {user ? (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Hello! {user.name?.split(" ")[0] || "User"}
              </NavLink>
            ) : (
              <NavLink to="/login" className="nav-action-btn">
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile User / Login icon button */}
          <div className="flex lg:hidden items-center">
            {user ? (
              <NavLink
                to="/profile"
                className="flex size-9 items-center justify-center rounded-full bg-accent text-[#232f3e] text-xs font-extrabold shadow-sm"
                aria-label="My Profile"
              >
                {(user.name?.trim()?.charAt(0) || "U").toUpperCase()}
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="flex size-9 items-center justify-center rounded-lg text-white hover:bg-white/15"
                aria-label="Sign In"
              >
                <UserIcon className="size-5" />
              </NavLink>
            )}
          </div>

          {/* Cart Button: ALWAYS visible on all viewports */}
          <NavLink
            to="/cart"
            className="nav-action-btn flex items-center gap-1.5 p-2 rounded-lg text-white transition hover:bg-white/15"
            aria-label={`Shopping cart with ${cartLength} items`}
          >
            <div className="relative flex items-center justify-center">
              <ShoppingCart className="size-5" />
              {cartLength > 0 && (
                <span className="cart-badge">{cartLength}</span>
              )}
            </div>
            <span className="hidden sm:inline font-medium text-sm">Cart</span>
          </NavLink>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="border-t border-white/15 bg-[#024876] px-4 py-3 shadow-inner lg:hidden">
          <form className="relative flex items-center w-full" onSubmit={handleSearch}>
            <Search className="pointer-events-none absolute left-3 size-4 text-muted" />
            <input
              ref={mobileSearchInputRef}
              type="search"
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full bg-white pr-20 pl-9 text-sm text-ink outline-none focus:ring-2 focus:ring-accent"
              aria-label="Search on mobile"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-10 flex size-6 items-center justify-center rounded-full bg-slate-200 text-muted hover:text-ink"
                aria-label="Clear text"
              >
                <X className="size-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 flex size-7 items-center justify-center rounded-full bg-accent text-[#232f3e] hover:bg-accent-dark"
              aria-label="Submit search"
            >
              <Search className="size-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Drawer Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Out Drawer Menu */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 flex w-72 max-w-[85vw] flex-col bg-brand text-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
      >
        {/* Drawer Header with User info */}
        <div className="flex items-center justify-between border-b border-white/15 bg-[#024876] p-4">
          <div className="flex items-center gap-3 min-w-0">
            {user ? (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-base font-extrabold text-[#232f3e]">
                {(user.name?.trim()?.charAt(0) || "U").toUpperCase()}
              </div>
            ) : (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <UserIcon className="size-5" />
              </div>
            )}
            <div className="min-w-0">
              <div className="truncate text-base font-bold text-white">
                {user ? `Hello, ${user.name}` : "Welcome to Ecommy"}
              </div>
              <div className="truncate text-xs text-white/70">
                {user ? user.email : "Sign in for the best experience"}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <NavLink
            to="/home"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                isActive
                  ? "bg-white/20 font-semibold text-white"
                  : "text-white/90 hover:bg-white/10"
              }`
            }
          >
            <span>Home</span>
            <ChevronRight className="size-4 text-white/50" />
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                isActive
                  ? "bg-white/20 font-semibold text-white"
                  : "text-white/90 hover:bg-white/10"
              }`
            }
          >
            <span>All Products</span>
            <ChevronRight className="size-4 text-white/50" />
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                isActive
                  ? "bg-white/20 font-semibold text-white"
                  : "text-white/90 hover:bg-white/10"
              }`
            }
          >
            <span>About Us</span>
            <ChevronRight className="size-4 text-white/50" />
          </NavLink>

          <hr className="my-3 border-white/15" />

          {/* User Account Section in Drawer */}
          {user ? (
            <>
              <div className="px-4 py-1 text-xs font-semibold tracking-wider text-white/60 uppercase">
                My Account
              </div>

              <NavLink
                to="/profile"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <UserIcon className="size-5 text-accent" />
                  <span>Profile Settings</span>
                </div>
                <ChevronRight className="size-4 text-white/50" />
              </NavLink>

              <NavLink
                to="/orders"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Package className="size-5 text-accent" />
                  <span>My Orders</span>
                </div>
                <ChevronRight className="size-4 text-white/50" />
              </NavLink>

              <NavLink
                to="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="size-5 text-accent" />
                  <span>Shopping Cart</span>
                </div>
                {cartLength > 0 && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-[#232f3e]">
                    {cartLength}
                  </span>
                )}
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-red-200 transition hover:bg-white/10 hover:text-red-100"
              >
                <LogOut className="size-5 text-red-300" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <div className="space-y-2 px-2 pt-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-xl bg-accent py-2.5 text-base font-bold text-[#232f3e] shadow transition hover:bg-accent-dark"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-xl border border-white/30 py-2.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Create an Account
              </Link>

              <NavLink
                to="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10 mt-2"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="size-5 text-accent" />
                  <span>Shopping Cart</span>
                </div>
                {cartLength > 0 && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-[#232f3e]">
                    {cartLength}
                  </span>
                )}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
