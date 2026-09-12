import { useEffect, useState } from "react";
import MinimalFooter from "../components/MinimalFooter";
import NavBar from "../components/NavBar";
import CartItem from "../data/Cart";
import api from "../config/api";
import axios from "axios";
import CartItemsTable from "../components/CartItemsTable";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { NotificationProps } from "../components/Notification";
import Notification from "../components/Notification";

export default function Cartpage(){

    const [ cart, setCart ] = useState<CartItem[]| []>([])
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState<NotificationProps | null>(null)

    const fetchCart = async() =>{
        try{
            setLoading(true)
            const response = await api.get("/api/cart/")
            setCart(response.data.items)
        }catch(err){
            if(axios.isAxiosError(err)){
                console.log("Axios Error: ", err)
            }else{
                console.log(err)
            }
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCart()
    },[])

    return(
        <>
            <NavBar />

            {notification &&
                <Notification {...notification}/>
            }

            <main className="page-wrapper">
                <div className="container">
                
                <h1 className="text-[1.8rem] font-extrabold mb-6" >Your Shopping Cart ({cart.length} Items)</h1>

                <div className="bg-[#9acafa] border border-[#bce0fd] rounded-md p-3.5 px-5 mb-6 flex items-center justify-between">
                    <span className="font-semibold text-ink">🎉 You have qualified for FREE Express Shipping!</span>
                    <span className="text-[0.85rem] text-muted">Estimated Delivery: 2-3 Days</span>
                </div>

                <div className="cart-layout">
                    {
                        loading
                            ? <div> Loding items... </div>
                            : <CartItemsTable cart={cart} fetchCart={fetchCart} setNotification={setNotification}/>
                    }
                    {
                        loading
                            ? <div> Loding summary.. </div>
                            : <OrderSummaryCard cart={cart} setNotification={setNotification}/>
                    }
                </div>

                </div>
            </main>

            <MinimalFooter />
        </>
    )
}