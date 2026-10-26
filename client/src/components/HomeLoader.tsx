export default function HomeLoader() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Loading Navbar */}
            <header className="flex h-17.5 items-center justify-between bg-[#075985] px-6 shadow-md sm:px-10">
                <div className="animate-pulse text-2xl font-extrabold tracking-wide text-orange-400">
                    ECOMMY
                </div>

                <div className="hidden items-center gap-6 md:flex">
                    <div className="h-4 w-16 animate-pulse rounded bg-white/20" />
                    <div className="h-4 w-20 animate-pulse rounded bg-white/20" />
                    <div className="h-4 w-16 animate-pulse rounded bg-white/20" />
                </div>

                <div className="h-10 w-10 animate-pulse rounded-full bg-white/15" />
            </header>

            {/* Main Loading Content */}
            <main className="flex flex-1 flex-col">
                <section className="relative flex min-h-80 flex-col items-center justify-center overflow-hidden bg-linear-to-br from-slate-800 via-sky-900 to-slate-950 px-6 py-16 text-center sm:min-h-90">
                    {/* Background decoration */}
                    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />

                    <div className="relative flex flex-col items-center">
                        {/* Spinner */}
                        <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-4 border-white/15" />
                            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-orange-400 border-r-orange-400" />
                            <span className="text-xl font-extrabold text-white">E</span>
                        </div>

                        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                            ECOMMY
                        </h1>

                        <p className="mt-3 text-sm text-slate-300 sm:text-base">
                            Getting your shopping experience ready...
                        </p>

                        <div className="mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full w-1/2 animate-pulse rounded-full bg-orange-400" />
                        </div>
                    </div>
                </section>

                {/* Feature Skeletons */}
                <section className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 px-5 py-8 md:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-sky-100" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                                <div className="h-2.5 w-full animate-pulse rounded bg-gray-100" />
                            </div>
                        </div>
                    ))}
                </section>

                {/* Product Skeletons */}
                <section className="mx-auto w-full max-w-7xl px-5 pb-12">
                    <div className="mb-6 h-6 w-44 animate-pulse rounded bg-gray-200" />

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                            >
                                <div className="aspect-square animate-pulse rounded-lg bg-gray-100" />

                                <div className="mt-4 space-y-3">
                                    <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                                    <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                                    <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
                                    <div className="h-9 w-full animate-pulse rounded-lg bg-sky-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}