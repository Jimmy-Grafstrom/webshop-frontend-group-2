export type PaymentRequest = {
    orderId: number;
    amount: number;
    currency: string;
};

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export type PaymentResponse = {
    id: number;
    orderId: number;
    stripeSessionId: string;
    stripePaymentIntentId: string;
    status: PaymentStatus;
    createdAt: string;
    checjoutUrl: string;
}