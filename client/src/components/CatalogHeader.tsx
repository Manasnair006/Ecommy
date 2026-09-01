import React from "react"
import "../styles/tailwind.css"

export type SortOption = 
 | "featured"
 | "priceAsc"
 | "priceDesc"
 | "ratings"
 | "newest";

export default function Catalogheader({
        sort,
        setSort,
        totalProducts,
        page
    }:{
        sort: SortOption,
        setSort: React.Dispatch<React.SetStateAction<SortOption>>,
        totalProducts: number,
        page: number
    }){
        const limit = 20
        const start= totalProducts === 0
            ? 0
            : (page -1) *limit +1;
        const end = Math.min(page*limit, totalProducts)

    return(
        <div className="catalog-header">
            <div className="font-semibold text-muted">
              Showing {start}-{end} of {totalProducts} products
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sortSelect" className="text-[0.9rem] font-semibold" >Sort By:</label>
              <select id="sortSelect" 
                className="form-control w-auto px-3 py-1.5"
                value={sort}
                onChange={(e)=>{
                    setSort(e.target.value as SortOption)
                }}>
                <option value="featured">Featured</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="ratings">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
        </div>
    )
}