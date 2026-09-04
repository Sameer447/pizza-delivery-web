"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ordersApi } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";
import { useRestaurant } from "@/providers/restaurant-provider";
import { useAuthorization } from "@/hooks/use-authorization";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState, PageLoading } from "@/components/shared/states";
import type { OrderDetail, OrderStatus } from "@/types/orders";

const next: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "BAKING",
  BAKING: "READY",
  READY: "OUT_FOR_DELIVERY",
  OUT_FOR_DELIVERY: "DELIVERED",
};
const money = (value: number, currency: string) =>
  `${currency} ${(value / 100).toLocaleString()}`;

export function LiveOrderDetails() {
  const params = useParams<{ id: string }>();
  const { selectedRestaurantId } = useRestaurant();
  const { can } = useAuthorization();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!selectedRestaurantId || !params.id) return;
    void ordersApi
      .get(selectedRestaurantId, params.id)
      .then(setOrder)
      .catch((reason: unknown) =>
        setError(
          reason instanceof ApiError ? reason.code : "Unable to load order",
        ),
      );
  }, [params.id, selectedRestaurantId]);
  if (!selectedRestaurantId)
    return <ErrorState message="No restaurant is selected." />;
  if (error) return <ErrorState message={`Unable to load order (${error}).`} />;
  if (!order) return <PageLoading />;
  const target = next[order.status];
  const update = async (status: OrderStatus) => {
    setBusy(true);
    setError(null);
    try {
      setOrder(
        await ordersApi.updateStatus(selectedRestaurantId, order.id, status),
      );
    } catch (reason: unknown) {
      setError(
        reason instanceof ApiError ? reason.code : "Unable to update order",
      );
    } finally {
      setBusy(false);
    }
  };
  const cancel = async () => {
    setBusy(true);
    setError(null);
    try {
      setOrder(
        await ordersApi.cancel(
          selectedRestaurantId,
          order.id,
          "Cancelled by restaurant administrator",
        ),
      );
    } catch (reason: unknown) {
      setError(
        reason instanceof ApiError ? reason.code : "Unable to cancel order",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1200px] space-y-6">
        <Link href="/orders" className="text-sm font-semibold text-primary">
          ← Back to orders
        </Link>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="type-label-caps text-primary">Order detail</p>
            <h1 className="type-page-title mt-2">{order.orderNumber}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Created {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            {target && can("orders.update") && (
              <Button disabled={busy} onClick={() => void update(target)}>
                Mark {target}
              </Button>
            )}
            {!["CANCELLED", "DELIVERED", "REJECTED"].includes(order.status) &&
              can("orders.update") && (
                <Button
                  className="bg-destructive text-white hover:bg-destructive/90"
                  disabled={busy}
                  onClick={() => void cancel()}
                >
                  Cancel order
                </Button>
              )}
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{order.customer.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.customer.phone ?? "No phone"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fulfillment</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.fulfillmentType}</p>
              <p className="text-sm text-muted-foreground">
                Payment: {order.paymentStatus}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-primary">{order.status}</p>
              <p className="text-sm text-muted-foreground">
                {order.itemCount} items
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Order items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {order.items.map((item, index) => (
              <div
                className="rounded border p-3 text-sm"
                key={String(item.id ?? index)}
              >
                {Object.entries(item)
                  .filter(([key]) => !["id", "orderId"].includes(key))
                  .map(([key, value]) => (
                    <p key={key}>
                      <span className="font-medium">{key}: </span>
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)}
                    </p>
                  ))}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Totals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <strong>{money(order.subtotalMinor, order.currency)}</strong>
            </p>
            <p className="flex justify-between">
              <span>Delivery</span>
              <strong>{money(order.deliveryFeeMinor, order.currency)}</strong>
            </p>
            <p className="flex justify-between">
              <span>Tax</span>
              <strong>{money(order.taxMinor, order.currency)}</strong>
            </p>
            <p className="flex justify-between">
              <span>Discount</span>
              <strong>-{money(order.discountMinor, order.currency)}</strong>
            </p>
            <p className="flex justify-between border-t pt-2 text-base">
              <span>Total</span>
              <strong>{money(order.totalMinor, order.currency)}</strong>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status history</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {order.statusHistory.map((event) => (
              <div
                className="border-l-2 border-primary pl-3 text-sm"
                key={event.id}
              >
                <p className="font-semibold">{event.status}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.createdAt).toLocaleString()}{" "}
                  {event.note ? `· ${event.note}` : ""}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
