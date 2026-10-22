export default function MinimalHeader(){
    return(
        <header className="bg-[#05639a] shadow-sm">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a
                    href="/"
                    className="text-2xl font-extrabold tracking-tight text-white"
                >
                    ECOMMY <span className="text-orange-500">CHECKOUT</span>
                </a>

                <div className="text-sm text-white">
                    🔒 Secure 256-Bit SSL Checkout
                </div>
            </div>
        </header>
    )
}