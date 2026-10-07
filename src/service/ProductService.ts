import type { ProductResponse } from "../types/ProductResponse.ts";
import { getToken } from "./authService.ts";

const API_BASE_URL =
  import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:5002/api/products";

export async function fetchAllProducts(): Promise<ProductResponse[]> {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error(`Error fetching products: HTTP ${response.status}`);
  }

  return response.json();
}
export type NewProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export async function createProduct(
  product: NewProduct,
): Promise<ProductResponse> {
  const response = await fetch(`${API_BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function fetchProductsById(id: number): Promise<ProductResponse | null> {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if(response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Error fetching product: HTTP ${response.status}`);
  }

  return response.json();
}
