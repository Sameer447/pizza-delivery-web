"use client";

import { useCallback, useEffect, useState } from "react";
import { ordersApi } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";
import { useRestaurant } from "@/providers/restaurant-provider";
import { useAuthorization } from "@/hooks/use-authorization";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState, PageLoading } from "@/components/shared/states";
import type { OrderStatus, OrderSummary } from "@/types/orders";

const stages: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "BAKING",
  "READY",
  "OUT_FOR_DELIVERY",
];
const next: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "BAKING",
  BAKING: "READY",
  READY: "OUT_FOR_DELIVERY",
  OUT_FOR_DELIVERY: "DELIVERED",
};
export function LiveKitchenScreen() {
  const { selectedRestaurantId } = useRestaurant();
  const { can } = useAuthorization();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const load = useCallback(async () => {
    if (!selectedRestaurantId) return;
    try {
      setOrders(
        (
          await ordersApi.list(selectedRestaurantId, { page: 1, pageSize: 100 })
        ).items.filter((order) => stages.includes(order.status)),
      );
    } catch (reason: unknown) {
      setError(
        reason instanceof ApiError
          ? reason.code
          : "Unable to load kitchen orders",
      );
    }
  }, [selectedRestaurantId]);
  useEffect(() => {
    void load();
  }, [load]);
  if (!selectedRestaurantId)
    return <ErrorState message="No restaurant is selected." />;
  if (!orders.length && !error) return <PageLoading />;
  if (error && !orders.length)
    return <ErrorState message={`Unable to load kitchen orders (${error}).`} />;
  const advance = async (order: OrderSummary) => {
    const target = next[order.status];
    if (!target || !can("orders.update")) return;
    setBusy(order.id);
    try {
      const updated = await ordersApi.updateStatus(
        selectedRestaurantId,
        order.id,
        target,
      );
      setOrders((items) =>
        items.map((item) =>
          item.id === updated.id ? { ...item, ...updated } : item,
        ),
      );
    } catch (reason: unknown) {
      setError(
        reason instanceof ApiError ? reason.code : "Unable to update order",
      );
    } finally {
      setBusy(null);
    }
  };
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div>
          <p className="type-label-caps text-primary">
            Tenant-scoped operations
          </p>
          <h1 className="type-page-title mt-2">Live kitchen</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Operational order stages from the selected restaurant.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stages.map((stage) => (
            <Card key={stage}>
              <CardHeader>
                <CardTitle>{stage}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orders
                  .filter((order) => order.status === stage)
                  .map((order) => (
                    <div className="rounded border p-3" key={order.id}>
                      <div className="flex justify-between">
                        <strong>{order.orderNumber}</strong>
                        <span className="text-sm">{order.customer.name}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.itemCount} items · {order.fulfillmentType}
                      </p>
                      {next[order.status] && (
                        <Button
                          className="mt-3 h-8 px-3 text-xs"
                          disabled={busy === order.id}
                          onClick={() => void advance(order)}
                        >
                          {busy === order.id
                            ? "Saving…"
                            : `Mark ${next[order.status]}`}
                        </Button>
                      )}
                    </div>
                  ))}
                {!orders.some((order) => order.status === stage) && (
                  <p className="text-sm text-muted-foreground">No orders</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
