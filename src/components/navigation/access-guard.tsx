"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { PageLoading } from "@/components/shared/states";
import { canAny, hasAnyRole } from "@/lib/permissions";
import { canAccessRoute } from "@/lib/permissions/routes";
import { useAuth } from "@/providers/auth-provider";
import type { Permission, UserRole } from "@/types/auth";

type AccessGuardProps = {
  children: ReactNode;
  roles?: UserRole[];
  permissions?: Permission[];
  fallback?: string;
};

export function AccessGuard({
  children,
  roles = [],
  permissions = [],
  fallback = "/access-denied",
}: AccessGuardProps) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const allowed =
    isAuthenticated &&
    (!roles.length || hasAnyRole(user, roles)) &&
    (!permissions.length || canAny(user, permissions));

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
    else if (!isLoading && isAuthenticated && !allowed)
      router.replace(fallback);
  }, [allowed, fallback, isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !allowed) return <PageLoading />;
  return children;
}

export function RestaurantAccessGuard({ children }: { children: ReactNode }) {
  return (
    <AccessGuard
      roles={["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"]}
      permissions={["restaurant.dashboard.read", "restaurant.settings.read"]}
    >
      {children}
    </AccessGuard>
  );
}

export function RouteAccessGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useAuth();
  const allowed = isAuthenticated && canAccessRoute(user, pathname);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
    else if (!isLoading && isAuthenticated && !allowed)
      router.replace("/access-denied");
  }, [allowed, isAuthenticated, isLoading, router]);
  if (isLoading || !isAuthenticated || !allowed) return <PageLoading />;
  return children;
}
