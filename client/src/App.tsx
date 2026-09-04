import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import Homepage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
/*<Route path="/products" element={} />
                    <Route path="/product/:id" element={} />
                    <Route path="/login" element={} />
                    <Route path="/register" element={} />
                    <Route path="/orders" element={} />
                    <Route path="/cart" element={} />
                    */

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
            </Routes>
        </BrowserRouter>
    ); 
}