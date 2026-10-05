export type CreateOrderRequest = {
    items: CreateOrderItemRequest[];
};

export type CreateOrderItemRequest = {
    id: number;
    quantity: number;
};