import { useEffect, useState } from "react"
import useNotification from "../context/NotificationContext";
import CartItem from "../data/Cart";

interface OrderSummaryDetails{
    subTotal: number;
    shipping: number;
    tax: number;
    coupon: number;
    total: number;
}

export default function CheckoutSidebar({ cart, discount, onPlaceOrder, isProcessing}: { cart: CartItem[], discount: number, onPlaceOrder: () => void, isProcessing: boolean}){

    const [loading, setLoading] = useState(false)
    const [ orderSummary, setOrderSummary ] = useState<OrderSummaryDetails>({
        subTotal: 0,
        shipping: 0,
        tax: 0,
        coupon: 0,
        total: 0
    })

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
            coupon: Number((totalPrices * (discount/100)).toFixed(2)),
            total: Number((totalPrices + totalTaxes - (totalPrices * (discount/100))).toFixed(2))
        })
        
        setLoading(false)
    }

    useEffect(()=>{
        calculateSummary()
    },[cart,discount])

    return(
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">

            <h3 className="mb-5 text-lg font-bold">
                Order Overview
            </h3>

            { cart.map(item =>{
                return(
                    <div className="mb-4 flex gap-3"
                        key={item.asin}>
                        <img
                            src={item.imgUrl}
                            alt={item.title}
                            className="h-14 w-14 shrink-0 rounded border border-gray-200 object-contain"
                        />

                        <div className="text-sm">
                            <p className="font-semibold text-gray-900">
                                {item.title}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                                Qty: {item.quantity} × {item.price}
                            </p>
                        </div>
                    </div>
                )
            })}

            {/* Divider */}
            <div className="my-4 border-t border-gray-200" />

            {loading
                ? <div className="m-auto">Loading...</div>
                :<div className="space-y-3 text-sm">

                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">
                            Subtotal:
                        </span>

                        <span>
                            ${orderSummary.subTotal}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">
                            Shipping:
                        </span>

                        <span>
                            <span className="text-green-400 font-semibold mr-1">FREE</span> 
                            <span className="line-through">${orderSummary.shipping}</span>
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">
                            Taxes & Fees:
                        </span>

                        <span>
                            ${orderSummary.tax}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-green-600">
                        <span>
                            Discount:
                        </span>

                        <span>
                            -${orderSummary.coupon}
                        </span>
                    </div>

                </div>
            }

            {/* Total */}
            {loading
                ?<div className="m-auto">Loading...</div>
                :<div className="mt-5 border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                            Grand Total:
                        </span>

                        <span className="text-lg font-bold">
                            ${orderSummary.total}
                        </span>
                    </div>
                </div>
            }

            {/* Place Order */}
            <button
                className="mt-5 flex h-11 w-full items-center justify-center rounded-lg bg-orange-500 px-4 text-sm font-semibold text-gray-900 transition hover:bg-orange-600"
                onClick={onPlaceOrder}
                disabled={isProcessing}
            >
                {isProcessing
                    ? "Processing..."
                    : "Place Order & Pay Now →"}
            </button>
        </aside>
    )
}