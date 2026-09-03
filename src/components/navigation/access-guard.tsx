"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { PageLoading } from "@/components/shared/states";
import { canAny, hasAnyRole } from "@/lib/permissions";
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
  if (pathname.startsWith("/restaurant-dashboard")) {
    const permission = pathname.startsWith("/restaurant-dashboard/settings")
      ? "restaurant.settings.read"
      : pathname.startsWith("/restaurant-dashboard/profile")
        ? "restaurant.profile.read"
        : "restaurant.dashboard.read";
    return (
      <AccessGuard
        roles={["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"]}
        permissions={[permission]}
      >
        {children}
      </AccessGuard>
    );
  }
  if (pathname.startsWith("/restaurants")) {
    return (
      <AccessGuard roles={["SUPER_ADMIN"]} permissions={["restaurants.read"]}>
        {children}
      </AccessGuard>
    );
  }
  if (pathname.startsWith("/administrations")) {
    return (
      <AccessGuard
        roles={["SUPER_ADMIN"]}
        permissions={["administrations.read"]}
      >
        {children}
      </AccessGuard>
    );
  }
  return children;
}
