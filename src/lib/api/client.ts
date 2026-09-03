import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenManager } from "@/lib/auth/token-manager";
import type { ApiErrorBody } from "@/types/auth";

export class ApiError extends Error {
  readonly code: string;
  readonly details: unknown;
  constructor(code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.details = details;
  }
}

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";
export const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json", "X-Client-Type": "web" },
});
type Refresh = () => Promise<string | null>;
let refreshHandler: Refresh | null = null;
let refreshPromise: Promise<string | null> | null = null;
export const registerRefreshHandler = (handler: Refresh) => {
  refreshHandler = handler;
};
export const resetRefreshHandler = () => {
  refreshHandler = null;
  refreshPromise = null;
};
const isExpired = (error: AxiosError<ApiErrorBody>) =>
  error.response?.status === 401 &&
  error.response.data?.error?.code === "TOKEN_EXPIRED";
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenManager.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const config = error.config as
      (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    if (
      !config ||
      config.url?.includes("/auth/refresh") ||
      config._retry ||
      !isExpired(error) ||
      !refreshHandler
    ) {
      const body = error.response?.data;
      return Promise.reject(
        body?.error
          ? new ApiError(
            body.error.code,
            body.error.message,
            body.error.details,
          )
          : error,
      );
    }
    config._retry = true;
    refreshPromise ??= refreshHandler().finally(() => {
      refreshPromise = null;
    });
    const nextToken = await refreshPromise;
    if (!nextToken)
      return Promise.reject(
        new ApiError("SESSION_EXPIRED", "Your session has expired."),
      );
    config.headers.Authorization = `Bearer ${nextToken}`;
    return apiClient(config);
  },
);
