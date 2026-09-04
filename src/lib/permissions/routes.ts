import { canAny, hasAnyRole } from "@/lib/permissions";
import type { CurrentUser, Permission, UserRole } from "@/types/auth";

type RoutePolicy = {
  prefix: string;
  roles: UserRole[];
  permissions: Permission[];
};

const routePolicies: RoutePolicy[] = [
  {
    prefix: "/restaurant-dashboard/settings",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"],
    permissions: ["restaurant.settings.read", "settings.read"],
  },
  {
    prefix: "/restaurant-dashboard/profile",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"],
    permissions: ["restaurant.profile.read"],
  },
  {
    prefix: "/restaurant-dashboard",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"],
    permissions: ["restaurant.dashboard.read"],
  },
  {
    prefix: "/restaurants",
    roles: ["SUPER_ADMIN"],
    permissions: ["restaurants.read"],
  },
  {
    prefix: "/administrations",
    roles: ["SUPER_ADMIN"],
    permissions: ["administrations.read"],
  },
  { prefix: "/dashboard", roles: ["SUPER_ADMIN"], permissions: [] },
  {
    prefix: "/orders",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"],
    permissions: ["orders.read"],
  },
  {
    prefix: "/categories",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"],
    permissions: ["categories.read"],
  },
  {
    prefix: "/menu",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"],
    permissions: ["menu.read"],
  },
  {
    prefix: "/toppings",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"],
    permissions: ["toppings.read"],
  },
  {
    prefix: "/customers",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN"],
    permissions: ["customers.read"],
  },
  {
    prefix: "/coupons",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN"],
    permissions: ["coupons.read"],
  },
  {
    prefix: "/reports",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN"],
    permissions: ["reports.read"],
  },
  {
    prefix: "/staff",
    roles: ["RESTAURANT_ADMIN"],
    permissions: ["staff.read"],
  },
  {
    prefix: "/audit-logs",
    roles: ["SUPER_ADMIN"],
    permissions: ["audit_logs.read"],
  },
  {
    prefix: "/settings",
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"],
    permissions: ["restaurant.settings.read"],
  },
];

export function getRoutePolicy(pathname: string): RoutePolicy | null {
  return (
    routePolicies.find(
      (policy) =>
        pathname === policy.prefix || pathname.startsWith(`${policy.prefix}/`),
    ) ?? null
  );
}

export function canAccessRoute(
  user: CurrentUser | null,
  pathname: string,
): boolean {
  const policy = getRoutePolicy(pathname);
  if (!policy) return Boolean(user);
  return (
    hasAnyRole(user, policy.roles) &&
    (!policy.permissions.length ||
      !user?.permissionsLoaded ||
      canAny(user, policy.permissions))
  );
}

export function getRoleHomePath(user: CurrentUser | null): string {
  if (user?.role === "SUPER_ADMIN") return "/dashboard";
  if (user?.role === "RESTAURANT_ADMIN" || user?.role === "RESTAURANT_STAFF") {
    return "/restaurant-dashboard";
  }
  return "/access-denied";
}
