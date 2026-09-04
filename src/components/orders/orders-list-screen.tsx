"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bike,
  ChevronDown,
  CircleDot,
  CookingPot,
  Download,
  FileText,
  MoreVertical,
  PackageCheck,
  RotateCcw,
  Search,
  ShoppingBag,
  TrendingUp,
  Utensils,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type OrderStatus =
  | "NEW ORDER"
  | "Confirmed"
  | "Preparing (Line B)"
  | "Baking (Oven #2)"
  | "Ready (Counter 1)"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";
type Order = {
  id: string;
  customer: string;
  phone: string;
  items: string;
  detail: string;
  amount: string;
  type: "Delivery" | "Pickup";
  payment: string;
  status: OrderStatus;
  time: string;
  delayed?: boolean;
};

const initialOrders: Order[] = [
  {
    id: "#10486",
    customer: "Hamza Malik",
    phone: "+92 300 9876543",
    items: "Chicken Tikka (Lrg) ×2, Garlic Bread ×1",
    detail: "2 unique items (3 total)",
    amount: "Rs. 2,948",
    type: "Delivery",
    payment: "Pending (COD)",
    status: "NEW ORDER",
    time: "1 min ago",
  },
  {
    id: "#10485",
    customer: "Sara Ali",
    phone: "+92 321 4567890",
    items: "Pepperoni Supreme (Med) ×1, Truffle Fries ×2",
    detail: "3 unique items",
    amount: "Rs. 2,150",
    type: "Pickup",
    payment: "Paid (Card)",
    status: "Confirmed",
    time: "4 min ago",
  },
  {
    id: "#10484",
    customer: "Ahmed Khan",
    phone: "+92 300 1234567",
    items: "Chicken Tikka (Lrg, Cheese Burst) ×1, Molten Cake ×1",
    detail: "Prep station: Pizza Make Line B",
    amount: "Rs. 1,840",
    type: "Delivery",
    payment: "Paid (Online)",
    status: "Preparing (Line B)",
    time: "11 min ago",
  },
  {
    id: "#10483",
    customer: "Usman Tariq",
    phone: "+92 333 7891234",
    items: "Classic Margherita (Med) ×2, Wings (8pc) ×1, Coke 1.5L",
    detail: "Oven 2 (Top Chamber, 380°C)",
    amount: "Rs. 3,420",
    type: "Delivery",
    payment: "Pending (COD)",
    status: "Baking (Oven #2)",
    time: "18 min ago",
    delayed: true,
  },
  {
    id: "#10482",
    customer: "Bilal Sheikh",
    phone: "+92 345 6789012",
    items: "BBQ Chicken Feast (Lrg) ×1",
    detail: "Waiting at pickup staging shelf",
    amount: "Rs. 1,650",
    type: "Pickup",
    payment: "Paid (Card)",
    status: "Ready (Counter 1)",
    time: "24 min ago",
  },
  {
    id: "#10481",
    customer: "Fatima Noor",
    phone: "+92 312 3456789",
    items: "Veggie Lovers (Med) ×1, Cheesy Garlic Bread ×1",
    detail: "Rider: Tariq J. (Ph: 0302-5551234)",
    amount: "Rs. 1,980",
    type: "Delivery",
    payment: "Paid (Online)",
    status: "Out for Delivery",
    time: "32 min ago",
  },
  {
    id: "#10480",
    customer: "Zayd Omer",
    phone: "+92 301 2345678",
    items: "Pepperoni (Lrg) ×1, Meat Craver (Lrg) ×1, Sprite 1.5L",
    detail: "Completed in 28 mins total",
    amount: "Rs. 3,850",
    type: "Delivery",
    payment: "Paid (COD)",
    status: "Delivered",
    time: "52 min ago",
  },
  {
    id: "#10479",
    customer: "Ayesha Siddiqui",
    phone: "+92 322 8765432",
    items: "Truffle Mushroom (Med) ×1",
    detail: "Customer requested cancellation",
    amount: "Rs. 1,499",
    type: "Delivery",
    payment: "Refunded",
    status: "Cancelled",
    time: "1h ago",
  },
];

