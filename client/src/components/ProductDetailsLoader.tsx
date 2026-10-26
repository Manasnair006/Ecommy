export default function ProductDetailsLoader() {
    return (
        <>
            <div className="page-wrapper mb-2">
                <div className="container animate-pulse">

                    {/* Breadcrumb skeleton */}
                    <div className="h-4 w-2/3 max-w-md rounded bg-gray-200 mb-8" />

                    <div className="product-detail-grid">

                        {/* Product image skeleton */}
                        <div className="gallery-container">
                            <div className="w-full aspect-square rounded-xl bg-gray-200" />

                            <div className="gallery-thumbs mt-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="gallery-thumb rounded bg-gray-200"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Product information skeleton */}
                        <div className="detail-info space-y-4">
                            <div className="h-5 w-28 rounded bg-gray-200" />
                            <div className="h-7 w-full rounded bg-gray-200" />
                            <div className="h-5 w-3/4 rounded bg-gray-200" />
                            <div className="h-4 w-40 rounded bg-gray-200" />

                            <div className="h-px w-full bg-gray-200 my-6" />

                            <div className="h-6 w-32 rounded bg-gray-200" />
                            <div className="h-4 w-full rounded bg-gray-200" />
                            <div className="h-4 w-5/6 rounded bg-gray-200" />
                            <div className="h-4 w-4/6 rounded bg-gray-200" />

                            <div className="h-6 w-28 rounded bg-gray-200 mt-6" />

                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-4 w-full rounded bg-gray-200"
                                />
                            ))}
                        </div>

                        {/* Purchase box skeleton */}
                        <div className="buy-box space-y-5">
                            <div className="h-8 w-32 rounded bg-gray-200" />
                            <div className="h-4 w-36 rounded bg-gray-200" />
                            <div className="h-5 w-40 rounded bg-gray-200" />

                            <div className="h-10 w-full rounded-lg bg-gray-200" />
                            <div className="h-12 w-full rounded-lg bg-gray-200" />
                            <div className="h-12 w-full rounded-lg bg-gray-200" />

                            <div className="h-px w-full bg-gray-200" />

                            <div className="h-4 w-full rounded bg-gray-200" />
                            <div className="h-4 w-4/5 rounded bg-gray-200" />
                            <div className="h-4 w-3/4 rounded bg-gray-200" />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}