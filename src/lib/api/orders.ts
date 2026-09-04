import { apiClient } from "@/lib/api/client";
import type { ApiSuccess, PaginatedData } from "@/types/api";
import type {
  OrderDetail,
  OrderStatus,
  OrderSummary,
  PaymentStatus,
  FulfillmentType,
} from "@/types/orders";

const base = (restaurantId: string) => `/restaurants/${restaurantId}/orders`;
export const ordersApi = {
  list: async (
    restaurantId: string,
    params: {
      page?: number;
      pageSize?: number;
      search?: string;
      status?: OrderStatus;
      paymentStatus?: PaymentStatus;
      fulfillmentType?: FulfillmentType;
      sort?: "createdAt" | "totalMinor" | "status";
      direction?: "asc" | "desc";
    } = {},
  ) =>
    (
      await apiClient.get<ApiSuccess<PaginatedData<OrderSummary>>>(
        base(restaurantId),
        { params },
      )
    ).data.data,
  get: async (restaurantId: string, orderId: string) =>
    (
      await apiClient.get<ApiSuccess<OrderDetail>>(
        `${base(restaurantId)}/${orderId}`,
      )
    ).data.data,
  updateStatus: async (
    restaurantId: string,
    orderId: string,
    status: OrderStatus,
    note?: string,
  ) =>
    (
      await apiClient.patch<ApiSuccess<OrderDetail>>(
        `${base(restaurantId)}/${orderId}/status`,
        { status, note },
      )
    ).data.data,
  cancel: async (restaurantId: string, orderId: string, reason: string) =>
    (
      await apiClient.post<ApiSuccess<OrderDetail>>(
        `${base(restaurantId)}/${orderId}/cancel`,
        { reason },
      )
    ).data.data,
};