const statusOptions = [
  "All",
  "NEW ORDER",
  "Confirmed",
  "Preparing (Line B)",
  "Baking (Oven #2)",
  "Ready (Counter 1)",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function SelectFilter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 appearance-none rounded-[var(--radius-lg)] bg-surface px-3 pr-8 text-xs font-medium outline-none hover:bg-surface-high focus:ring-2 focus:ring-primary/20"
      >
        <option>{label}: All</option>
        {options
          .filter((option) => option !== "All")
          .map((option) => (
            <option key={option}>{option}</option>
          ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
    </label>
  );
}

function StatusPill({ status }: { status: OrderStatus }) {
  const isNew = status === "NEW ORDER";
  const isError = status === "Cancelled";
  const isNeutral =
    status === "Baking (Oven #2)" || status === "Out for Delivery";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        isNew
          ? "bg-primary text-white shadow-sm"
          : isError
            ? "bg-destructive/10 text-destructive"
            : isNeutral
              ? "bg-primary/10 text-primary"
              : "bg-success/10 text-success",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isNew
            ? "bg-white"
            : isError
              ? "bg-destructive"
              : isNeutral
                ? "bg-primary"
                : "bg-success",
        )}
      />
      {status}
    </span>
  );
}

function nextAction(status: OrderStatus) {
  if (status === "NEW ORDER") return "Accept";
  if (status === "Confirmed") return "Start Prep";
  if (status === "Preparing (Line B)") return "Mark Baking";
  if (status === "Baking (Oven #2)") return "Mark Ready";
  if (status === "Ready (Counter 1)") return "Mark Picked Up";
  if (status === "Out for Delivery") return "Complete Delivery";
  if (status === "Delivered") return "View Receipt";
  return "View Reason";
}

function advanceOrder(status: OrderStatus): OrderStatus {
  const sequence: OrderStatus[] = [
    "NEW ORDER",
    "Confirmed",
    "Preparing (Line B)",
    "Baking (Oven #2)",
    "Ready (Counter 1)",
    "Out for Delivery",
    "Delivered",
  ];
  const index = sequence.indexOf(status);
  return index >= 0 && index < sequence.length - 1
    ? sequence[index + 1]
    : status;
}

