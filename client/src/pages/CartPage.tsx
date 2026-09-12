import MinimalFooter from "../components/MinimalFooter";
import NavBar from "../components/NavBar";
import CartItemsTable from "../components/CartItemsTable";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { useCart } from "../context/CartContext";

export default function Cartpage(){

    const { cartLength } = useCart()

    return(
        <>
            <NavBar />

            <main className="page-wrapper">
                <div className="container">
                
                    <h1 className="text-[1.8rem] font-extrabold mb-6" >Your Shopping Cart ({cartLength} Items)</h1>

                    <div className="bg-[#9acafa] border border-[#bce0fd] rounded-md p-3.5 px-5 mb-6 flex items-center justify-between">
                        <span className="font-semibold text-ink">🎉 You have qualified for FREE Express Shipping!</span>
                        <span className="text-[0.85rem] text-muted">Estimated Delivery: 2-3 Days</span>
                    </div>

                    <div className="cart-layout">
                        <CartItemsTable />
                        <OrderSummaryCard />
                    </div>

                </div>
            </main>

            <MinimalFooter />
        </>
    )
}