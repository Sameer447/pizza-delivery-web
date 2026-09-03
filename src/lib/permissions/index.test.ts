import { describe, expect, it } from "vitest";
import {
  can,
  canAny,
  hasAllPermissions,
  hasAnyRole,
  hasRole,
} from "@/lib/permissions";
import type { CurrentUser } from "@/types/auth";
const user: CurrentUser = {
  id: "1",
  name: "Ada Admin",
  email: "admin@example.com",
  phone: null,
  firstName: "Ada",
  lastName: "Admin",
  role: "SUPER_ADMIN",
  isActive: true,
  permissions: ["restaurants.create", "restaurants.read", "orders.read"],
  memberships: [],
  permissionsLoaded: true,
};
describe("permission helpers", () => {
  it("checks explicit permissions", () => {
    expect(can(user, "restaurants.create")).toBe(true);
    expect(can(user, "orders.read")).toBe(true);
    expect(can(user, "menu.read")).toBe(false);
  });
  it("checks primary and assigned roles", () => {
    expect(hasRole(user, "SUPER_ADMIN")).toBe(true);
    expect(hasRole(user, "RESTAURANT_ADMIN")).toBe(false);
    expect(hasAnyRole(user, ["RESTAURANT_ADMIN", "SUPER_ADMIN"])).toBe(true);
  });
  it("checks permission groups", () => {
    expect(
      hasAllPermissions(user, ["restaurants.read", "restaurants.create"]),
    ).toBe(true);
    expect(canAny(user, ["menu.read", "restaurants.read"])).toBe(true);
  });
});
