import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartItemsTable(){

    const [ removingItemAsin, setRemovingItemAsin ] = useState<string | null>(null)
    const { cart, setCart, cartLoading, removeItem, deleteCart, updateItemQuantity } = useCart()

    const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

    const handleQuantity = ({asin, quantity}:{asin: string, quantity: number}) =>{
        setCart((prev)=>(
            prev.map((item)=>{
                if(item.asin === asin){
                    return({
                        ...item,
                        quantity: quantity
                    })
                }
                return(item)
            })
        ))
        if(debounceTimers.current[asin]){
            clearTimeout(debounceTimers.current[asin])
        }

        const timer = setTimeout(async()=>{
            await updateItemQuantity({
                asin: asin,
                quantity: quantity
            })
        },500)
        debounceTimers.current[asin] = timer
    }

    const navigate = useNavigate()    
    return(
        <div className="cart-table-card">
            {
                cartLoading && <div>Loading Items...</div>
            }
          
            {cart
                ? cart.map((item)=>{
                    return(
                        <div key={item.asin} className="cart-item">
                            <img src={item.imgUrl} alt={item.title} className="w-20 h-20 object-contain border border-solid rounded-sm border-white"/>
                            <div>
                                <h3 className="text-[1rem] font-semibold"><a href="product-detail.html">{item.title}</a></h3>
                                <p className="text-[0.85rem] text-muted mt-1" >Brand: Ecommy</p>
                                <p className="text-[0.85rem] font-semibold text-ink mt-1">In Stock</p>
                            </div>
                            <div>
                                <div className="qty-picker">
                                    <button className="qty-minus"
                                        disabled={item.quantity === 1} 
                                        onClick={()=> handleQuantity({
                                            asin: item.asin,
                                            quantity: (item.quantity-1)})
                                        }>
                                        -
                                    </button>
                                    <input type="text" value={item.quantity} readOnly />
                                    <button className="qty-plus"
                                        onClick={()=>{
                                            handleQuantity({
                                                asin: item.asin,
                                                quantity: (item.quantity+1)
                                            })
                                        }}>+
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[1.2rem] font-extrabold text-ink" >${item.price}</div>
                                {removingItemAsin === item.asin
                                    ?<button className="bg-none border-none text-muted text-[0.85rem] mt-2 cursor-pointer" disabled>Removing Item...</button>
                                    :<button className="bg-none border-none text-red-500 text-[0.85rem] mt-2 cursor-pointer" 
                                        onClick={() => {
                                            setRemovingItemAsin(item.asin)
                                            removeItem({asin: item.asin})
                                        }}>
                                            Remove
                                    </button>
                                }                            
                            </div>
                        </div>
                    )
                })
                :<div> CART EMPTY </div>
            }

            <div className="flex justify-between mt-5 pt-4 border-t border-solid border-t-white">
                <button onClick={()=>{navigate("/products")}} className="btn btn-outline btn-sm">← Continue Shopping</button>
                <button className="btn btn-outline btn-sm text-red-600" onClick={()=>{deleteCart()}}>Clear Shopping Cart</button>
            </div>
        </div>
    )
}