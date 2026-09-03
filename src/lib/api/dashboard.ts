import { apiClient } from "@/lib/api/client";
import type { ApiSuccess } from "@/types/api";
import type { DashboardOverview } from "@/types/dashboard";

export const dashboardApi = {
  overview: async (params?: {
    restaurantId?: string;
    from?: string;
    to?: string;
  }) =>
    (
      await apiClient.get<ApiSuccess<DashboardOverview>>(
        "/dashboard/overview",
        { params },
      )
    ).data.data,
};
