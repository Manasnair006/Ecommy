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
    const [filters, setFilters] = useState<Filters>({
            categoryIds:[],
            minPrice: null,
            maxPrice: null,
            rating: null,
            bestSellers: false,
            discounted: false
    })

    const [sort, setSort] = useState<SortOption>("featured")
    const [page, setPage] = useState(1)

    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)

    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get("q") ?? ""
    const catQuery = searchParams.get("cat")? searchParams.getAll("cat").map((curr)=> {return Number(curr)}) : []
    useEffect(()=>{
        if(catQuery.length > 0){
            setFilters((prev)=>{
                return({
                    ...prev,
                    categoryIds: catQuery
                })           
            })
        }
    },[])
    useEffect(()=>{
        async function loadProducts(){
            try{
                setLoading(true)

                const data = await productFetcher({
                    filters,
                    sort,
                    page,
                    q : searchQuery
                })
                console.log(data)

                setProducts(data.products)
                setTotalPages(data.totalPages)
                setTotalProducts(data.totalProducts)
            }catch(err){
                console.error("Failed to catch products", err)
            } finally{
                setLoading(false)
            }
        }
        loadProducts();
    }, [filters, sort, page, searchParams])

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

                            {loading? (
                                <div> Loading...... </div>
                            ):(
                                <div className="product-grid">
                                    {products.map((prod)=>{
                                        return(
                                            <ProductCard key={prod.asin}
                                                {...prod} />
                                        )
                                    })}
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