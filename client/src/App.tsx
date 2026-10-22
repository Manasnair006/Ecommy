import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import Homepage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import Cartpage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";


export default function App(){
    return(
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<HeroPage />} /> 
                <Route path="/home" element={<Homepage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/products/:asin" element={<ProductDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<Cartpage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
        </BrowserRouter>
    ); 
}