"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bike,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  Grid2X2,
  Home,
  PackageCheck,
  Pizza,
  Printer,
  Receipt,
  RotateCcw,
  Search,
  Store,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type HistoryOrder = {
  id: string;
  date: string;
  time: string;
  type: "Delivery" | "Pickup";
  items: string;
  note: string;
  subtotal: string;
  delivery: string;
  discount: string;
  total: string;
  payment: string;
  status: "PREPARING" | "DELIVERED";
};
const historyOrders: HistoryOrder[] = [
  {
    id: "#10482",
    date: "03 Sep 2026",
    time: "12:42 PM",
    type: "Delivery",
    items: "Chicken Tikka (Lrg) ×2, Garlic Bread ×1, Garlic Dip ×2",
    note: "Kitchen Note: Extra crispy crust, mild spice",
    subtotal: "Rs. 3,198",
    delivery: "Rs. 200",
    discount: "-Rs. 352",
    total: "Rs. 3,376",
    payment: "Pending (COD)",
    status: "PREPARING",
  },
  {
    id: "#10340",
    date: "18 Aug 2026",
    time: "08:15 PM",
    type: "Delivery",
    items: "Pepperoni Supreme (Med) ×1, Truffle Fries ×1",
    note: "Delivered in 28 mins",
    subtotal: "Rs. 2,250",
    delivery: "Rs. 200",
    discount: "Rs. 0",
    total: "Rs. 2,450",
    payment: "Paid (Online)",
    status: "DELIVERED",
  },
  {
    id: "#10192",
    date: "02 Aug 2026",
    time: "07:30 PM",
    type: "Pickup",
    items: "BBQ Chicken Pizza (Lrg) ×1, Molten Lava Cake ×2",
    note: "Self Pick Counter A",
    subtotal: "Rs. 3,120",
    delivery: "Rs. 0",
    discount: "-Rs. 300",
    total: "Rs. 2,820",
    payment: "Paid (Card)",
    status: "DELIVERED",
  },
  {
    id: "#10054",
    date: "21 Jul 2026",
    time: "01:10 PM",
    type: "Delivery",
    items: "Classic Margherita (Med) ×2, Wings (8pc) ×1",
    note: "Rider: Zubair (On-Time)",
    subtotal: "Rs. 3,420",
    delivery: "Rs. 200",
    discount: "-Rs. 340",
    total: "Rs. 3,280",
    payment: "Paid (Online)",
    status: "DELIVERED",
  },
  {
    id: "#09871",
    date: "04 Jul 2026",
    time: "09:05 PM",
    type: "Delivery",
    items: "Inferno Diablo (Lrg) ×1, Cheesy Garlic Bread ×1",
    note: "Special Instruction: Extra Spicy",
    subtotal: "Rs. 2,140",
    delivery: "Rs. 200",
    discount: "Rs. 0",
    total: "Rs. 2,340",
    payment: "Paid (Online)",
    status: "DELIVERED",
  },
  {
    id: "#09650",
    date: "19 Jun 2026",
    time: "08:40 PM",
    type: "Delivery",
    items: "Chicken Tikka (Med) ×1, Sprite 1.5L ×1",
    note: "Gate Code provided",
    subtotal: "Rs. 1,550",
    delivery: "Rs. 200",
    discount: "Rs. 0",
    total: "Rs. 1,750",
    payment: "Paid (COD)",
    status: "DELIVERED",
  },
];

