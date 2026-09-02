"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { registerRefreshHandler, resetRefreshHandler } from "@/lib/api/client";
import { tokenManager } from "@/lib/auth/token-manager";
import type { AuthState, CurrentUser, LoginRequest } from "@/types/auth";
type AuthContextValue = AuthState & { login: (input: LoginRequest) => Promise<void>; logout: () => Promise<void>; refreshSession: () => Promise<string | null>; initializeSession: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) { const router = useRouter(); const [user, setUser] = useState<CurrentUser | null>(null); const [isLoading, setLoading] = useState(true);
  const refreshSession = useCallback(async () => { try { const result = await authApi.refresh(); tokenManager.set(result.accessToken); setUser(result.user); return result.accessToken; } catch { tokenManager.clear(); setUser(null); return null; } }, []);
  const initializeSession = useCallback(async () => { try { setUser(await authApi.me()); } catch { await refreshSession(); } finally { setLoading(false); } }, [refreshSession]);
  useEffect(() => { registerRefreshHandler(refreshSession); void initializeSession(); return resetRefreshHandler; }, [refreshSession, initializeSession]);
  const value = useMemo<AuthContextValue>(() => ({ user, accessToken: tokenManager.get(), isAuthenticated: Boolean(user), isLoading, login: async (input) => { const result = await authApi.login(input); tokenManager.set(result.accessToken); setUser(result.user); router.push("/dashboard"); }, logout: async () => { try { await authApi.logout(); } finally { tokenManager.clear(); setUser(null); router.push("/login"); } }, refreshSession, initializeSession }), [user, isLoading, router, refreshSession, initializeSession]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; }
export const useAuth = () => { const context = useContext(AuthContext); if (!context) throw new Error("useAuth must be used within AuthProvider"); return context; };
