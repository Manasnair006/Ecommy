export interface Product {
    _id: string;
    asin: string;
    title: string;
    imgUrl: string;
    price: number;
    listPrice: number;
}

interface specs{
    name:string;
    value: string;
}

export interface ProductDetails {
    _id: string;
    asin: string;
    title: string;
    imgUrl: string;
    price: number;
    listPrice: number; 
    boughtInLastMonth: number;
    category_id: number;
    isBestSeller: boolean;
    reviews: number;
    stars: number;

    description:string;

    highlights: string[]
    specifications: specs[]
}