import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroPage from "./pages/HeroPage";
import Footer from "./components/Footer";
import Homepage from "./pages/HomePage";
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
            <NavBar />
            <main className="page-wrapper" >
                <Routes>
                    <Route path="/" element={<HeroPage />} /> 
                    <Route path="/home" element={<Homepage />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    ); 
}