import { apiClient } from "@/lib/api/client";
import type { ApiSuccess } from "@/types/api";
import type {
  AvailabilitySettings,
  CreateClosureRequest,
  DeliverySettings,
  NotificationSettings,
  OperatingHoursSettings,
  OperationalAlert,
  OrderSettings,
  PickupSettings,
  RestaurantDashboardSummary,
  UpdateAvailabilityRequest,
} from "@/types/restaurant-dashboard";

const path = (restaurantId: string, suffix: string) =>
  `/restaurants/${restaurantId}/dashboard${suffix}`;

export const restaurantDashboardApi = {
  overview: async (
    restaurantId: string,
    params?: { from?: string; to?: string },
  ) =>
    (
      await apiClient.get<ApiSuccess<RestaurantDashboardSummary>>(
        path(restaurantId, "/overview"),
        { params },
      )
    ).data.data,
  getOperatingHours: async (restaurantId: string) =>
    (
      await apiClient.get<ApiSuccess<OperatingHoursSettings>>(
        path(restaurantId, "/settings/operating-hours"),
      )
    ).data.data,
  updateOperatingHours: async (
    restaurantId: string,
    body: OperatingHoursSettings,
  ) =>
    (
      await apiClient.put<ApiSuccess<OperatingHoursSettings>>(
        path(restaurantId, "/settings/operating-hours"),
        body,
      )
    ).data.data,
  createClosure: async (restaurantId: string, body: CreateClosureRequest) =>
    (
      await apiClient.post<
        ApiSuccess<OperatingHoursSettings["specialClosures"][number]>
      >(path(restaurantId, "/settings/closures"), body)
    ).data.data,
  deleteClosure: async (restaurantId: string, closureId: string) => {
    await apiClient.delete(
      path(restaurantId, `/settings/closures/${closureId}`),
    );
  },
  getDelivery: async (restaurantId: string) =>
    (
      await apiClient.get<ApiSuccess<DeliverySettings>>(
        path(restaurantId, "/settings/delivery"),
      )
    ).data.data,
  updateDelivery: async (restaurantId: string, body: DeliverySettings) =>
    (
      await apiClient.put<ApiSuccess<DeliverySettings>>(
        path(restaurantId, "/settings/delivery"),
        body,
      )
    ).data.data,
  getPickup: async (restaurantId: string) =>
    (
      await apiClient.get<ApiSuccess<PickupSettings>>(
        path(restaurantId, "/settings/pickup"),
      )
    ).data.data,
  updatePickup: async (restaurantId: string, body: PickupSettings) =>
    (
      await apiClient.put<ApiSuccess<PickupSettings>>(
        path(restaurantId, "/settings/pickup"),
        body,
      )
    ).data.data,
  getOrders: async (restaurantId: string) =>
    (
      await apiClient.get<ApiSuccess<OrderSettings>>(
        path(restaurantId, "/settings/orders"),
      )
    ).data.data,
  updateOrders: async (restaurantId: string, body: OrderSettings) =>
    (
      await apiClient.put<ApiSuccess<OrderSettings>>(
        path(restaurantId, "/settings/orders"),
        body,
      )
    ).data.data,
  getNotifications: async (restaurantId: string) =>
    (
      await apiClient.get<ApiSuccess<NotificationSettings>>(
        path(restaurantId, "/settings/notifications"),
      )
    ).data.data,
  updateNotifications: async (
    restaurantId: string,
    body: NotificationSettings,
  ) =>
    (
      await apiClient.put<ApiSuccess<NotificationSettings>>(
        path(restaurantId, "/settings/notifications"),
        body,
      )
    ).data.data,
  getAvailability: async (restaurantId: string) =>
    (
      await apiClient.get<ApiSuccess<AvailabilitySettings>>(
        path(restaurantId, "/settings/availability"),
      )
    ).data.data,
  updateAvailability: async (
    restaurantId: string,
    body: UpdateAvailabilityRequest,
  ) =>
    (
      await apiClient.patch<ApiSuccess<AvailabilitySettings>>(
        path(restaurantId, "/settings/availability"),
        body,
      )
    ).data.data,
  listAlerts: async (restaurantId: string, params?: { resolved?: boolean }) =>
    (
      await apiClient.get<ApiSuccess<OperationalAlert[]>>(
        path(restaurantId, "/alerts"),
        { params },
      )
    ).data.data,
  resolveAlert: async (restaurantId: string, alertId: string) =>
    (
      await apiClient.post<ApiSuccess<OperationalAlert>>(
        path(restaurantId, `/alerts/${alertId}/resolve`),
      )
    ).data.data,
};
