export type PaymentRequest = {
    orderId: number;
};

export type PaymentStatus = "CREATING" | "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export type PaymentResponse = {
    id: number;
    orderId: number;
    stripeSessionId: string;
    stripePaymentIntentId: string | null;
    status: PaymentStatus;
    createdAt: string;
    checkoutUrl: string;
}