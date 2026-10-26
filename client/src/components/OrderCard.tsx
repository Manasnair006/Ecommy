
import { Link } from "react-router-dom";
import type { Order, OrderStatus } from "../data/Order"

interface OrderCardProps {
    order: Order;
}

const statusStyles: Record<OrderStatus, string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<OrderStatus, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(price);

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

export default function OrderCard({ order }: OrderCardProps) {
    return (
        <article className="mb-6 rounded-xl border border-slate-200
            bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">

            {/* Order summary */}
            <div className="flex flex-wrap items-start justify-between
                gap-x-6 gap-y-4 border-b border-slate-200 pb-5">

                <div className="min-w-30">
                    <p className="text-xs font-medium uppercase
                        tracking-wide text-slate-500">
                        Order placed
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {formatDate(order.createdAt)}
                    </p>
                </div>

                <div className="min-w-25">
                    <p className="text-xs font-medium uppercase
                        tracking-wide text-slate-500">
                        Total
                    </p>
                    <p className="mt-1 font-extrabold text-slate-900">
                        {formatPrice(order.totalAmount)}
                    </p>
                </div>

                <div className="min-w-30">
                    <p className="text-xs font-medium uppercase
                        tracking-wide text-slate-500">
                        Ship to
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {order.shippingAddress.name}
                    </p>
                </div>

                <div className="min-w-0 sm:ml-auto sm:text-right">
                    <p className="text-xs font-medium uppercase
                        tracking-wide text-slate-500">
                        Order #
                    </p>
                    <p className="mt-1 break-all font-mono text-xs
                        text-slate-700">
                        {order._id}
                    </p>

                    <span className={`mt-2 inline-flex rounded-full
                        px-3 py-1 text-xs font-semibold ${
                            statusStyles[order.status]
                        }`}>
                        {statusLabels[order.status]}
                    </span>
                </div>
            </div>

            {/* Products in this order */}
            <div className="divide-y divide-slate-100">
                {order.items.map((item, index) => (
                    <div
                        key={`${item.asin}-${index}`}
                        className="flex flex-col gap-4 py-5 sm:flex-row
                            sm:items-center sm:justify-between"
                    >
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-19 w-19
                                shrink-0 items-center justify-center
                                rounded-lg border border-slate-200 p-2">
                                {item.imgUrl ? (
                                    <img
                                        src={item.imgUrl}
                                        alt={item.title}
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <span className="text-xs text-slate-400">
                                        No image
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">
                                <Link
                                    to={`/products/${item.asin}`}
                                    className="font-bold text-slate-900
                                        hover:text-blue-600"
                                >
                                    {item.title}
                                </Link>

                                <p className="mt-1 text-sm text-slate-500">
                                    Qty: {item.quantity}{" "}
                                    <span aria-hidden="true">|</span>{" "}
                                    {formatPrice(item.price)} each
                                </p>

                                <p className="mt-1 text-sm font-semibold
                                    text-slate-800">
                                    Subtotal:{" "}
                                    {formatPrice(
                                        item.price * item.quantity
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 sm:shrink-0">
                            {order.status === "shipped" && (
                                <button
                                    type="button"
                                    disabled
                                    title="Package tracking is not implemented yet"
                                    className="cursor-not-allowed rounded-lg
                                        bg-blue-600 px-3 py-2 text-sm
                                        font-semibold text-white opacity-60"
                                >
                                    Track Package
                                </button>
                            )}

                            {order.status === "delivered" && (
                                <>
                                    <button
                                        type="button"
                                        className="rounded-lg border
                                            border-slate-300 px-3 py-2
                                            text-sm font-semibold text-slate-700
                                            transition hover:bg-slate-50"
                                        onClick={() => {
                                            // Integrate your cart's add-to-cart
                                            // method here.
                                        }}
                                    >
                                        Buy Again
                                    </button>

                                    <button
                                        type="button"
                                        className="rounded-lg border
                                            border-slate-300 px-3 py-2
                                            text-sm font-semibold text-slate-700
                                            transition hover:bg-slate-50"
                                        onClick={() => {
                                            // Navigate to your review flow.
                                        }}
                                    >
                                        Write Review
                                    </button>
                                </>
                            )}

                            <Link
                                to={`/orders/${order._id}`}
                                className="rounded-lg border border-slate-300
                                    px-3 py-2 text-sm font-semibold
                                    text-slate-700 transition hover:bg-slate-50"
                            >
                                View Order
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}
