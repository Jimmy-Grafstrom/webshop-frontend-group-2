export type PaymentRequest = {
    orderId: number;
};

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export type PaymentResponse = {
    id: number;
    orderId: number;
    stripeSessionId: string;
    stripePaymentIntentId: string;
    status: PaymentStatus;
    createdAt: string;
    checkoutUrl: string;
}