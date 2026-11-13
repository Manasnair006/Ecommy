import "../styles/tailwind.css"
import categories from "../data/Category";
import React, { useState } from "react";
import { Category } from "../data/Category";
import { Filters, ratingOption } from "../pages/ProductsPage";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

interface FilterSidebarProps{
    filters: Filters,
    setFilters: React.Dispatch<React.SetStateAction<Filters>>,
    ratingOptions: ratingOption[]
}


export default function FilterSidebar({
    filters,
    setFilters,
    ratingOptions
    }:FilterSidebarProps){

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const activeFilterCount = 
        filters.categoryIds.length +
        (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0) +
        (filters.rating !== null ? 1 : 0) +
        (filters.bestSellers ? 1 : 0) +
        (filters.discounted ? 1 : 0);

    function toggleChange(categoryId: Category["id"]){
        setFilters((prev)=>{
            let exists = prev.categoryIds.includes(categoryId);

            return({
                ...prev,
                categoryIds: exists
                    ? prev.categoryIds.filter((id)=> id !== categoryId)
                    : [...prev.categoryIds, categoryId],
            });
        });
    }

    return(
        <div>
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden mb-4">
                <button
                    type="button"
                    onClick={() => setIsMobileOpen(prev => !prev)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-ink shadow-sm transition hover:border-brand"
                >
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="size-4 text-brand" />
                        <span>Filter Products</span>
                        {activeFilterCount > 0 && (
                            <span className="rounded-full bg-brand px-2 py-0.5 text-xs text-white font-bold">
                                {activeFilterCount}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-brand font-medium">
                        <span>{isMobileOpen ? "Hide" : "Show"}</span>
                        {isMobileOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </div>
                </button>
            </div>

            <aside className={`filter-sidebar ${isMobileOpen ? "block mb-6" : "hidden lg:block"}`}>
          <div className="flex justify-between items-center mb-4" >
            <h3 className="text-[1.1rem] font-bold">Filter Products</h3>
            <button className="text-[0.85rem] text-blue-500 underline"
             onClick={()=>{
                setFilters({
                    categoryIds:[],
                    minPrice: null,
                    maxPrice: null,
                    rating: null,
                    bestSellers: false,
                    discounted: false
                });

             }}> Reset
            </button>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Categories</h4>
            <ul className="filter-list">
               {categories.map((cat)=>{
                return(
                    <li key={`${cat.name}_list`}>
                        <label className="filter-checkbox">
                            <input 
                                type="checkbox" 
                                checked= {filters.categoryIds.includes(cat.id)}
                                onChange={() => {toggleChange(cat.id)}} 
                            /> {cat.name}
                        </label>
                    </li>
                )
               })} 
            </ul>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Price Range</h4>
            <div className="flex gap-2 items-center mb-2.5">
              <input type="number"
                key={"minPrice-filter"} 
                placeholder="Min $" 
                className="form-control p-1.5"
                value={filters.minPrice?? ""} 
                onChange={(e)=>{
                    setFilters((prev)=>{
                        return{
                            ...prev,
                            minPrice:
                                e.target.value === ""
                                ? null
                                : Number(e.target.value)
                        }
                    })
                }}/>
              <span>-</span>
              <input type="number"
                key={'maxPrice-filter'} 
                placeholder="Max $" 
                className="form-control p-1.5" 
                value={filters.maxPrice ?? ""} 
                onChange={(e)=>{
                    setFilters((prev)=>{
                        return{
                            ...prev,
                            maxPrice:
                                e.target.value === ""
                                ? null
                                : Number(e.target.value)
                        }
                    })
                }}/>
            </div>
            <button className="btn btn-outline btn-sm btn-block">Apply Price</button>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Customer Rating</h4>
            <ul className="filter-list">
              { ratingOptions.map((ratingOption)=>{
                return(
                    <li key={"rating"+ ratingOption.value}>
                        <label className="filter-checkbox">
                            <input type="radio" 
                                name="stars" 
                                checked = {filters.rating === ratingOption.value}
                                onChange={()=>{console.log("hellow")}}
                                onClick={()=>{
                                    setFilters(prev=> ({
                                        ...prev,
                                        rating: 
                                            prev.rating === ratingOption.value
                                            ? null
                                            : ratingOption.value,
                                    }))
                                }}/> {ratingOption.label}
                        </label>
                    </li>
                )
              })}
            </ul>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Other Options</h4>
            <ul className="filter-list">
              <li key={"bestseller-filter"}>
                <label className="filter-checkbox">
                  <input type="checkbox" checked={filters.bestSellers} 
                    onChange={()=>{
                        setFilters(prev=>{
                            return{
                                ...prev,
                                bestSellers:
                                    prev.bestSellers === true
                                    ? false
                                    : true
                            }
                        })
                    }}/> Best Sellers Only
                </label>
              </li>
              <li key={"discounted-filter"}>
                <label className="filter-checkbox">
                  <input type="checkbox" checked={filters.discounted}
                   onChange={()=>{
                    setFilters(prev=>{
                        return{
                            ...prev,
                            discounted:
                                prev.discounted === true
                                ? false
                                : true
                        }
                    })
                   }}/> Discounted Items
                </label>
              </li>
            </ul>
          </div>

        </aside>
      </div>
    )
}