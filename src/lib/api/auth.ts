import { apiClient } from "@/lib/api/client";
import type { AuthResponse, CurrentUser, LoginRequest } from "@/types/auth";
export const authApi = { login: async (body: LoginRequest) => (await apiClient.post<AuthResponse>("/auth/login", body)).data.data, refresh: async () => (await apiClient.post<AuthResponse>("/auth/refresh")).data.data, logout: async () => { await apiClient.post("/auth/logout"); }, me: async () => (await apiClient.get<{ success: true; data: CurrentUser }>("/auth/me")).data.data };