export function OrdersListScreen() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [payment, setPayment] = useState("All");
  const [view, setView] = useState("All");
  const [pollingVisible, setPollingVisible] = useState(true);
  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const haystack =
          `${order.id} ${order.customer} ${order.phone} ${order.items}`.toLowerCase();
        const matchesView =
          view === "All" ||
          (view === "Pending Action"
            ? order.status === "NEW ORDER"
            : view === "Live in Kitchen"
              ? ["Preparing (Line B)", "Baking (Oven #2)"].includes(
                  order.status,
                )
              : order.status === "Out for Delivery");
        return (
          haystack.includes(search.toLowerCase()) &&
          (status === "All" || order.status === status) &&
          (type === "All" || order.type === type) &&
          (payment === "All" || order.payment.includes(payment)) &&
          matchesView
        );
      }),
    [orders, payment, search, status, type, view],
  );
  const updateOrder = (id: string) =>
    setOrders((items) =>
      items.map((order) =>
        order.id === id
          ? {
              ...order,
              status: advanceOrder(order.status),
              payment:
                order.status === "NEW ORDER"
                  ? order.payment.replace("Pending", "Pending")
                  : order.payment,
            }
          : order,
      ),
    );
  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setType("All");
    setPayment("All");
    setView("All");
  };

  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span>Dashboard</span>
              <span>/</span>
              <span className="font-semibold text-foreground">Orders</span>
              <span className="ml-2 rounded-full bg-surface-high px-2 py-0.5 text-[10px]">
                Pizza House #402
              </span>
            </div>
            <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight lg:text-3xl">
              Orders
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                Live Stream Active
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              View and manage incoming, active, and completed orders for Pizza
              House.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                window.alert(
                  "CSV export is ready to connect to the reports export API.",
                )
              }
              className="inline-flex items-center gap-2 rounded-lg bg-surface-lowest px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-surface-high"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <Link
              href="/orders/kitchen"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-container"
            >
              <Utensils className="h-4 w-4" />
              Open Live Kitchen
            </Link>
          </div>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Today's Orders", "126", "+14%", "vs. 110 yesterday", FileText],
            [
              "Pending",
              "8",
              "Needs Confirmation",
              "Avg response: 1.4m",
              CircleDot,
            ],
            [
              "Preparing & Baking",
              "14",
              "Live in Kitchen",
              "6 prep • 8 in ovens",
              CookingPot,
            ],
            [
              "Ready",
              "5",
              "Ready to Hand Off",
              "Awaiting rider / pickup",
              PackageCheck,
            ],
            ["Out for Delivery", "9", "En Route", "Avg ETA: 19 mins", Bike],
          ].map(([title, value, badge, detail, Icon], index) => {
            const StatIcon = Icon as typeof FileText;
            return (
              <Card
                key={title as string}
                className={cn(
                  "p-4 shadow-sm",
                  index === 1 &&
                    "bg-gradient-to-tr from-surface-lowest via-surface-lowest to-surface-high/40",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="type-label-caps text-muted-foreground">
                    {title as string}
                  </span>
                  <StatIcon
                    className={cn(
                      "h-5 w-5",
                      index === 1
                        ? "text-primary"
                        : index === 3
                          ? "text-success"
                          : "text-muted-foreground",
                    )}
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span
                    className={cn(
                      "text-3xl font-bold tracking-tight",
                      index === 1 && "text-primary",
                    )}
                  >
                    {value as string}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      index === 1
                        ? "bg-primary/10 text-primary"
                        : index === 3
                          ? "bg-success/10 text-success"
                          : "bg-surface-high text-muted-foreground",
                    )}
                  >
                    {badge as string}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-muted-foreground">
                  {detail as string}
                </div>
              </Card>
            );
          })}
        </div>
        <Card className="space-y-4 p-4">
          <div className="flex flex-col items-stretch justify-between gap-3 lg:flex-row lg:items-center">
            <div className="relative min-w-[280px] flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-10 bg-surface pl-10"
                placeholder="Search order #, customer name, or phone..."
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <SelectFilter
                label="Status"
                options={statusOptions}
                value={status === "All" ? "Status: All" : status}
                onChange={(value) => setStatus(value.replace("Status: ", ""))}
              />
              <SelectFilter
                label="Order Type"
                options={["Delivery", "Pickup"]}
                value={type}
                onChange={(value) => setType(value.replace("Order Type: ", ""))}
              />
              <SelectFilter
                label="Payment"
                options={["COD", "Paid", "Refunded"]}
                value={payment}
                onChange={(value) => setPayment(value.replace("Payment: ", ""))}
              />
              <SelectFilter
                label="Timeframe"
                options={["Last 24 Hours", "Yesterday", "Custom Date"]}
                value="All"
                onChange={() => undefined}
              />
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-lg bg-surface p-2 text-muted-foreground hover:bg-surface-high"
                aria-label="Reset filters"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="type-label-caps mr-1 text-muted-foreground">
              Views:
            </span>
            {[
              "All",
              "Pending Action",
              "Live in Kitchen",
              "Out for Delivery",
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 font-semibold",
                  view === item
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-high text-foreground hover:bg-surface-highest",
                )}
              >
                {item}
                {item === "All"
                  ? " (126)"
                  : item === "Pending Action"
                    ? " (8)"
                    : item === "Live in Kitchen"
                      ? " (14)"
                      : " (9)"}
              </button>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-left">
              <thead className="bg-surface-low text-muted-foreground">
                <tr>
                  {[
                    "Order ID",
                    "Customer",
                    "Order Items",
                    "Amount",
                    "Type",
                    "Payment",
                    "Status",
                    "Time / Elapsed",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="type-table-header px-4 py-3.5">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className={cn(
                      "text-sm transition-colors hover:bg-surface",
                      order.status === "NEW ORDER" && "bg-primary/5",
                      order.status === "Baking (Oven #2)" &&
                        "bg-surface-high/30",
                      order.status === "Cancelled" && "opacity-75",
                    )}
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-primary">
                      {order.status === "NEW ORDER" && (
                        <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
                      )}
                      {order.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="whitespace-nowrap font-semibold">
                        {order.customer}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {order.phone}
                      </div>
                    </td>
                    <td className="min-w-[220px] px-4 py-3">
                      <div
                        className={cn(
                          "text-xs font-medium",
                          order.status === "Cancelled" && "line-through",
                        )}
                      >
                        {order.items}
                      </div>
                      <div
                        className={cn(
                          "text-[11px] text-muted-foreground",
                          order.status === "Cancelled" && "text-destructive",
                        )}
                      >
                        {order.detail}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono font-bold">
                      {order.amount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-high px-2 py-0.5 text-xs font-semibold">
                        {order.type === "Delivery" ? (
                          <Bike className="h-3.5 w-3.5" />
                        ) : (
                          <ShoppingBag className="h-3.5 w-3.5" />
                        )}
                        {order.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-xs font-semibold",
                          order.payment === "Refunded"
                            ? "bg-destructive/10 text-destructive"
                            : order.payment.includes("Paid")
                              ? "bg-success/10 text-success"
                              : "bg-surface-high text-muted-foreground",
                        )}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusPill status={order.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={cn(
                          "font-mono text-xs",
                          order.status === "NEW ORDER" &&
                            "font-bold text-primary",
                        )}
                      >
                        {order.time}
                      </span>
                      {order.delayed && (
                        <span className="ml-1 rounded bg-primary/10 px-1 py-0.5 text-[10px] font-bold text-primary">
                          +3m
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        {order.status !== "Cancelled" &&
                        order.status !== "Delivered" ? (
                          <button
                            type="button"
                            onClick={() => updateOrder(order.id)}
                            className={cn(
                              "rounded px-2.5 py-1.5 text-xs font-semibold transition-all",
                              order.status === "NEW ORDER"
                                ? "bg-primary text-white hover:bg-primary-container"
                                : order.status === "Ready (Counter 1)"
                                  ? "bg-success text-white"
                                  : "bg-surface-high hover:bg-surface-highest",
                            )}
                          >
                            {nextAction(order.status)}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="rounded bg-surface-high px-2.5 py-1.5 text-xs font-semibold hover:bg-surface-highest"
                          >
                            {nextAction(order.status)}
                          </button>
                        )}
                        <button
                          type="button"
                          className="rounded p-1.5 text-muted-foreground hover:bg-surface-high"
                          aria-label={`More actions for ${order.id}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 bg-surface-low p-4 text-xs text-muted-foreground sm:flex-row">
            <span>
              Showing{" "}
              <b className="text-foreground">1-{filteredOrders.length}</b> of{" "}
              <b className="text-foreground">126</b> orders
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled
                className="rounded bg-surface-lowest px-2.5 py-1.5 font-medium disabled:opacity-50"
              >
                Previous
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded font-medium",
                    page === 1
                      ? "bg-primary font-bold text-white"
                      : "bg-surface-lowest hover:bg-surface-high",
                  )}
                >
                  {page}
                </button>
              ))}
              <span className="px-1">...</span>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded bg-surface-lowest"
              >
                16
              </button>
              <button
                type="button"
                className="rounded bg-surface-lowest px-2.5 py-1.5 font-medium hover:bg-surface-high"
              >
                Next
              </button>
            </div>
          </div>
        </Card>
        <div className="grid gap-4 pb-12 lg:grid-cols-3">
          <Card className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <span className="type-label-caps text-muted-foreground">
                Peak Rush Velocity
              </span>
              <span className="text-xs font-bold text-primary">
                Lunch Peak Active
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">22 orders/hr</span>
              <span className="text-xs font-semibold text-success">
                +18% above target
              </span>
            </div>
            <div className="flex h-14 items-end gap-1.5 pt-2">
              {[30, 45, 65, 85, 100, 70, 40].map((height, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-1 rounded-t",
                    index === 4
                      ? "bg-primary"
                      : index === 3
                        ? "bg-primary/40"
                        : "bg-surface-high",
                  )}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>10:00 AM</span>
              <span>CURRENT</span>
              <span>04:00 PM</span>
            </div>
          </Card>
          <Card className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <span className="type-label-caps text-muted-foreground">
                Kitchen Bottleneck Monitor
              </span>
              <span className="text-[11px] font-medium text-success">
                All Stations Normal
              </span>
            </div>
            {[
              ["Oven Deck #1 & #2", "8 / 10 slots (80%)", 80, "bg-primary"],
              ["Prep & Topping Table", "6 tickets (60%)", 60, "bg-success"],
              ["Fryer / Sides Station", "3 baskets (30%)", 30, "bg-secondary"],
            ].map(([name, value, width, color]) => (
              <div key={name as string}>
                <div className="mb-1 flex justify-between text-xs font-medium">
                  <span>{name as string}</span>
                  <span className="font-mono">{value as string}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-high">
                  <div
                    className={cn("h-full rounded-full", color as string)}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            ))}
          </Card>
          <Card className="flex flex-col justify-between space-y-3 p-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="type-label-caps text-muted-foreground">
                  Active Courier Fleet
                </span>
                <span className="font-mono text-xs font-semibold">
                  5 Riders Available
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-high text-primary">
                  <Bike className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-bold">
                    In-House Fleet (Branch 402)
                  </div>
                  <div className="text-xs text-muted-foreground">
                    4 active drops • avg turnaround 24m
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                className="flex-1 rounded-lg bg-surface-high py-1.5 text-xs font-semibold hover:bg-surface-highest"
              >
                Rider Live Map
              </button>
              <button
                type="button"
                className="flex-1 rounded-lg bg-surface-high py-1.5 text-xs font-semibold hover:bg-surface-highest"
              >
                Assign Riders
              </button>
            </div>
          </Card>
        </div>
        {pollingVisible && (
          <aside className="fixed bottom-5 right-6 z-50 flex items-center gap-3 rounded-xl bg-inverse-surface px-4 py-3 text-inverse-on-surface shadow-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="pr-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                LIVE POLLING ACTIVE
                <span className="h-2 w-2 rounded-full bg-success" />
              </div>
              <div className="text-[11px] text-muted-foreground">
                Order socket synchronized • Branch #402
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPollingVisible(false)}
              className="p-1 text-muted-foreground hover:text-white"
              aria-label="Dismiss polling banner"
            >
              <X className="h-4 w-4" />
            </button>
          </aside>
        )}
      </div>
    </div>
  );
}
