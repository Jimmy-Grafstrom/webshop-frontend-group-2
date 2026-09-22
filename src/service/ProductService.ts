import type {ProductResponse} from "../types/ProductResponse.ts";

const API_BASE_URL = "http://localhost:5002/api/products";

export async function fetchAllProducts(): Promise<ProductResponse[]> {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
        throw new Error(`Error fetching products: HTTP ${response.status}`);
    }

    return response.json();
}
