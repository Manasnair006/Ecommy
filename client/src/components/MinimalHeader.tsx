import { Link } from "react-router-dom";

export default function MinimalHeader(){
    return(
        <header className="bg-[#05639a] shadow-sm">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
                <Link
                    to="/home"
                    className="text-lg sm:text-2xl font-extrabold tracking-tight text-white select-none"
                >
                    ECOMMY <span className="text-orange-500">CHECKOUT</span>
                </Link>

                <div className="text-xs sm:text-sm text-white/90 font-medium">
                    🔒 <span className="hidden sm:inline">Secure 256-Bit SSL</span> Checkout
                </div>
            </div>
        </header>
    )
}