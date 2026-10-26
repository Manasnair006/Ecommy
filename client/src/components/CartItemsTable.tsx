import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function CartItemsTable() {
    const [removingItemAsin, setRemovingItemAsin] = useState<string | null>(null);

    const {
        cart,
        setCart,
        cartLoading,
        removeItem,
        deleteCart,
        updateItemQuantity,
    } = useCart();

    const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
    const navigate = useNavigate();

    const handleQuantity = ({
        asin,
        quantity,
    }: {
        asin: string;
        quantity: number;
    }) => {
        setCart((prev) =>
            prev.map((item) =>
                item.asin === asin ? { ...item, quantity } : item
            )
        );

        if (debounceTimers.current[asin]) {
            clearTimeout(debounceTimers.current[asin]);
        }

        debounceTimers.current[asin] = setTimeout(async () => {
            await updateItemQuantity({ asin, quantity });
        }, 500);
    };

    // Loading state
    if (cartLoading) {
        return (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5">
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-blue-100" />
                    <div className="space-y-2">
                        <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
                        <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                    </div>
                </div>

                <div className="divide-y divide-gray-100 px-5">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center"
                        >
                            <div className="h-24 w-24 shrink-0 animate-pulse self-start rounded-xl bg-gray-100 sm:self-auto" />

                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
                                <div className="h-3 w-20 animate-pulse rounded bg-green-100" />
                            </div>

                            <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-100" />

                            <div className="space-y-3 sm:w-24">
                                <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                                <div className="h-3 w-14 animate-pulse rounded bg-gray-100" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-4">
                    <div className="h-9 w-36 animate-pulse rounded-lg bg-gray-200" />
                    <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-100" />
                </div>

                <p className="pb-5 text-center text-sm text-gray-500">
                    Loading your cart...
                </p>
            </div>
        );
    }

    // Empty cart state
    if (!cart || cart.length === 0) {
        return (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex min-h-100 flex-col items-center justify-center px-6 py-12 text-center sm:min-h-110">
                    {/* Shopping bag illustration */}
                    <div className="relative mb-7 flex h-32 w-32 items-center justify-center rounded-full bg-blue-50">
                        <div className="absolute inset-2 rounded-full border border-dashed border-blue-200" />

                        <svg
                            viewBox="0 0 100 100"
                            className="relative h-20 w-20"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M25 36H75L80 82H20L25 36Z"
                                fill="#DBEAFE"
                                stroke="#2563EB"
                                strokeWidth="3"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M37 38V29C37 21 42 16 50 16C58 16 63 21 63 29V38"
                                stroke="#2563EB"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <path
                                d="M36 51C38 58 43 62 50 62C57 62 62 58 64 51"
                                stroke="#F59E0B"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <circle cx="75" cy="25" r="12" fill="#F59E0B" />
                            <path
                                d="M75 19V31M69 25H81"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <span className="mb-3 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
                        Your cart is waiting
                    </span>

                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                        Your cart is empty
                    </h2>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
                        Looks like you haven't added anything yet. Explore our
                        collection and find something you'll love.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    >
                        Start Shopping
                        <span aria-hidden="true">→</span>
                    </button>

                    <Link
                        to="/"
                        className="mt-4 text-sm font-medium text-blue-700 transition hover:text-blue-900"
                    >
                        Back to Home
                    </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-gray-100 bg-gray-50 px-5 py-4 text-xs text-gray-500 sm:text-sm">
                    <span className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        Secure checkout
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        Easy returns
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        Quality products
                    </span>
                </div>
            </div>
        );
    }

    // Populated cart
    return (
        <div className="cart-table-card">
            {cart.map((item) => (
                <div key={item.asin} className="cart-item">
                    <img
                        src={item.imgUrl}
                        alt={item.title}
                        className="h-20 w-20 rounded-sm border border-solid border-white object-contain"
                    />

                    <div>
                        <h3 className="text-[1rem] font-semibold">
                            <Link
                                to={`/products/${item.asin}`}
                                className="transition hover:text-blue-600"
                            >
                                {item.title}
                            </Link>
                        </h3>
                        <p className="mt-1 text-[0.85rem] text-muted">
                            Brand: Ecommy
                        </p>
                        <p className="mt-1 text-[0.85rem] font-semibold text-green-600">
                            In Stock
                        </p>
                    </div>

                    <div>
                        <div className="qty-picker">
                            <button
                                className="qty-minus"
                                disabled={item.quantity === 1}
                                onClick={() =>
                                    handleQuantity({
                                        asin: item.asin,
                                        quantity: item.quantity - 1,
                                    })
                                }
                            >
                                -
                            </button>

                            <input
                                type="text"
                                value={item.quantity}
                                readOnly
                                aria-label={`Quantity of ${item.title}`}
                            />

                            <button
                                className="qty-plus"
                                onClick={() =>
                                    handleQuantity({
                                        asin: item.asin,
                                        quantity: item.quantity + 1,
                                    })
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-[1.2rem] font-extrabold text-ink">
                            ${item.price}
                        </div>

                        {removingItemAsin === item.asin ? (
                            <button
                                className="mt-2 cursor-wait text-[0.85rem] text-gray-400"
                                disabled
                            >
                                Removing...
                            </button>
                        ) : (
                            <button
                                className="mt-2 cursor-pointer text-[0.85rem] text-red-500 transition hover:text-red-700"
                                onClick={() => {
                                    setRemovingItemAsin(item.asin);
                                    removeItem({ asin: item.asin });
                                }}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            ))}

            <div className="mt-5 flex justify-between border-t border-solid border-t-gray-200 pt-4">
                <button
                    onClick={() => navigate("/products")}
                    className="btn btn-outline btn-sm"
                >
                    ← Continue Shopping
                </button>

                <button
                    className="btn btn-outline btn-sm text-red-600"
                    onClick={() => deleteCart()}
                >
                    Clear Shopping Cart
                </button>
            </div>
        </div>
    );
}