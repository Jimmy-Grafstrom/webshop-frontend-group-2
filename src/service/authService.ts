import type { LoginRequest, User, RegisterRequest, MeResponse } from "../types/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function login(credentials: LoginRequest): Promise<User> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Fel användarnamn eller lösenord");
    }
    throw new Error("Något gick fel");
  }

  const user: User = await response.json();

  return user;
}

export async function register(credentials: RegisterRequest): Promise<void> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("Användarnamnet är redan upptaget");
    }
    if (response.status === 400) {
      throw new Error("Ogiltiga uppgifter");
    }
    throw new Error("Något gick fel");
  }
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Utloggningen misslyckades");
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const me: MeResponse = await response.json();

    return {
      subject: me.subject,
      roles: me.roles,
      expiresIn: me.remainingSeconds,
    };
  } catch {
    return null;
  }
}