import { apiClient } from "@/lib/api/client";
import type { ApiSuccess, PaginatedData } from "@/types/api";
import type {
  Administrator,
  AdministratorListParams,
  InviteAdministratorRequest,
  UpdateAdministratorRequest,
} from "@/types/administrations";

export const administrationsApi = {
  list: async (params: AdministratorListParams = {}) =>
    (
      await apiClient.get<ApiSuccess<PaginatedData<Administrator>>>(
        "/administrations",
        { params },
      )
    ).data.data,
  getById: async (id: string) =>
    (await apiClient.get<ApiSuccess<Administrator>>(`/administrations/${id}`))
      .data.data,
  invite: async (body: InviteAdministratorRequest) =>
    (
      await apiClient.post<ApiSuccess<Administrator>>(
        "/administrations/invitations",
        body,
      )
    ).data.data,
  update: async (id: string, body: UpdateAdministratorRequest) =>
    (
      await apiClient.patch<ApiSuccess<Administrator>>(
        `/administrations/${id}`,
        body,
      )
    ).data.data,
  updateStatus: async (id: string, status: "ACTIVE" | "SUSPENDED") =>
    (
      await apiClient.patch<ApiSuccess<Administrator>>(
        `/administrations/${id}/status`,
        { status },
      )
    ).data.data,
};
