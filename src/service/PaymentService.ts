import { getToken } from "./authService";
import type { PaymentRequest, PaymentResponse } from "../types/payment";

const PAYMENT_API_BASE_URL =
  import.meta.env.VITE_PAYMENT_API_URL || "http://localhost:5005/payment";

export async function createPayment(
  request: PaymentRequest,
): Promise<PaymentResponse> {
  const response = await fetch(`${PAYMENT_API_BASE_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Din session har gått ut, logga in igen");
    }
    throw new Error(`Kunde inte starta betalningen: HTTP ${response.status}`);
  }

  return response.json();
}
