
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import MinimalFooter from "../components/MinimalFooter";
import { fetchOrderById } from "../randomKids/orderFetcher";
import type { Order, OrderStatus } from "../data/Order";

const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(amount);

const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

const statusLabels: Record<OrderStatus, string> = {
    pending: "Order Pending",
    confirmed: "Order Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

const statusStyles: Record<OrderStatus, string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
};

const statusSteps: OrderStatus[] = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
];

export default function OrderDetailsPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadOrder() {
            if (!orderId) {
                setError("Invalid order ID.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const data = await fetchOrderById(orderId);

                if (active) {
                    setOrder(data);
                }
            } catch (err) {
                console.error("Failed to fetch order:", err);

                if (active) {
                    setError(
                        "We couldn't find this order or you don't have permission to view it."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadOrder();

        return () => {
            active = false;
        };
    }, [orderId]);

    const currentStep = order
        ? statusSteps.indexOf(order.status)
        : -1;

    return (
        <>
            <NavBar />

            <main className="page-wrapper min-h-screen">
                <div className="container py-8">

                    {/* Back navigation */}
                    <button
                        type="button"
                        onClick={() => navigate("/orders")}
                        className="mb-6 inline-flex items-center gap-2
                            text-sm font-semibold text-slate-600
                            transition hover:text-blue-600"
                    >
                        <span aria-hidden="true">←</span>
                        Back to My Orders
                    </button>

                    {/* Loading */}
                    {loading && (
                        <div className="space-y-5 animate-pulse">
                            <div className="h-8 w-64 rounded bg-slate-200" />
                            <div className="h-40 rounded-xl bg-slate-100" />
                            <div className="h-64 rounded-xl bg-slate-100" />
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-xl border border-slate-200
                            bg-white px-6 py-16 text-center">
                            <h1 className="text-xl font-bold text-slate-900">
                                Unable to load order
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/orders")}
                                className="btn btn-primary btn-sm mt-6"
                            >
                                View My Orders
                            </button>
                        </div>
                    )}

                    {!loading && !error && order && (
                        <>
                            {/* Page heading */}
                            <div className="mb-6 flex flex-col gap-3
                                sm:flex-row sm:items-start
                                sm:justify-between">
                                <div>
                                    <h1 className="text-2xl font-extrabold
                                        text-slate-900 sm:text-3xl">
                                        Order Details
                                    </h1>

                                    <p className="mt-2 break-all text-sm
                                        text-slate-500">
                                        Order ID: {order._id}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Placed on {formatDate(order.createdAt)}
                                    </p>
                                </div>

                                <span className={`w-fit rounded-full px-4
                                    py-2 text-sm font-semibold ${
                                        statusStyles[order.status]
                                    }`}>
                                    {statusLabels[order.status]}
                                </span>
                            </div>

                            {/* Cancelled notice */}
                            {order.status === "cancelled" && (
                                <div className="mb-6 rounded-xl border
                                    border-red-200 bg-red-50 p-4">
                                    <p className="font-semibold text-red-800">
                                        This order has been cancelled.
                                    </p>
                                    <p className="mt-1 text-sm text-red-700">
                                        Payment refunds, if applicable, must
                                        be handled according to your
                                        cancellation and refund policy.
                                    </p>
                                </div>
                            )}

                            {/* Order progress */}
                            {order.status !== "cancelled" && (
                                <section className="mb-6 rounded-xl border
                                    border-slate-200 bg-white p-5 sm:p-6">
                                    <h2 className="text-lg font-bold
                                        text-slate-900">
                                        Order Progress
                                    </h2>

                                    <div className="mt-6 grid grid-cols-4">
                                        {statusSteps.map((step, index) => {
                                            const completed =
                                                currentStep >= index;

                                            return (
                                                <div
                                                    key={step}
                                                    className="relative flex
                                                        flex-col items-center
                                                        text-center"
                                                >
                                                    {index > 0 && (
                                                        <div className={`absolute
                                                            right-1/2 top-4
                                                            h-0.5 w-full ${
                                                                currentStep >= index
                                                                    ? "bg-blue-600"
                                                                    : "bg-slate-200"
                                                            }`} />
                                                    )}

                                                    <div className={`relative
                                                        z-10 flex h-8 w-8
                                                        items-center
                                                        justify-center
                                                        rounded-full text-sm
                                                        font-bold ${
                                                            completed
                                                                ? "bg-blue-600 text-white"
                                                                : "bg-slate-200 text-slate-500"
                                                        }`}>
                                                        {completed
                                                            ? "✓"
                                                            : index + 1}
                                                    </div>

                                                    <p className={`mt-3 text-xs
                                                        font-semibold sm:text-sm ${
                                                            completed
                                                                ? "text-blue-700"
                                                                : "text-slate-400"
                                                        }`}>
                                                        {step === "pending"
                                                            ? "Placed"
                                                            : step === "confirmed"
                                                                ? "Confirmed"
                                                                : step === "shipped"
                                                                    ? "Shipped"
                                                                    : "Delivered"}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <p className="mt-6 border-t
                                        border-slate-100 pt-4 text-sm
                                        text-slate-500">
                                        {order.status === "delivered"
                                            ? "Your order has been delivered."
                                            : order.status === "shipped"
                                                ? "Your order has been shipped."
                                                : order.status === "confirmed"
                                                    ? "Your order has been confirmed and is awaiting shipment."
                                                    : "Your order has been placed and is awaiting confirmation."}
                                    </p>
                                </section>
                            )}

                            {/* Products */}
                            <section className="mb-6 rounded-xl border
                                border-slate-200 bg-white">
                                <div className="border-b border-slate-200
                                    px-5 py-4 sm:px-6">
                                    <h2 className="text-lg font-bold
                                        text-slate-900">
                                        Items in This Order
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {order.items.length} product
                                        {order.items.length !== 1 ? "s" : ""}
                                    </p>
                                </div>

                                <div className="divide-y divide-slate-100 px-5
                                    sm:px-6">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={`${item.asin}-${index}`}
                                            className="flex flex-col gap-4
                                                py-5 sm:flex-row
                                                sm:items-center
                                                sm:justify-between"
                                        >
                                            <div className="flex min-w-0
                                                items-center gap-4">
                                                <div className="flex h-20 w-20
                                                    shrink-0 items-center
                                                    justify-center rounded-lg
                                                    border border-slate-200 p-2">
                                                    {item.imgUrl ? (
                                                        <img
                                                            src={item.imgUrl}
                                                            alt={item.title}
                                                            className="h-full
                                                                w-full
                                                                object-contain"
                                                        />
                                                    ) : (
                                                        <span className="text-xs
                                                            text-slate-400">
                                                            No image
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="font-semibold
                                                        text-slate-900">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-1 text-sm
                                                        text-slate-500">
                                                        ASIN: {item.asin}
                                                    </p>

                                                    <p className="mt-1 text-sm
                                                        text-slate-500">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="sm:text-right">
                                                <p className="text-sm
                                                    text-slate-500">
                                                    {formatPrice(item.price)} ×{" "}
                                                    {item.quantity}
                                                </p>
                                                <p className="mt-1 font-bold
                                                    text-slate-900">
                                                    {formatPrice(
                                                        item.price * item.quantity
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Shipping and payment */}
                            <div className="mb-6 grid grid-cols-1
                                gap-6 lg:grid-cols-2">

                                <section className="rounded-xl border
                                    border-slate-200 bg-white p-5 sm:p-6">
                                    <h2 className="text-lg font-bold
                                        text-slate-900">
                                        Shipping Address
                                    </h2>

                                    <div className="mt-4 space-y-2 text-sm">
                                        <p className="font-semibold
                                            text-slate-900">
                                            {order.shippingAddress.name}
                                        </p>

                                        <p className="whitespace-pre-line
                                            leading-relaxed text-slate-600">
                                            {order.shippingAddress.address}
                                        </p>

                                        <p className="text-slate-600">
                                            Phone: {order.shippingAddress.phone}
                                        </p>
                                    </div>
                                </section>

                                <section className="rounded-xl border
                                    border-slate-200 bg-white p-5 sm:p-6">
                                    <h2 className="text-lg font-bold
                                        text-slate-900">
                                        Payment Information
                                    </h2>

                                    <div className="mt-4 space-y-4 text-sm">
                                        <div className="flex justify-between gap-4">
                                            <span className="text-slate-500">
                                                Payment method
                                            </span>
                                            <span className="font-semibold
                                                text-slate-900">
                                                {order.payment.method === "COD"
                                                    ? "Cash on Delivery"
                                                    : "Razorpay"}
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-4">
                                            <span className="text-slate-500">
                                                Payment status
                                            </span>

                                            <span className={`font-semibold ${
                                                order.payment.status === "paid"
                                                    ? "text-emerald-700"
                                                    : order.payment.status === "failed"
                                                        ? "text-red-700"
                                                        : "text-amber-700"
                                            }`}>
                                                {order.payment.status
                                                    .charAt(0).toUpperCase() +
                                                    order.payment.status.slice(1)}
                                            </span>
                                        </div>

                                        {order.payment.razorpayPaymentId && (
                                            <div>
                                                <p className="text-slate-500">
                                                    Payment ID
                                                </p>
                                                <p className="mt-1 break-all
                                                    font-mono text-xs
                                                    text-slate-700">
                                                    {order.payment.razorpayPaymentId}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>

                            {/* Order summary */}
                            <section className="ml-auto rounded-xl border
                                border-slate-200 bg-white p-5 sm:max-w-md
                                sm:p-6">
                                <h2 className="text-lg font-bold
                                    text-slate-900">
                                    Order Summary
                                </h2>

                                <div className="mt-5 space-y-3 text-sm">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-slate-500">
                                            Items ({order.items.reduce(
                                                (total, item) =>
                                                    total + item.quantity,
                                                0
                                            )})
                                        </span>

                                        <span className="font-medium
                                            text-slate-900">
                                            {formatPrice(
                                                order.items.reduce(
                                                    (total, item) =>
                                                        total +
                                                        item.price * item.quantity,
                                                    0
                                                )
                                            )}
                                        </span>
                                    </div>

                                    <div className="border-t border-slate-200
                                        pt-4">
                                        <div className="flex justify-between
                                            gap-4">
                                            <span className="font-bold
                                                text-slate-900">
                                                Order Total
                                            </span>
                                            <span className="text-lg
                                                font-extrabold text-slate-900">
                                                {formatPrice(order.totalAmount)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-4 text-xs leading-relaxed
                                    text-slate-500">
                                    The order total is the amount recorded
                                    when this order was placed.
                                </p>
                            </section>

                            {/* Footer actions */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    to="/orders"
                                    className="btn btn-outline btn-sm"
                                >
                                    Back to Orders
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => navigate("/products")}
                                    className="btn btn-primary btn-sm"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>

            <MinimalFooter />
        </>
    );
}
