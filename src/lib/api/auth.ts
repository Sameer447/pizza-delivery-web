import { apiClient } from "@/lib/api/client";
import type { AuthResponse, CurrentUser, LoginRequest, MeResponse, User } from "@/types/auth";

const normalizeUser = (user: User): CurrentUser => {
    const [firstName = "", ...lastNameParts] = user.name.trim().split(/\s+/);
    return { ...user, firstName, lastName: lastNameParts.join(" "), permissions: [], memberships: [] };
};

const normalizeSession = (response: AuthResponse) => ({ accessToken: response.data.accessToken, user: normalizeUser(response.data.user) });

const unwrapUser = (response: MeResponse): User => {
    if ("success" in response) return unwrapUser(response.data);
    return "user" in response ? response.user : response;
};

export const authApi = {
    login: async (body: LoginRequest) =>
        normalizeSession((await apiClient.post<AuthResponse>("/auth/login", body)).data),
    refresh: async () =>
        normalizeSession((await apiClient.post<AuthResponse>("/auth/refresh")).data),
    logout: async () => {
        await apiClient.post("/auth/logout");
    },
    me: async () =>
        normalizeUser(unwrapUser((await apiClient.get<MeResponse>("/auth/me")).data)),
};
