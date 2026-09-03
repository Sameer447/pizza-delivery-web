import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ProtectedRoute } from "@/components/navigation/protected-route";
import { RouteAccessGuard } from "@/components/navigation/access-guard";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <RouteAccessGuard>
        <AppShell>{children}</AppShell>
      </RouteAccessGuard>
    </ProtectedRoute>
  );
}
