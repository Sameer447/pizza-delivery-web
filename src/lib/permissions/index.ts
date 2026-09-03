import type { CurrentUser, Permission, UserRole } from "@/types/auth";
export const can = (user: CurrentUser | null, permission: Permission) =>
  Boolean(user?.permissions.includes(permission));
export const hasRole = (user: CurrentUser | null, role: UserRole) =>
  user?.role === role ||
  Boolean(user?.roles?.some((item) => item.name === role));
export const hasAnyRole = (user: CurrentUser | null, roles: UserRole[]) =>
  roles.some((role) => hasRole(user, role));
export const hasAllPermissions = (
  user: CurrentUser | null,
  permissions: Permission[],
) => permissions.every((permission) => can(user, permission));
export const canAny = (user: CurrentUser | null, permissions: Permission[]) =>
  permissions.some((permission) => can(user, permission));
