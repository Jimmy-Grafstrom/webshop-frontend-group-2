export type CreateOrderRequest = {
    items: CreateOrderItemRequest[];
};

export type CreateOrderItemRequest = {
    id: number;
    quantity: number;
};

export type OrderProductInfo = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
};

export type OrderResponse = {
    id: number;
    customerName: string;
    items: OrderProductInfo[];
    totalPrice: number;
};