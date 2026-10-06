import { getToken } from "./authService";
import type { CreateOrderRequest } from "../types/Order";

const API_URL = import.meta.env.VITE_API_ORDER_SERVICE_URL;

export const createOrder = async (order: CreateOrderRequest) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa ordern");
  }

  return response.json();
};
