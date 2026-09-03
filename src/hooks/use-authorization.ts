"use client";

import { can, canAny, hasAnyRole, hasRole } from "@/lib/permissions";
import { useAuth } from "@/providers/auth-provider";
import type { Permission, UserRole } from "@/types/auth";

export function useAuthorization() {
  const { user } = useAuth();
  return {
    user,
    can: (permission: Permission) => can(user, permission),
    canAny: (permissions: Permission[]) => canAny(user, permissions),
    hasRole: (role: UserRole) => hasRole(user, role),
    hasAnyRole: (roles: UserRole[]) => hasAnyRole(user, roles),
  };
}
