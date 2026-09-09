export interface CartItem{
    asin: string;
    quaantity: number
}

export default interface Cart{
    userId: string;
    items: CartItem[]
}