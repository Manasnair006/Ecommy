
import api from "../config/api";
import { MyOrdersResponse, Order } from "../data/Order";

interface GetOrderResponse {
    order: Order;
}

export async function fetchMyOrders() {
    const response = await api.get<MyOrdersResponse>(
        "/api/orders"
    );

    return response.data.orders;
}

export const fetchOrderById = async (
    orderId: string
): Promise<Order> => {
    const response = await api.get<GetOrderResponse>(
        `api/orders/${orderId}`
    );

    return response.data.order;
};
