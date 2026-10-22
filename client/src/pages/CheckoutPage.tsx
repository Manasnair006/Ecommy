import MinimalHeader from "../components/MinimalHeader";
import MinimalFooter from "../components/MinimalFooter";
import CheckoutAddressSection from "../components/CheckoutAddressSection";
import CheckoutPaymentSection from "../components/CheckoutPaymentSection";
import CheckoutSidebar from "../components/CheckoutSidebar";
import { useEffect, useState } from "react";
import CartItem from "../data/Cart";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../config/api";
import { useCart } from "../context/CartContext";
import useNotification from "../context/NotificationContext";
import loadRazorpay from "../randomKids/laodrazorpay";

export interface CheckoutData{
    name: string;
    address: string;
    phone: string;
    paymentMode: "Card" | "Razorpay" | "COD" | "";
    cart: CartItem[]
}

export default function CheckoutPage() {

    const [checkoutData, setChechkoutData] = useState<CheckoutData>({
        name: "",
        address: "",
        phone: "",
        paymentMode: "",
        cart: []
    })

    const { cart, discount } = useCart()
    const {notify} = useNotification()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const buyNowAsin = searchParams.get("buyNowItemAsin")
    const quantity = Number(searchParams.get("qty")) || 1
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(()=>{
        const loadProductData = async() =>{
            try{
                if(!buyNowAsin){
                    return
                }else{
                    const response = await api.get(`/api/products/${buyNowAsin}`)
                    const product = response.data.product
                    const buyNowProduct: CartItem ={
                        asin: buyNowAsin,
                        imgUrl: product.imgUrl,
                        listPrice: product.listPrice,
                        price: product.price,
                        quantity: quantity,
                        stars: product.stars,
                        title: product.title,
                        _id: product._id
                    }
                    setChechkoutData((prev) =>({
                        ...prev,
                        cart: [buyNowProduct]
                    }))
                }
            }catch(err){
                console.log(err)
                notify({
                    type: "error",
                    message: "Error fetching product"
                })
            }  
        }
        loadProductData()
    },[buyNowAsin, quantity]);

    useEffect(()=>{
        const loadCartData = async()=>{
            try{
                if(buyNowAsin) return
                else{
                    setChechkoutData((prev)=>({
                       ...prev,
                       cart: cart 
                    }))
                }
            }catch(err){
                console.log(err)
                notify({
                    type: "error",
                    message: "Error fetching cart"
                })
            }
        }

        loadCartData()
    },[buyNowAsin, cart])

    useEffect(()=>{
        async function loadUserDetails(){
            try{
                const respo = await api.get("api/user/")
                const user = respo.data.user

                setChechkoutData((prev)=>({
                    ...prev,
                    name: user.name,
                    address: user.address,
                    phone: user.phone
                }))
                console.log(checkoutData)
            }catch(err){
                console.log(err)
                notify({
                    type: "error",
                    message: "Error fetching user address"
                })
            }
        }
        loadUserDetails();
    },[])

    const [step, setStep] = useState(0)
    
    useEffect(()=>{
        function stepLoader(){
            if(checkoutData.address && checkoutData.phone){
                if(checkoutData.paymentMode){
                    setStep(2)
                }else{
                    setStep(1)
                }
            }else{
                setStep(0)
            }
        }
        stepLoader()
    },[checkoutData])

    const handlePlaceOrder = async () => {
        if (isProcessing) return;

        if (!checkoutData.address || !checkoutData.phone) {
            notify({
                type: "error",
                message: "Please set a valid delivery address and phone number",
            });
            return;
        }

        if (!checkoutData.paymentMode) {
            notify({
                type: "error",
                message: "Please select a payment method",
            });
            return;
        }

        if (checkoutData.cart.length === 0) {
            notify({
                type: "error",
                message: "Your cart is empty",
            });
            return;
        }

        if (checkoutData.paymentMode === "Card") {
            notify({
                type: "error",
                message: "Card payments are currently unavailable",
            });
            return;
        }

        // COD needs its own server-side order flow.
        if (checkoutData.paymentMode === "COD") {
            setIsProcessing(true);

            try {
                let buyNowItem = {};

                if (buyNowAsin) {
                    buyNowItem = {
                        asin: buyNowAsin,
                        quantity: quantity
                    };
                }

                // A. Create a COD order on your server.
                const orderResponse = await api.post("/api/orders/cod", {
                    buyNowItem
                });

                const { id: mongoOrderId } = orderResponse.data;

                if (!mongoOrderId) {
                    throw new Error("Invalid order details received from server.");
                }

                // B. Notify the user that the order was placed successfully.
                notify({
                    type: "success",
                    message: "Order placed successfully! Your order is confirmed."
                });

                // C. Navigate to the order details page.
                navigate(`/orders/${mongoOrderId}`);

            } catch (error) {
                console.error("Unable to place COD order:", error);

                const message =
                    (error as { response?: { data?: { message?: string } } })
                        .response?.data?.message ||
                    (error instanceof Error
                        ? error.message
                        : "Unable to place your order. Please try again.");

                notify({
                    type: "error",
                    message
                });

            } finally {
                setIsProcessing(false);
            }

            return;
        }

        setIsProcessing(true);

        try {
            const loaded = await loadRazorpay();
            let buyNowItem = {}
            if(buyNowAsin){
                buyNowItem = {
                    asin: buyNowAsin,
                    quantity: quantity
                } 
            }

            if (!loaded || !window.Razorpay) {
                throw new Error("Unable to load Razorpay. Please try again.");
            }

            // A. Create an order on your server.
            const orderResponse = await api.post("/api/orders/razorpay", {
                buyNowItem
            });

            const {
                id: mongoOrderId,
                razorpayOrderId,
                amount,
                currency,
                key,
            } = orderResponse.data;

            if (!mongoOrderId || !razorpayOrderId || !key || !amount) {
                throw new Error("Invalid order details received from server.");
            }

            // B. Open Razorpay Checkout.
            const razorpay = new window.Razorpay({
                key,
                amount,
                currency,
                name: "Ecommy",
                description: "Purchase payment",
                order_id: razorpayOrderId,

                prefill: {
                    name: checkoutData.name,
                    contact: checkoutData.phone,
                },

                theme: {
                    color: "#000000",
                },

                handler: async (paymentResponse) => {
                    try {
                        const verificationResponse = await api.post(
                            "/api/payment/verify",
                            {
                                orderId: mongoOrderId,
                                ...paymentResponse,
                            }
                        );

                        if (verificationResponse.data.status !== "ok") {
                            throw new Error("Payment verification failed.");
                        }

                        notify({
                            type: "success",
                            message: "Payment successful! Your order is confirmed.",
                        });

                        navigate(`/orders/${mongoOrderId}`);
                    } catch (error) {
                        console.error("Payment verification error:", error);

                        notify({
                            type: "error",
                            message:
                                "Payment could not be verified. Please check your order status before retrying.",
                        });
                    } finally {
                        setIsProcessing(false);
                    }
                },

                modal: {
                    ondismiss: () => {
                        setIsProcessing(false);
                    },
                },
            });

            razorpay.on("payment.failed", (response) => {
                console.error("Razorpay payment failed:", response.error);

                notify({
                    type: "error",
                    message:
                        response.error.description || "Payment failed. Please try again.",
                });

                setIsProcessing(false);
            });

            razorpay.open();
        } catch (error) {
            console.error("Unable to initiate payment:", error);

            const message =
                (error as { response?: { data?: { message?: string } } })
                    .response?.data?.message ||
                (error instanceof Error
                    ? error.message
                    : "Unable to start payment.");

            notify({
                type: "error",
                message,
            });

            setIsProcessing(false);
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            <MinimalHeader />

            {/* Main */}
            <main className="min-h-[calc(100vh-56px)]">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Stepper */}
                    <div className="mx-auto mb-8 flex max-w-2xl items-start justify-center">

                        {/* Step 1 */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="flex items-center w-full">
                                <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full
                                         ${step>=1? "bg-[#05639a] text-sm font-semibold text-white" :  "bg-gray-100 text-sm font-medium text-gray-500" }` }>
                                    1
                                </div>
                            </div>

                            <span className={`mt-2 text-sm font-medium ${step>=1? "text-[#05639a]" : "text-gray-500" }`}>
                                Shipping
                            </span>
                        </div>

                        {/* Line */}
                        <div className={`mt-4 h-0.5 flex-1 bg-[#05639a] ${step>1? "bg-[#05639a]" :  "bg-gray-200"}`} />

                        {/* Step 2 */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="flex items-center w-full">
                                <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full
                                         ${step>=2? "bg-[#05639a] text-sm font-semibold text-white" :  "bg-gray-100 text-sm font-medium text-gray-500" }` }>
                                    2
                                </div>
                            </div>

                            <span className={`mt-2 text-sm font-medium ${step>=2? "text-[#05639a]" : "text-gray-500" }`}>
                                Payment
                            </span>
                        </div>

                        {/* Line */}
                        <div className={`mt-4 h-0.5 flex-1 bg-[#05639a] ${step>2? "bg-[#05639a]" :  "bg-gray-200"}`} />

                        {/* Step 3 */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="flex items-center w-full">
                                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-500">
                                    3
                                </div>
                            </div>

                            <span className="mt-2 text-sm font-medium text-gray-500">
                                Confirmation
                            </span>
                        </div>
                    </div>

                    {/* Checkout Layout */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">

                        {/* LEFT SIDE */}
                        <div>

                            {/* ================= ADDRESS ================= */}
                            <CheckoutAddressSection address={checkoutData.address} phone={checkoutData.phone} name={checkoutData.name} />

                            {/* ================= PAYMENT ================= */}
                            <CheckoutPaymentSection checkoutData={checkoutData} setCheckoutData={setChechkoutData} />
                        </div>

                        {/* ================= RIGHT SIDE ================= */}
                        <CheckoutSidebar cart={checkoutData.cart} discount={buyNowAsin? 0 : discount} onPlaceOrder={handlePlaceOrder} isProcessing={isProcessing}/>
                    </div>
                </div>
            </main>

            <MinimalFooter />
        </div>
    );
}