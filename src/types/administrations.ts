import type { UserRole } from "@/types/auth";

export type AdministratorStatus = "ACTIVE" | "PENDING" | "SUSPENDED";

export type Administrator = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  permissions: string[];
  restaurantIds: string[];
  status: AdministratorStatus;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdministratorListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: UserRole;
  status?: AdministratorStatus;
  restaurantId?: string;
};

export type InviteAdministratorRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: Exclude<UserRole, "CUSTOMER">;
  restaurantIds: string[];
  permissions?: string[];
};

export type UpdateAdministratorRequest = {
  role?: Exclude<UserRole, "CUSTOMER">;
  restaurantIds?: string[];
  permissions?: string[];
};
