import React, { ChangeEvent } from "react"
import { CheckoutData } from "../pages/CheckoutPage"



export default function CheckoutPaymentSection({checkoutData, setCheckoutData}: {checkoutData: CheckoutData, setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>}){

    const selector = (e: ChangeEvent<HTMLInputElement>) =>{
        const selected: CheckoutData["paymentMode"] = e.target.name as CheckoutData["paymentMode"]

        if( checkoutData.paymentMode === selected){
            setCheckoutData((prev)=>({
                    ...prev,
                    paymentMode: ""
                })
            )
        }else{
            setCheckoutData((prev)=>({
                    ...prev,
                    paymentMode: selected
                })
            )
        }
    }

    return(
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold">
                2. Payment Method
            </h2>

            <div className="space-y-4">

                {/* Credit Card */}
                <div className="rounded-lg border border-gray-200 p-4">

                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="Card"
                            disabled
                            onChange={selector}
                            className="h-4 w-4 accent-blue-600"
                        />

                        <strong className="text-sm font-semibold">
                            Credit / Debit Card
                        </strong>

                        <span className="ml-auto text-xs text-gray-500">
                            Visa, Mastercard, Amex
                        </span>
                    </div>
                    <span className="ml-6.5 text-xs text-red-400"> This option is currently unavailable</span>

                    {/* Card Form */}
                    <div className="mt-5 border-t border-gray-200 pt-5" hidden>

                        {/* Cardholder */}
                        <div className="mb-4">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Cardholder Name
                            </label>

                            <input
                                type="text"
                                defaultValue="John Doe"
                                className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Card Number */}
                        <div className="mb-4">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Card Number
                            </label>

                            <input
                                type="text"
                                placeholder="4532 •••• •••• 8921"
                                className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Expiry + CVV */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Expiry (MM/YY)
                                </label>

                                <input
                                    type="text"
                                    placeholder="08/28"
                                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    CVV Security Code
                                </label>

                                <input
                                    type="password"
                                    placeholder="•••"
                                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Razorpay */}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 hover:bg-gray-50">
                    <input
                        type="radio"
                        name="Razorpay"
                        className="h-4 w-4 accent-blue-600"
                        checked= {checkoutData.paymentMode === "Razorpay"}
                        onChange={selector}
                    />

                    <span className="text-sm font-semibold">
                        Razorpay UPI / NetBanking / Wallet
                    </span>
                </label>

                {/* COD */}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 hover:bg-gray-50">
                    <input
                        type="radio"
                        name="COD"
                        className="h-4 w-4 accent-blue-600"
                        checked= {checkoutData.paymentMode === "COD"}
                        onChange={selector}
                    />

                    <span className="text-sm font-semibold">
                        Cash on Delivery (COD)
                    </span>
                </label>

            </div>
        </section>
        
    )
}