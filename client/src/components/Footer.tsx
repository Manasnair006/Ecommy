import { Link } from "react-router-dom";
import "../styles/tailwind.css";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-white/10 bg-ink text-gray-300">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">

                {/* Brand */}
                <div>
                    <Link
                        to="/"
                        className="mb-4 inline-block text-2xl font-extrabold tracking-wider text-white transition hover:text-blue-400"
                    >
                        ECOMMY<span className="text-blue-500">.</span>
                    </Link>

                    <p className="max-w-xs text-sm leading-7 text-gray-400">
                        Your ultimate destination for quality products, a
                        seamless shopping experience, and customer satisfaction.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                        Quick Links
                    </h4>

                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/products" className="transition hover:text-blue-400">
                                Catalog
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders" className="transition hover:text-blue-400">
                                Track Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="transition hover:text-blue-400">
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Customer Care */}
                <div>
                    <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                        Customer Care
                    </h4>

                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/profile" className="transition hover:text-blue-400">
                                My Account
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="transition hover:text-blue-400">
                                Shopping Cart
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="transition hover:text-blue-400">
                                Contact Support
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
                    <p>
                        © {new Date().getFullYear()} ECOMMY. All rights reserved.
                    </p>

                    <p>
                        Built for exceptional shopping experiences.
                    </p>
                </div>
            </div>
        </footer>
    );
}