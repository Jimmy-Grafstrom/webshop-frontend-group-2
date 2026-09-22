import type { LoginRequest, LoginResponse } from "../types/auth";

const API_BASE = import.meta.env.VITE_ALP_BASE_URL;
const TOKEN_KEY = "access_token";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Fel användarnamn eller lösenord");
    }
    throw new Error("Något gick fel");
  }

  const data: LoginResponse = await response.json();
  sessionStorage.setItem(TOKEN_KEY, data.accessToken);

  return data;
}

export function logout() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
