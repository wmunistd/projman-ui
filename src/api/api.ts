import type { CreateUserPayload } from "./types";
import { handleError } from "./errorHandling";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function listUsers() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function createUser(payload: CreateUserPayload) {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    handleError(error);
  }
}