function SelectBox({
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
    <label className="block">
      <span className="type-label-caps mb-1 block text-muted-foreground">
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded bg-surface-low px-3 py-1.5 pr-8 text-xs font-medium outline-none"
        >
          <option>{options[0]}</option>
          {options.slice(1).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      </span>
    </label>
  );
}

export function CustomerOrderHistoryScreen() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All Types");
  const [payment, setPayment] = useState("All Payments");
  const [status, setStatus] = useState("All Statuses");
  const [notice, setNotice] = useState("");
  const filtered = useMemo(
    () =>
      historyOrders.filter(
        (order) =>
          `${order.id} ${order.items} ${order.note} ${order.payment}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (type === "All Types" || order.type === type) &&
          (payment === "All Payments" || order.payment === payment) &&
          (status === "All Statuses" || order.status === status.toUpperCase()),
      ),
    [payment, query, status, type],
  );
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const reset = () => {
    setQuery("");
    setType("All Types");
    setPayment("All Payments");
    setStatus("All Statuses");
  };
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              <Grid2X2 className="h-3.5 w-3.5" />
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/customers" className="hover:text-primary">
              Customers
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/customers/1048"
              className="font-semibold text-foreground hover:text-primary"
            >
              Ahmed Khan
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-primary">
              Order History & Analytics
            </span>
          </nav>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              Live Profile Synced
            </span>
            <span className="text-xs text-muted-foreground">
              Client ID: #CUST-98421
            </span>
          </div>
        </div>
        <Card className="relative overflow-hidden p-6 shadow-sm">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/5 blur-2xl" />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-white shadow-md">
                AK
                <span className="absolute -bottom-1 -right-1 rounded-full bg-surface-lowest p-0.5 text-success">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Ahmed Khan
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold uppercase text-white">
                    <TrendingUp className="h-3 w-3" />
                    VIP Tier 1
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Member since Oct 2024
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <UserRound className="h-4 w-4 text-primary" />
                    ahmed.khan@email.com
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <PhoneIcon />
                    +92 300 1234567
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Home className="h-4 w-4" />
                    DHA Phase 6, Sector J, Lahore
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/customers/1048"
                className="inline-flex items-center gap-1.5 rounded bg-surface-high px-3.5 py-2 text-xs font-semibold"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Customer Profile
              </Link>
              <button
                type="button"
                onClick={() => notify("Order history export prepared")}
                className="inline-flex items-center gap-1.5 rounded bg-surface-low px-3.5 py-2 text-xs font-semibold"
              >
                <Download className="h-4 w-4" />
                Export History
              </button>
              <button
                type="button"
                onClick={() => notify("Phone order form opened")}
                className="inline-flex items-center gap-1.5 rounded bg-primary px-4 py-2 text-xs font-bold text-white"
              >
                <PhoneIcon />
                Create Phone Order
              </button>
            </div>
          </div>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <StatHead title="Total Orders" icon={Receipt} />
            <div className="mt-3 flex items-baseline gap-2">
              <b className="text-3xl">18</b>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                <Check className="h-3.5 w-3.5" />
                100% Fulfilled
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              0 cancelled orders recorded
            </p>
            <div className="mt-3 h-1.5 rounded-full bg-surface-high">
              <div className="h-full w-full rounded-full bg-success" />
            </div>
          </Card>
          <Card className="p-5">
            <StatHead title="Total Lifetime Revenue" icon={TrendingUp} />
            <div className="mt-3 flex items-baseline gap-2">
              <b className="text-2xl">Rs. 48,920</b>
              <span className="rounded bg-success/10 px-1.5 py-0.5 text-[11px] font-semibold text-success">
                Top 5%
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Net captured across 18 transactions
            </p>
            <Sparkline />
          </Card>
          <Card className="p-5">
            <StatHead title="Average Order Value (AOV)" icon={TrendingUp} />
            <div className="mt-3 flex items-baseline gap-2">
              <b className="text-2xl">Rs. 2,718</b>
              <span className="text-xs font-semibold text-success">↑ +14%</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Restaurant average: Rs. 2,380
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-surface-high">
                <div className="h-full w-[78%] rounded-full bg-primary" />
              </div>
              <span className="text-[10px] font-semibold">High Ticket</span>
            </div>
          </Card>
          <Card className="p-5">
            <StatHead title="Discounts Utilized" icon={Zap} />
            <div className="mt-3 flex items-baseline gap-2">
              <b className="text-2xl">Rs. 2,450</b>
              <span className="rounded bg-surface-high px-2 py-0.5 text-[11px] font-semibold">
                Promo User
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Code <b className="text-primary">PIZZA10</b> redeemed 6 times
            </p>
            <div className="mt-3 text-[11px] font-semibold text-success">
              5.01% effective subsidy rate
            </div>
          </Card>
        </div>
        <Card className="space-y-4 p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 bg-surface-low pl-10 text-xs"
                placeholder="Search within customer orders (by item, order #, promo)..."
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 rounded bg-surface-high px-3 py-2 text-xs font-medium"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => notify("Batch slips queued for printing")}
                className="inline-flex items-center gap-1 rounded bg-primary px-3 py-2 text-xs font-bold text-white"
              >
                <Printer className="h-3.5 w-3.5" />
                Batch Slips
              </button>
            </div>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            <SelectBox
              label="Date Range"
              options={[
                "All Time",
                "Last 30 Days",
                "Last 90 Days",
                "This Year",
              ]}
              value="All Time"
              onChange={() => undefined}
            />
            <SelectBox
              label="Order Type"
              options={["All Types", "Delivery", "Pickup"]}
              value={type}
              onChange={setType}
            />
            <SelectBox
              label="Payment Status"
              options={[
                "All Payments",
                "Paid (Online)",
                "Paid (Card)",
                "Pending (COD)",
                "Refunded",
              ]}
              value={payment}
              onChange={setPayment}
            />
            <SelectBox
              label="Order Status"
              options={[
                "All Statuses",
                "Preparing",
                "Ready",
                "Delivered",
                "Cancelled",
              ]}
              value={status}
              onChange={setStatus}
            />
            <SelectBox
              label="Sort Orders"
              options={[
                "Most Recent First",
                "Oldest First",
                "Highest Amount",
                "Lowest Amount",
              ]}
              value="Most Recent First"
              onChange={() => undefined}
            />
          </div>
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full min-w-[1250px] text-left text-xs">
              <thead className="bg-surface-high text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  {[
                    "Order #",
                    "Date & Time",
                    "Type",
                    "Items Breakdown",
                    "Subtotal",
                    "Delivery",
                    "Discount",
                    "Total",
                    "Payment",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-surface-low"
                  >
                    <td className="px-3.5 py-3.5 font-mono font-bold text-primary">
                      {order.id === "#10482" && (
                        <span className="mr-1.5 inline-block h-2 w-2 animate-ping rounded-full bg-primary" />
                      )}
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5">
                      <b>{order.date}</b>
                      <span className="block text-[11px] text-muted-foreground">
                        {order.time}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-high px-2 py-0.5 font-semibold">
                        {order.type === "Delivery" ? (
                          <Bike className="h-3.5 w-3.5 text-primary" />
                        ) : (
                          <Store className="h-3.5 w-3.5 text-success" />
                        )}
                        {order.type}
                      </span>
                    </td>
                    <td className="min-w-[220px] px-3 py-3.5">
                      <div className="line-clamp-1 font-medium">
                        {order.items}
                      </div>
                      <div className="text-[11px] text-success">
                        {order.note}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-right font-mono">
                      {order.subtotal}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-right font-mono text-muted-foreground">
                      {order.delivery}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-right font-mono text-primary">
                      {order.discount}
                    </td>
                    <td className="whitespace-nowrap bg-surface-low/40 px-3 py-3.5 text-right font-mono font-bold">
                      {order.total}
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 font-medium",
                          order.payment.includes("Pending")
                            ? "bg-surface-high text-muted-foreground"
                            : "bg-success/10 text-success",
                        )}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 font-bold tracking-wider",
                          order.status === "PREPARING"
                            ? "bg-primary/10 text-primary"
                            : "bg-surface-high text-muted-foreground",
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-right">
                      <Link
                        href={`/orders/${order.id.replace("#", "")}`}
                        className="inline-flex items-center gap-1 rounded bg-surface-high px-2.5 py-1.5 font-semibold hover:bg-primary hover:text-white"
                      >
                        View <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-3 text-xs text-muted-foreground sm:flex-row">
            <span>
              Showing <b className="text-foreground">1-{filtered.length}</b> of{" "}
              <b className="text-foreground">18</b> orders{" "}
              <span className="mx-2">•</span>Viewing Page 1 of 3
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled
                className="rounded bg-surface-high px-2.5 py-1.5 opacity-50"
              >
                Previous
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={cn(
                    "h-8 w-8 rounded",
                    page === 1
                      ? "bg-primary text-white"
                      : "bg-surface-high hover:bg-surface-highest",
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="rounded bg-surface-high px-2.5 py-1.5"
              >
                Next <ChevronRight className="ml-1 inline h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </Card>
        <div className="grid gap-4 pb-8 md:grid-cols-3">
          <Card className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <Pizza className="h-4 w-4 text-primary" />
                Top Ordered Items
              </h2>
              <span className="text-[11px] text-muted-foreground">
                By Frequency
              </span>
            </div>
            {[
              ["Chicken Tikka (Lrg)", "8 times (44%)", 44],
              ["Cheesy Garlic Bread", "5 times (28%)", 28],
              ["Molten Lava Cake", "4 times (22%)", 22],
            ].map(([name, value, width]) => (
              <div key={name as string}>
                <div className="mb-1 flex justify-between text-xs">
                  <span>{name as string}</span>
                  <b>{value as string}</b>
                </div>
                <div className="h-1.5 rounded-full bg-surface-low">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            ))}
          </Card>
          <Card className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <CalendarDays className="h-4 w-4 text-primary" />
                Peak Ordering Hours
              </h2>
              <span className="text-[11px] font-medium text-success">
                Evening Habit
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Ahmed predominantly orders during dinner shifts between{" "}
              <b className="text-foreground">7:30 PM & 9:30 PM</b> (72% of
              orders). Weekend fulfillment demand is highest on Sundays.
            </p>
            <div className="flex h-14 items-end gap-2 pt-2">
              {[
                ["Lunch", 30],
                ["Snack", 15],
                ["Dinner", 100],
                ["Late", 50],
              ].map(([label, height]) => (
                <div
                  key={label as string}
                  className="flex flex-1 flex-col items-center gap-1"
                >
                  <div
                    className={cn(
                      "w-full rounded-t",
                      label === "Dinner" ? "bg-primary" : "bg-surface-high",
                    )}
                    style={{ height: `${height}%` }}
                  />
                  <span
                    className={cn(
                      "text-[10px]",
                      label === "Dinner" && "font-bold text-primary",
                    )}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="flex flex-col justify-between p-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="type-label-caps flex items-center gap-1.5">
                  <PackageCheck className="h-4 w-4 text-primary" />
                  Kitchen Operational Memo
                </span>
                <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                  Chef Flag
                </span>
              </div>
              <div className="rounded-lg bg-surface-low p-3 text-xs">
                <p className="font-semibold text-primary">
                  Preference: Well Done Crust
                </p>
                <p className="mt-1 text-muted-foreground">
                  Customer repeatedly notes dislike for soft dough bases. Ensure
                  pizza stones are heated to ≥380°C prior to baking.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 text-[11px] text-muted-foreground">
              <span>Last updated by Dispatcher #14</span>
              <button
                type="button"
                onClick={() => notify("Kitchen memo editor opened")}
                className="font-bold text-primary"
              >
                Edit Memo
              </button>
            </div>
          </Card>
        </div>
        {notice && (
          <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-inverse-surface px-4 py-3 text-xs font-semibold text-white shadow-xl">
            {notice}
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return <span className="text-sm">☎</span>;
}
function StatHead({
  title,
  icon: Icon,
}: {
  title: string;
  icon: typeof Receipt;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="type-label-caps text-muted-foreground">{title}</span>
      <span className="rounded-lg bg-surface-high p-1.5 text-primary">
        <Icon className="h-4 w-4" />
      </span>
    </div>
  );
}
function Sparkline() {
  return (
    <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
      <span>Trend (6 Mo)</span>
      <svg className="h-4 w-28 text-primary" viewBox="0 0 100 20" fill="none">
        <path
          d="M0 16 L20 14 L40 17 L60 8 L80 10 L100 3"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="100" cy="3" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}
