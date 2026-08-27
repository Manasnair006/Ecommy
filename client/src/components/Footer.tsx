import "../styles/tailwind.css"

export default function Footer(){
    return(
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <h4>ECOMMY</h4>
                    <p className="text-[0.9rem] leading-[1.6] text-[#9ca3af]" >Your ultimate destination for quality products, fast checkout, and customer satisfaction.</p>
                </div>
                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="products.html">Catalog</a></li>
                        <li><a href="offers.html">Deals & Coupons</a></li>
                        <li><a href="orders.html">Track Order</a></li>
                        <li><a href="about.html">About Us</a></li>
                        </ul>
                </div>
                <div className="footer-col">
                    <h4>Customer Care</h4>
                    <ul>
                        <li><a href="profile.html">My Account</a></li>
                        <li><a href="cart.html">Shopping Cart</a></li>
                        <li><a href="about.html">Contact Support</a></li>
                        <li><a href="about.html">Return Policy</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Newsletter</h4>
                    <p className="text-[0.85rem] text-[#9ca3af] mb-3">Subscribe for exclusive discounts & updates.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Enter your email" className="form-control text-[0.85rem]" />
                    <button className="btn btn-accent btn-sm">Join</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    &copy; 2026 ECOMMY Inc. All rights reserved. Built for exceptional shopping experiences.
                </div>
            </div>
        </footer>

    )
}