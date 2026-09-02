"use client";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { PageLoading } from "@/components/shared/states";
export function ProtectedRoute({ children }: { children: ReactNode }) { const { isLoading, isAuthenticated } = useAuth(); const router = useRouter(); useEffect(() => { if (!isLoading && !isAuthenticated) router.replace("/login"); }, [isLoading, isAuthenticated, router]); if (isLoading || !isAuthenticated) return <PageLoading />; return children; }
