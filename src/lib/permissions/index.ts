import type { CurrentUser, Permission, UserRole } from "@/types/auth";
export const can = (user: CurrentUser | null, permission: Permission) => Boolean(user?.permissions.includes(permission));
export const hasRole = (user: CurrentUser | null, role: UserRole) => user?.role === role || Boolean(user?.roles?.some((item) => item.name === role));
