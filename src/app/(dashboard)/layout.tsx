import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ProtectedRoute } from "@/components/navigation/protected-route";
export default function DashboardLayout({ children }: { children: ReactNode }) { return <ProtectedRoute><AppShell>{children}</AppShell></ProtectedRoute>; }
