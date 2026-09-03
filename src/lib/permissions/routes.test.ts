import { describe, expect, it } from "vitest";
import { canAccessRoute } from "@/lib/permissions/routes";
import type { CurrentUser } from "@/types/auth";

const user = (
  role: CurrentUser["role"],
  permissions: string[],
): CurrentUser => ({
  id: role,
  name: role,
  email: `${role.toLowerCase()}@example.com`,
  phone: null,
  firstName: role,
  lastName: "User",
  role,
  isActive: true,
  permissions,
  memberships: [],
  permissionsLoaded: true,
});

describe("route access policy", () => {
  it("allows super admins to access platform administration", () => {
    const admin = user("SUPER_ADMIN", [
      "restaurants.read",
      "administrations.read",
    ]);
    expect(canAccessRoute(admin, "/dashboard")).toBe(true);
    expect(canAccessRoute(admin, "/restaurants/123")).toBe(true);
    expect(canAccessRoute(admin, "/administrations/123")).toBe(true);
  });

  it("limits restaurant admins to granted restaurant modules", () => {
    const admin = user("RESTAURANT_ADMIN", [
      "restaurant.dashboard.read",
      "restaurant.settings.read",
      "orders.read",
    ]);
    expect(
      canAccessRoute(admin, "/restaurant-dashboard/settings/delivery"),
    ).toBe(true);
    expect(canAccessRoute(admin, "/orders")).toBe(true);
    expect(canAccessRoute(admin, "/restaurants")).toBe(false);
    expect(canAccessRoute(admin, "/administrations")).toBe(false);
  });

  it("does not expose admin routes to customers", () => {
    const customer = user("CUSTOMER", ["orders.read"]);
    expect(canAccessRoute(customer, "/dashboard")).toBe(false);
    expect(canAccessRoute(customer, "/restaurant-dashboard")).toBe(false);
    expect(canAccessRoute(customer, "/orders")).toBe(false);
    expect(canAccessRoute(customer, "/restaurants")).toBe(false);
  });

  it("allows role-based home routing before permissions are returned", () => {
    const admin = user("RESTAURANT_ADMIN", []);
    expect(
      canAccessRoute(
        { ...admin, permissionsLoaded: false },
        "/restaurant-dashboard",
      ),
    ).toBe(true);
    expect(
      canAccessRoute({ ...admin, permissionsLoaded: false }, "/dashboard"),
    ).toBe(false);
  });

  it("supports nested detail routes and staff restrictions", () => {
    const staff = user("RESTAURANT_STAFF", [
      "restaurant.dashboard.read",
      "restaurant.settings.read",
      "menu.read",
      "orders.read",
    ]);
    expect(canAccessRoute(staff, "/restaurant-dashboard/closed")).toBe(true);
    expect(canAccessRoute(staff, "/menu")).toBe(true);
    expect(canAccessRoute(staff, "/staff")).toBe(false);
    expect(canAccessRoute(staff, "/reports")).toBe(false);
  });
});
