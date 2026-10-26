
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import MinimalFooter from "../components/MinimalFooter";
import NavBar from "../components/NavBar";
import OrderCard from "../components/OrderCard";

import { fetchMyOrders } from "../randomKids/orderFetcher";
import type { Order } from "../data/Order";

type OrderFilter = "all" | "in-progress" | "delivered" | "cancelled";

const filters: { label: string; value: OrderFilter }[] = [
    { label: "All Orders", value: "all" },
    { label: "In Progress", value: "in-progress" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
];

function matchesFilter(order: Order, filter: OrderFilter): boolean {
    switch (filter) {
        case "in-progress":
            return ["pending", "confirmed", "shipped"].includes(
                order.status
            );

        case "delivered":
            return order.status === "delivered";

        case "cancelled":
            return order.status === "cancelled";

        default:
            return true;
    }
}

export default function OrdersPage() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);
    const [activeFilter, setActiveFilter] =
        useState<OrderFilter>("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadOrders() {
            try {
                setLoading(true);
                setError("");

                const data = await fetchMyOrders();

                if (active) {
                    setOrders(data);
                }
            } catch (err) {
                console.error("Failed to fetch orders:", err);

                if (active) {
                    setError("Unable to load your orders.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadOrders();

        return () => {
            active = false;
        };
    }, []);

    const orderCounts = useMemo(() => ({
        all: orders.length,
        "in-progress": orders.filter(
            order => matchesFilter(order, "in-progress")
        ).length,
        delivered: orders.filter(
            order => order.status === "delivered"
        ).length,
        cancelled: orders.filter(
            order => order.status === "cancelled"
        ).length,
    }), [orders]);

    const filteredOrders = useMemo(
        () => orders.filter(order =>
            matchesFilter(order, activeFilter)
        ),
        [orders, activeFilter]
    );

    return (
        <>
            <NavBar />

            <main className="page-wrapper min-h-screen">
                <div className="container py-8">

                    {/* Page heading */}
                    <div className="mb-6 flex flex-col gap-4
                        sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-extrabold
                                text-slate-900 sm:text-[1.8rem]">
                                My Order History
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                View your purchases and order status.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="btn btn-primary btn-sm w-fit"
                        >
                            Shop New Products
                        </button>
                    </div>

                    {/* Filter tabs */}
                    <div className="mb-6 overflow-x-auto border-b
                        border-b-(--border-color) pb-3">
                        <div className="flex min-w-max gap-3">
                            {filters.map(filter => {
                                const isActive =
                                    activeFilter === filter.value;

                                return (
                                    <button
                                        key={filter.value}
                                        type="button"
                                        onClick={() =>
                                            setActiveFilter(filter.value)
                                        }
                                        aria-pressed={isActive}
                                        className={`btn btn-sm border transition-colors duration-200 ${
                                            isActive
                                                ? "border-blue-200 bg-blue-100 text-blue-800"
                                                : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                                        }`}>
                                        {filter.label} (
                                        {orderCounts[filter.value]})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Loading state */}
                    {loading && (
                        <div className="space-y-6">
                            {[1, 2].map(item => (
                                <div
                                    key={item}
                                    className="animate-pulse rounded-xl
                                        border border-slate-200 bg-white p-6"
                                >
                                    <div className="mb-5 h-4 w-36
                                        rounded bg-slate-200" />

                                    <div className="mb-6 h-5 w-48
                                        rounded bg-slate-100" />

                                    <div className="h-20 rounded
                                        bg-slate-100" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error state */}
                    {!loading && error && (
                        <div className="rounded-xl border border-red-200
                            bg-white p-8 text-center">
                            <p className="font-semibold text-red-700">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="btn btn-primary btn-sm mt-4"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && !error &&
                        filteredOrders.length === 0 && (
                        <div className="rounded-xl border
                            border-slate-200 bg-white px-6 py-16
                            text-center">
                            <h2 className="text-xl font-bold
                                text-slate-900">
                                {orders.length === 0
                                    ? "No orders yet"
                                    : "No orders found"}
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                {orders.length === 0
                                    ? "Your orders will appear here after you make a purchase."
                                    : "There are no orders in this category."}
                            </p>

                            {orders.length === 0 && (
                                <button
                                    type="button"
                                    onClick={() => navigate("/products")}
                                    className="btn btn-primary btn-sm mt-5"
                                >
                                    Explore Products
                                </button>
                            )}
                        </div>
                    )}

                    {/* Reusable order cards */}
                    {!loading && !error && filteredOrders.length > 0 && (
                        <div>
                            {filteredOrders.map(order => (
                                <OrderCard
                                    key={order._id}
                                    order={order}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </main>

            <MinimalFooter />
        </>
    );
}
