import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import CartItem from "../data/Cart";
import { useAuth } from "./AuthContext";
import axios from "axios";
import api from "../config/api";
import useNotification from "./NotificationContext";

interface CartContextValues{
    cart: CartItem[] | [];
    setCart: Dispatch<SetStateAction<CartItem[] | []>>;
    cartLength: number;
    cartLoading: boolean;
    addToCart: ({ asin, quantity }: { asin: string; quantity?: number;}) => Promise<void>;
    updateItemQuantity: ({ asin, quantity }: {asin: string; quantity: number;}) => Promise<void>;
    removeItem: ({ asin }: { asin: string;}) => Promise<void> ;
    deleteCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValues | null>(null)

export const CartProvider = ({children}:{children:ReactNode}) =>{

    const [cart, setCart] = useState<CartItem[] | []>([])
    const [cartLoading, setCartLoading] = useState(false)

    const { user } = useAuth()
    const { notify } = useNotification()

    const fetchCart = async() =>{
        try{
            setCartLoading(true)
            const response = await api.get("/api/cart/")
            setCart(response.data.items)
        }catch(err){
            if(axios.isAxiosError(err)){
                console.log("Axios Error: ", err)
            }else{
                console.log(err)
            }
        }finally{
            setCartLoading(false)
        }
    }

    const addToCart = async({asin, quantity = 1}:{asin: string, quantity?:number}) =>{
        try{
            setCartLoading(true)

            user && 
                await api.post(`/api/cart/`, {
                    asin: asin,
                    quantity: quantity   
                })

            notify({
                type: "success",
                message: "Product added to cart"
            })
            await fetchCart()

        }catch(err:any){
            console.log(err)
            notify({
                type: 'error',
                message: err.response?.data?.message || "Error adding to cart"
            })
        }
    }

    const updateItemQuantity = async({asin, quantity}:{asin: string, quantity: number}) =>{
        try{
            setCartLoading(true)
            user &&
                await api.patch(`/api/cart/${asin}`,{
                    quantity: quantity
                })
            notify({
                type:"success",
                message: "Updated Item Quantity"
            })
            await fetchCart()
        }catch(err: any){
            console.log(err)
            notify({
                type: 'error',
                message: err.response?.data?.message || "Error upating item quantity"
            })
        }
    }

    const removeItem =  async({asin}:{asin:string}) =>{
        try{
            setCartLoading(true)
            user &&
                await api.delete(`/api/cart/${asin}`)

            notify({
                type: "success",
                message: "Item removed"
            })
            await fetchCart()
        }catch(err: any){
            console.log(err)
            notify({
                type: 'error',
                message: err.response?.data?.message || "Error removing cart item"
            })
        }
    }

    const deleteCart = async() =>{
        try{
            setCartLoading(true)
            user &&
                await api.delete("/api/cart/")

            notify({
                type: "success",
                message: "Cart Deleted"
            })
            await fetchCart()
        }catch(err: any){
           console.log(err)
            notify({
                type: 'error',
                message: err.response?.data?.message || "Error clearing cart"
            }) 
        }
    }

    useEffect(()=>{
        if(user){
            fetchCart()
        }else{
            setCart([])
        }
    }, [user])

    return(
        <CartContext.Provider value={{cart, setCart, cartLoading, cartLength:cart.length, addToCart, updateItemQuantity, removeItem, deleteCart}} >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () =>{
    const context = useContext(CartContext)
    if(!context){
        throw new Error("useCart must be used within an CartProvider");
    }
    return context
}