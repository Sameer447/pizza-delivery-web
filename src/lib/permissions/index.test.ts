import { describe, expect, it } from "vitest";
import { can, hasRole } from "@/lib/permissions";
import type { CurrentUser } from "@/types/auth";
const user: CurrentUser = { id: "1", email: "admin@example.com", firstName: "Ada", lastName: "Admin", role: "SUPER_ADMIN", isActive: true, permissions: ["restaurants.create"], memberships: [] };
describe("permission helpers", () => { it("checks explicit permissions", () => { expect(can(user, "restaurants.create")).toBe(true); expect(can(user, "orders.read")).toBe(false); }); it("checks primary and assigned roles", () => { expect(hasRole(user, "SUPER_ADMIN")).toBe(true); expect(hasRole(user, "RESTAURANT_ADMIN")).toBe(false); }); });
