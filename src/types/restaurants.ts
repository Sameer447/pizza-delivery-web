export type RestaurantStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type Restaurant = {
  id: string;
  name: string;
  slug: string;
  cuisine: string | null;
  phone: string | null;
  email: string | null;
  supportContact: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  currency: string;
  taxRate: number;
  deliveryRadius: number;
  autoAccept: boolean;
  status: RestaurantStatus;
  createdAt: string;
  updatedAt: string;
};

export type RestaurantListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: RestaurantStatus;
  sortBy?: "createdAt" | "name";
  sortOrder?: "asc" | "desc";
};

export type CreateRestaurantRequest = {
  name: string;
  slug: string;
  cuisine?: string;
  phone?: string;
  email?: string;
  supportContact?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  currency: string;
  taxRate: number;
  deliveryRadius: number;
  autoAccept: boolean;
};

export type UpdateRestaurantRequest = Partial<CreateRestaurantRequest>;
