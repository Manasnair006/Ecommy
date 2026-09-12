import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import useNotification from "../context/NotificationContext";

interface OrderSummaryDetails{
    subTotal: number;
    shipping: number;
    tax: number;
    coupon: number;
    total: number;
}

const coupons = [
    {   
        code:"ECOMMY10",
        value: 15
    },{
        code: "LOLA15",
        value: 10
    }]

export default function OrderSummaryCard(){
    const [ orderSummary, setOrderSummary ] = useState<OrderSummaryDetails>({
        subTotal: 0,
        shipping: 0,
        tax: 0,
        coupon: 0,
        total: 0
    })

    const { cart } = useCart()
    const { notify } = useNotification()

    const [ loading, setLoading ] = useState(true)
    const [couponCode,  setCouponCode ] = useState("")
    const [ coupon, setCoupon] = useState({name:"", value:0})
    const applyCoupon = ()=>{
        const found = coupons.find( coup => coup.code === couponCode)
        if(found){
            setCoupon({
                name: found.code,
                value: found.value
            })
            notify({
                type: "success",
                message: "Coupon Applied Successfully"
            })
        }else{
            notify({
                type: "error",
                message: "Inavlid Coupon Code"
            })
        }
    }


    const calculateSummary = () =>{
        setLoading(true)
        const {totalPrices, totalTaxes, totalShipping} = cart.reduce((acc, curr) => {
            acc.totalPrices += (curr.price * curr.quantity)
            acc.totalTaxes += ((curr.price * curr.quantity)* 0.05)
            acc.totalShipping +=  1

            return acc
        }, { totalPrices: 0, totalTaxes:0, totalShipping: 0})
        setOrderSummary({
            subTotal: Number(totalPrices.toFixed(2)),
            shipping: Number(totalShipping.toFixed(2)),
            tax: Number(totalTaxes.toFixed(2)),
            coupon: Number((totalPrices * (coupon.value/100)).toFixed(2)),
            total: Number((totalPrices + totalTaxes - (totalPrices * (coupon.value/100))).toFixed(2))
        })
        
        setLoading(false)
    }

    useEffect(()=>{
        calculateSummary()
    },[cart, coupon])


    return(
        <div className="order-summary">
            <h2 className="text-[1.2rem] font-bold mb-5">Order Summary</h2>
            
            <div className="summary-row">
                <span>Items Subtotal:</span>
                {loading
                    ? <span className="text-muted">Loading...</span>
                    : <span>${orderSummary.subTotal}</span>
                }
            </div>
            <div className="summary-row">
                <span>Estimated Shipping:</span>
                {loading
                    ? <span className="text-muted">Loading...</span>
                    : <span>
                        <span className="text-green-400 font-semibold mr-1">FREE</span> 
                        <span className="line-through">${orderSummary.shipping}</span>
                    </span>
                }
            </div>
            <div className="summary-row">
                <span>Estimated Tax:</span>
                {loading
                    ? <span className="text-muted">Loading...</span>
                    : <span>${orderSummary.tax}</span>
                }
            </div>
            <div className="summary-row text-green-400">
                <span>Coupon {coupon.value? `(${coupon.name})` : ""}:</span>
                <span>-${orderSummary.coupon}</span>
            </div>

            <div className="flex gap-2 my-5">
                <input type="text" placeholder="Promo Code" className="form-control text-[0.85rem]" value={couponCode} onChange={(e)=> setCouponCode(e.target.value.toUpperCase())} />
                {coupon.value
                    ?<button className="btn btn-primary btn-sm bg-red-600" onClick={()=> setCoupon({name:"", value:0})}>Remove Coupon</button>
                    :<button className="btn btn-primary btn-sm" onClick={applyCoupon}>Apply</button>
                }
            </div>
            <div className="summary-row total">
                <span>Total Amount:</span>
                {loading
                    ? <span className="text-muted">Loading...</span>
                    : <span>${orderSummary.total}</span>
                }
            </div>

            <a href="checkout.html" className="btn btn-accent btn-block btn-lg mt-5">
                Proceed to Checkout →
            </a>

            <div className="text-center text-[0.8rem] text-muted mt-4">
                🔒 256-Bit SSL Encrypted Checkout
            </div>
        </div>
    )
}