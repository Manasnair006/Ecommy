import Catalogheader, { SortOption } from "../components/CatalogHeader";
import FilterSidebar from "../components/FilterSidebar";
import Paginationbar from "../components/PaginationBar";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../data/Product";
import productFetcher from "../randomKids/productFetcher";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useSearchParams } from "react-router-dom";
import ProductGridLoader from "../components/ProductGridLoader";

export interface Filters {
    categoryIds: number[];
    minPrice: number | null;
    maxPrice: number | null;
    rating: number | null;
    bestSellers: boolean;
    discounted: boolean;
}

export interface ratingOption{
    value: number;
    label: string;
}

const ratingOptions: ratingOption[] = [
        { value: 4, label: "★★★★☆ & Above (4+)"},
        { value: 3, label: "★★★☆☆ & Above (3+)"},
        { value: 2, label: "★★☆☆☆ & Above (2+)"},
        { value: 1, label: "★☆☆☆☆S & Above (2+)"}
]

export default function ProductsPage(){
    const [sort, setSort] = useState<SortOption>("featured")
    const [page, setPage] = useState(1)

    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)

    const [searchParams] = useSearchParams();

    const searchQuery = searchParams.get("q") ?? "";

    const catQuery = searchParams
        .getAll("cat")
        .map(Number)
        .filter(Number.isFinite);

    const bestSellerQuery = searchParams.has("bestSeller");
    const discountQuery = searchParams.has("discounted");

    const [filters, setFilters] = useState<Filters>(() => ({
        categoryIds: catQuery,
        minPrice: null,
        maxPrice: null,
        rating: null,
        bestSellers: bestSellerQuery,
        discounted: discountQuery
    }));

    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            categoryIds: catQuery,
            bestSellers: bestSellerQuery,
            discounted: discountQuery
        }));

        setPage(1);
    }, [searchParams]);
        
    useEffect(() => {
        let cancelled = false;

        async function loadProducts() {
            try {
                setLoading(true);

                const data = await productFetcher({
                    filters,
                    sort,
                    page,
                    q: searchQuery
                });

                if (cancelled) return;

                setProducts(data.products);
                setTotalPages(data.totalPages);
                setTotalProducts(data.totalProducts);
            } catch (err) {
                if (!cancelled) {
                    console.error("Failed to fetch products", err);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadProducts();

        return () => {
            cancelled = true;
        };
    }, [filters, sort, page, searchQuery]);

    return(
        <>
            <NavBar />
            <main className="page-wrapper" >
                <div className="container">
                    <div className="catalog-layout">
                        
                        <FilterSidebar filters={filters} 
                            setFilters={(newFilters)=>{
                                setFilters(newFilters);
                                setPage(1);
                            }}
                            ratingOptions={ratingOptions}/>

                        <div className="min-w-0">
                            <Catalogheader sort={sort} setSort={setSort} totalProducts={totalProducts} page={page}/>

                            {loading ? (
                                <ProductGridLoader />
                            ) : products.length > 0 ? (
                                <div className="product-grid">
                                    {products.map((prod) => (
                                        <ProductCard key={prod.asin} {...prod} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 3h2l2.4 12.2a2 2 0 002 1.6h7.8a2 2 0 002-1.6L21 8H6"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10 21h.01M17 21h.01"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-800">
                                        No products found
                                    </h3>

                                    <p className="mt-2 max-w-sm text-sm text-gray-500">
                                        We couldn't find any products matching your filters.
                                        Try changing your category or adjusting your filters.
                                    </p>
                                </div>
                            )}
            
                            <Paginationbar currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    )
}