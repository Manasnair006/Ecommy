
export type OrderStatus =
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled";

export type PaymentStatus =
    | "pending"
    | "paid"
    | "failed";

export interface OrderItem {
    asin: string;
    title: string;
    imgUrl?: string;
    price: number;
    quantity: number;
}

export interface Order {
    _id: string;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;

    payment: {
        method: "COD" | "Razorpay";
        status: PaymentStatus;
        razorpayOrderId?: string;
        razorpayPaymentId?: string;
    };

    shippingAddress: {
        name: string;
        address: string;
        phone: string;
    };
}

export interface MyOrdersResponse {
    success: boolean;
    orders: Order[];
}
