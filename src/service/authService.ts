import type { LoginRequest, LoginResponse } from "../types/auth";

const API_BASE = import.meta.env.VITE_ALP_BASE_URL;
const TOKEN_KEY = "access_token";
const SUBJECT_KEY = "subject";
const ROLES_KEY = "roles";

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
  sessionStorage.setItem(SUBJECT_KEY, data.subject);
  sessionStorage.setItem(ROLES_KEY, JSON.stringify(data.roles));

  return data;
}

export function logout() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(SUBJECT_KEY);
  sessionStorage.removeItem(ROLES_KEY);
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getSubject(): string | null {
  return sessionStorage.getItem(SUBJECT_KEY);
}

export function getRoles(): string[] {
  const roles = sessionStorage.getItem(ROLES_KEY);
  return roles ? JSON.parse(roles) : [];
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
