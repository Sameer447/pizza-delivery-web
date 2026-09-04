"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ordersApi } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";
import { useRestaurant } from "@/providers/restaurant-provider";
import { useAuthorization } from "@/hooks/use-authorization";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ErrorState, PageLoading } from "@/components/shared/states";
import type {
  OrderStatus,
  OrderSummary,
  PaymentStatus,
  FulfillmentType,
} from "@/types/orders";

const statuses: Array<OrderStatus | "ALL"> = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "BAKING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "REJECTED",
];
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

export function LiveOrdersScreen() {
  const { selectedRestaurantId } = useRestaurant();
  const { can } = useAuthorization();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | "ALL">(
    "ALL",
  );
  const [fulfillmentType, setFulfillmentType] = useState<
    FulfillmentType | "ALL"
  >("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const load = useCallback(async () => {
    if (!selectedRestaurantId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await ordersApi.list(selectedRestaurantId, {
        page: 1,
        pageSize: 100,
        search: search || undefined,
        status: status === "ALL" ? undefined : status,
        paymentStatus: paymentStatus === "ALL" ? undefined : paymentStatus,
        fulfillmentType:
          fulfillmentType === "ALL" ? undefined : fulfillmentType,
      });
      setOrders(result.items);
    } catch (reason: unknown) {
      setError(
        reason instanceof ApiError ? reason.code : "Unable to load orders",
      );
    } finally {
      setLoading(false);
    }
  }, [fulfillmentType, paymentStatus, search, selectedRestaurantId, status]);
  useEffect(() => {
    void load();
  }, [load]);
  const update = async (order: OrderSummary, target: OrderStatus) => {
    if (!selectedRestaurantId || !can("orders.update")) return;
    setBusy(order.id);
    setError(null);
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
  if (!selectedRestaurantId)
    return <ErrorState message="No restaurant is selected." />;
  if (loading && !orders.length) return <PageLoading />;
  if (error && !orders.length)
    return <ErrorState message={`Unable to load orders (${error}).`} />;
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="type-label-caps text-primary">
              Tenant-scoped operations
            </p>
            <h1 className="type-page-title mt-2">Orders</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Live orders for the selected restaurant. Every query and mutation
              is authorized by the backend.
            </p>
          </div>
          <Link href="/orders/kitchen">
            <Button>Open kitchen</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="flex flex-wrap gap-3 p-4">
            <Input
              className="max-w-sm"
              placeholder="Search order or customer"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className="h-10 rounded border bg-surface-lowest px-3 text-sm"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as OrderStatus | "ALL")
              }
            >
              <option value="ALL">All statuses</option>
              {statuses.slice(1).map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            <select
              className="h-10 rounded border bg-surface-lowest px-3 text-sm"
              value={paymentStatus}
              onChange={(event) =>
                setPaymentStatus(event.target.value as PaymentStatus | "ALL")
              }
            >
              <option value="ALL">All payments</option>
              {["PENDING", "AUTHORIZED", "PAID", "FAILED", "REFUNDED"].map(
                (value) => (
                  <option key={value}>{value}</option>
                ),
              )}
            </select>
            <select
              className="h-10 rounded border bg-surface-lowest px-3 text-sm"
              value={fulfillmentType}
              onChange={(event) =>
                setFulfillmentType(
                  event.target.value as FulfillmentType | "ALL",
                )
              }
            >
              <option value="ALL">All fulfillment</option>
              <option>DELIVERY</option>
              <option>PICKUP</option>
            </select>
          </CardContent>
        </Card>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-surface-low">
                <tr>
                  {[
                    "Order",
                    "Customer",
                    "Fulfillment",
                    "Payment",
                    "Total",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th className="px-4 py-3" key={heading}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-4">
                      <Link
                        className="font-semibold text-primary hover:underline"
                        href={`/orders/${order.id}`}
                      >
                        {order.orderNumber}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      {order.customer.name}
                      <p className="text-xs text-muted-foreground">
                        {order.customer.phone ?? "No phone"}
                      </p>
                    </td>
                    <td className="px-4 py-4">{order.fulfillmentType}</td>
                    <td className="px-4 py-4">{order.paymentStatus}</td>
                    <td className="px-4 py-4 font-semibold">
                      {money(order.totalMinor, order.currency)}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {next[order.status] && (
                        <Button
                          className="h-8 px-3 text-xs"
                          disabled={busy === order.id}
                          onClick={() =>
                            void update(
                              order,
                              next[order.status] as OrderStatus,
                            )
                          }
                        >
                          {busy === order.id
                            ? "Saving…"
                            : `Mark ${next[order.status]}`}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {!orders.length && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
