export default function ProductGridLoader() {
    return (
        <div className="product-grid" aria-label="Loading products" role="status">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse"
                >
                    {/* Product image */}
                    <div className="flex aspect-square items-center justify-center bg-gray-100">
                        <div className="h-24 w-24 rounded-xl bg-gray-200" />
                    </div>

                    {/* Product details */}
                    <div className="space-y-3 p-4">
                        <div className="h-3 w-1/3 rounded bg-gray-200" />
                        <div className="h-4 w-full rounded bg-gray-200" />
                        <div className="h-4 w-4/5 rounded bg-gray-200" />

                        <div className="flex items-center gap-2 pt-1">
                            <div className="h-5 w-16 rounded bg-gray-200" />
                            <div className="h-3 w-12 rounded bg-gray-100" />
                        </div>

                        <div className="h-9 w-full rounded-lg bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
}