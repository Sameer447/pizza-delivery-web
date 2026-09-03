import type { Restaurant, RestaurantStatus } from "@/types/restaurants";

export type RestaurantDashboardSummary = {
  restaurant: Pick<Restaurant, "id" | "name" | "slug" | "status" | "currency">;
  ordersToday: number;
  revenueToday: number;
  averageOrderValue: number;
  activeCustomers: number;
  orderChangePercent: number;
  revenueChangePercent: number;
  averageOrderChangePercent: number;
  activeCustomerChangePercent: number;
  ordersRequiringAttention: Array<{
    id: string;
    itemCount: number;
    total: number;
    status: "PENDING" | "CONFIRMED" | "PREPARING" | "DELAYED";
    createdAt: string;
  }>;
  recentOrders: Array<{
    id: string;
    status: string;
    total: number;
    createdAt: string;
  }>;
  kitchenLoadPercent: number;
};

export type OperatingHour = {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isOpen: boolean;
  openingTime: string | null;
  closingTime: string | null;
  splitOpeningTime: string | null;
  splitClosingTime: string | null;
};

export type SpecialClosure = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  reason: string | null;
};

export type OperatingHoursSettings = {
  weeklySchedule: OperatingHour[];
  specialClosures: SpecialClosure[];
};

export type DeliverySettings = {
  enabled: boolean;
  radiusKm: number;
  minimumOrderValue: number;
  deliveryFee: number;
  estimatedMinutes: number;
  instructions: string | null;
};

export type PickupSettings = {
  enabled: boolean;
  instructions: string | null;
  scheduledPickupEnabled: boolean;
  estimatedMinutes: number;
};

export type OrderSettings = {
  autoAccept: boolean;
  minimumOrderValue: number;
  maximumOpenOrders: number;
  preparationTimeMinutes: number;
  scheduledOrdersEnabled: boolean;
  customerNotesEnabled: boolean;
  modifiersEnabled: boolean;
};

export type NotificationSettings = {
  orderEventsEnabled: boolean;
  delayedOrderAlertsEnabled: boolean;
  audioAlertsEnabled: boolean;
  dispatchEmail: string | null;
  dispatchPhone: string | null;
};

export type AvailabilitySettings = {
  status: RestaurantStatus;
  pauseReason: string | null;
  pausedUntil: string | null;
  customerMessage: string | null;
  upcomingClosures: SpecialClosure[];
};

export type OperationalAlert = {
  id: string;
  type: "DELAYED_ORDER" | "KITCHEN_LOAD" | "LOW_STOCK" | "SYSTEM";
  severity: "INFO" | "WARNING" | "CRITICAL";
  title: string;
  message: string;
  isResolved: boolean;
  createdAt: string;
};

export type UpdateAvailabilityRequest = {
  status: "ACTIVE" | "INACTIVE";
  pauseReason?: string;
  pausedUntil?: string | null;
  customerMessage?: string;
};

export type CreateClosureRequest = {
  title: string;
  startsAt: string;
  endsAt: string;
  reason?: string;
};
