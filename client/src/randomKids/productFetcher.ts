import { SortOption } from "../components/CatalogHeader";
import api from "../config/api";
import { Product } from "../data/Product";
import { Filters } from "../pages/ProductsPage";

interface ProductQueryResponse {
    page: number;
    totalPages: number;
    totalProducts: number;
    products: Product[]
}

interface ProductRequest {
    filters: Filters
    sort: SortOption
    page: number
}

export default async function productFetcher({
    filters,
    sort,
    page
    }: ProductRequest): Promise<ProductQueryResponse> {

        const params = {
            category: filters.categoryIds.length > 0
                ? filters.categoryIds.join(",")
                : undefined,

            minPrice: filters.minPrice ?? undefined,

            maxPrice: filters.maxPrice ?? undefined,

            stars: filters.rating ?? undefined,

            bestSeller: filters.bestSellers
                ? true
                : undefined,
            
            discount: filters.discounted
                ? true
                : undefined,

            sort,

            page
            
        };

        const response = await api.get<ProductQueryResponse>(
            "/api/products",
            {params}
        );

        return response.data;

}