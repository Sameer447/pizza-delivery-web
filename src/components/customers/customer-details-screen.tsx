"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  Ban,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Edit3,
  History,
  Home,
  Mail,
  Phone,
  Pin,
  Pizza,
  Receipt,
  ShoppingBag,
  Star,
  ThumbsUp,
  TrendingUp,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

const orders = [
  {
    id: "#10482",
    date: "Today",
    time: "12:42 PM",
    items: "Chicken Tikka (Lrg) ×2",
    extra: "Garlic Bread ×1",
    total: "Rs. 3,376",
    payment: "COD",
    status: "PREPARING",
    active: true,
  },
  {
    id: "#10340",
    date: "18 Aug 2026",
    time: "8:15 PM",
    items: "Pepperoni Supreme (Med) ×1",
    extra: "Truffle Fries ×1",
    total: "Rs. 2,450",
    payment: "Card",
    status: "DELIVERED",
  },
  {
    id: "#10192",
    date: "02 Aug 2026",
    time: "7:30 PM",
    items: "BBQ Chicken Pizza (Lrg) ×1",
    extra: "Molten Lava Cake ×2",
    total: "Rs. 3,120",
    payment: "Card",
    status: "DELIVERED",
  },
];
const timeline = [
  [
    "Order Placed (#10482)",
    "Today, 12:42 PM",
    "Placed via Mobile Web for Rs. 3,376. Station ticket printed.",
    "bg-primary",
  ],
  [
    "Order #10340 Completed",
    "18 Aug 2026, 8:44 PM",
    "Delivered on time in 29 minutes via Rider #08 (Usman Ali).",
    "bg-success",
  ],
  [
    "Address Added",
    "12 Jul 2026",
    "Added new delivery location: Office / Work (Arfa Software Park).",
    "bg-muted-foreground",
  ],
  [
    "Account Registered",
    "14 Jan 2025",
    "Profile created. OTP verified for phone +92 300 1234567.",
    "bg-muted-foreground",
  ],
];

function Metric({
  title,
  value,
  detail,
  icon: Icon,
  color = "text-primary",
}: {
  title: string;
  value: string;
  detail: React.ReactNode;
  icon: typeof ShoppingBag;
  color?: string;
}) {
  return (
    <Card className="flex flex-col justify-between p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="type-label-caps text-muted-foreground">{title}</span>
        <span className={cn("rounded-md bg-surface-low p-1.5", color)}>
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {detail}
      </div>
      <div className="mt-2 flex justify-between border-t pt-2 text-[11px] text-muted-foreground">
        {title === "Total Orders" ? (
          <>
            <span>
              Cancellations: <b className="text-foreground">0</b>
            </span>
            <b className="text-success">Zero Churn Risk</b>
          </>
        ) : title === "Lifetime Value" ? (
          <>
            <span>Top 5% Spender</span>
            <b className="text-primary">High Value Patron</b>
          </>
        ) : title === "Average Order (AOV)" ? (
          <>
            <span>Store Avg: Rs. 1,850</span>
            <b className="text-success">+46.9%</b>
          </>
        ) : (
          <>
            <span>Station: Oven Deck #1</span>
            <Link href="/orders/10482" className="font-semibold text-primary">
              Track →
            </Link>
          </>
        )}
      </div>
    </Card>
  );
}

export function CustomerDetailsScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("home");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <span>›</span>
            <Link href="/customers" className="hover:text-primary">
              Customers
            </Link>
            <span>›</span>
            <span className="text-foreground">Ahmed Khan</span>
            <span className="rounded bg-surface-high px-1.5 py-0.5 font-mono text-[11px]">
              #CUST-1048
            </span>
          </nav>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              ACTIVE ACCOUNT
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              <Award className="h-3.5 w-3.5" />
              VIP PLATINUM
            </span>
          </div>
        </div>
        <Card className="relative overflow-hidden p-6 shadow-sm lg:p-8">
          <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container text-2xl font-bold text-white shadow-md">
                AK
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-surface-lowest text-primary shadow">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Ahmed Khan
                  </h1>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    Patron Tier 3
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    ID: #CUST-1048
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    ahmed.khan@email.com
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    +92 300 1234567
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    Member since 14 Jan 2025{" "}
                    <b className="text-foreground">(18 mos)</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/customers/1048/edit"
                className="inline-flex items-center gap-1.5 rounded bg-surface-high px-4 py-2 text-xs font-semibold shadow-sm"
              >
                <Edit3 className="h-4 w-4" />
                Edit Customer
              </Link>
              <Link
                href="/customers/1048/orders"
                className="inline-flex items-center gap-1.5 rounded bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm"
              >
                <Receipt className="h-4 w-4" />
                View All Orders
              </Link>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="inline-flex items-center gap-1 rounded bg-surface-high px-3 py-2 text-xs font-semibold"
                >
                  More Actions <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-52 rounded-lg border bg-surface-lowest py-1.5 text-xs shadow-xl">
                    <button
                      type="button"
                      onClick={() => notify("SMS alert queued")}
                      className="block w-full px-4 py-2 text-left hover:bg-surface-low"
                    >
                      Send SMS Alert
                    </button>
                    <button
                      type="button"
                      onClick={() => notify("Password reset link queued")}
                      className="block w-full px-4 py-2 text-left hover:bg-surface-low"
                    >
                      Reset Password Link
                    </button>
                    <button
                      type="button"
                      onClick={() => notify("VIP tier adjustment opened")}
                      className="block w-full px-4 py-2 text-left hover:bg-surface-low"
                    >
                      Adjust Points / VIP Tier
                    </button>
                    <div className="my-1 border-t" />
                    <button
                      type="button"
                      onClick={() =>
                        notify("Account deactivation request submitted")
                      }
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-destructive hover:bg-destructive/10"
                    >
                      <Ban className="h-3.5 w-3.5" />
                      Deactivate Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric
            title="Total Orders"
            value="18"
            detail={
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                100% Fulfilled
              </span>
            }
            icon={ShoppingBag}
          />
          <Metric
            title="Lifetime Value"
            value="Rs. 48,920"
            detail={null}
            icon={TrendingUp}
            color="text-success"
          />
          <Metric
            title="Average Order (AOV)"
            value="Rs. 2,718"
            detail={null}
            icon={Zap}
            color="text-muted-foreground"
          />
          <Metric
            title="Last Order"
            value="Today, 12:42 PM"
            detail={
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                PREPARING
              </span>
            }
            icon={Clock3}
          />
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">
                    Customer Information & Preferences
                  </h2>
                </div>
                <span className="rounded bg-surface-low px-2 py-1 text-[11px] text-muted-foreground">
                  Channel: Mobile Web App
                </span>
              </div>
              <div className="grid gap-6 pt-5 md:grid-cols-2">
                <div className="space-y-4 text-sm">
                  <InfoField label="Full Legal Name">Ahmed Khan</InfoField>
                  <InfoField label="Email Address">
                    <span className="inline-flex items-center gap-2">
                      ahmed.khan@email.com <Verified />
                    </span>
                  </InfoField>
                  <InfoField label="Phone Number">
                    <span className="inline-flex items-center gap-2">
                      +92 300 1234567 <Verified label="SMS Verified" />
                    </span>
                  </InfoField>
                </div>
                <div className="space-y-3 rounded-lg bg-surface-low p-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Pizza className="h-4 w-4" />
                    Kitchen Note Directives
                  </div>
                  <Preference
                    label="Spiciness Calibration:"
                    value="Spicy Level 2 (Medium Heat)"
                    tone="danger"
                  />
                  <Preference
                    label="Crust Preference:"
                    value="Thin Crust & Cheese Burst"
                  />
                  <Preference
                    label="Dietary Restrictions:"
                    value="Strictly No Onions (Allergy flag)"
                    tone="danger"
                  />
                  <div className="rounded bg-surface-lowest p-2 text-[11px] text-muted-foreground">
                    <b className="text-foreground">Station Dispatch Tag:</b>{" "}
                    “Automate kitchen ticket pop with bold red alert for onion
                    removal.”
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <Pin className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Saved Delivery Addresses</h2>
                  <span className="rounded-full bg-surface-high px-2 py-0.5 text-xs font-semibold">
                    2 Saved
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => notify("Add address form opened")}
                  className="inline-flex items-center gap-1 rounded bg-surface-high px-3 py-1.5 text-xs font-semibold"
                >
                  + Add Address
                </button>
              </div>
              <div className="space-y-4 pt-4">
                <Address
                  label="Home"
                  address="House #14-B, Street 7, Sector Y, DHA Phase 6, Lahore"
                  instructions="Ring doorbell twice, drop at front porch"
                  isDefault={defaultAddress === "home"}
                  onDefault={() => setDefaultAddress("home")}
                  onAction={notify}
                  icon={Home}
                />
                <Address
                  label="Office / Work"
                  address="4th Floor, Arfa Software Technology Park, Ferozepur Road, Lahore"
                  instructions="Call upon arrival at security gate"
                  isDefault={defaultAddress === "office"}
                  onDefault={() => setDefaultAddress("office")}
                  onAction={notify}
                  icon={Pin}
                />
              </div>
            </Card>
            <Card className="overflow-hidden p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Recent Order History</h2>
                </div>
                <Link
                  href="/customers/1048/orders"
                  className="text-xs font-semibold text-primary"
                >
                  View all 18 orders →
                </Link>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-xs">
                  <thead className="bg-surface-low text-[11px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      {[
                        "Order #",
                        "Date & Time",
                        "Items Summary",
                        "Total",
                        "Payment",
                        "Status",
                        "Action",
                      ].map((heading) => (
                        <th key={heading} className="px-3 py-2.5">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-surface-low">
                        <td className="px-3 py-3 font-mono font-bold text-primary">
                          {order.id}
                        </td>
                        <td className="px-3 py-3">
                          <b>{order.date}</b>
                          <span className="block text-[11px] text-muted-foreground">
                            {order.time}
                          </span>
                        </td>
                        <td className="max-w-[220px] px-3 py-3">
                          <span className="block truncate font-medium">
                            {order.items}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {order.extra}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 font-bold">
                          {order.total}
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <CreditCard className="h-3.5 w-3.5" />
                            {order.payment}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold",
                              order.active
                                ? "bg-primary/10 text-primary"
                                : "bg-success/10 text-success",
                            )}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right">
                          <Link
                            href={`/orders/${order.id.replace("#", "")}`}
                            className="rounded bg-surface-high px-2.5 py-1 text-[11px] font-semibold"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <div className="space-y-6 lg:col-span-4">
            <Card className="space-y-5 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Lifetime Insights</h2>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Score: 98/100
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-surface-high to-surface-lowest p-3.5">
                <div>
                  <span className="type-label-caps text-primary">
                    Patron Status
                  </span>
                  <h3 className="text-sm font-bold">VIP Platinum Patron</h3>
                </div>
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Specialty Pizzas</span>
                  <b className="text-primary">68%</b>
                </div>
                <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-surface-high">
                  <div className="w-[68%] bg-primary" />
                  <div className="w-[20%] bg-success" />
                  <div className="w-[12%] bg-secondary" />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                  <span>Pizza: 68%</span>
                  <span>Sides: 20%</span>
                  <span>Desserts: 12%</span>
                </div>
              </div>
              <div className="space-y-3">
                <Insight
                  label="Favorite Item:"
                  value="Chicken Tikka"
                  detail="Ordered 14 times"
                  icon={Pizza}
                />
                <Insight
                  label="Preferred Station:"
                  value="Oven Deck #1 (Stone)"
                  icon={Zap}
                />
                <Insight
                  label="Refund / Dispute Rate:"
                  value="0.0% (Zero issue)"
                  icon={ThumbsUp}
                  success
                />
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-surface-low p-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-primary text-xs font-bold">
                  100%
                </div>
                <div>
                  <b className="text-xs">100% Retention Rate</b>
                  <p className="text-[11px] text-muted-foreground">
                    Reorders within every 14 days on average.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Audit & Activity Log</h2>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  Real-time sync
                </span>
              </div>
              <div className="relative space-y-6 pl-5 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-0.5 before:bg-surface-high">
                {timeline.map(([title, time, description, color]) => (
                  <div key={title} className="relative text-xs">
                    <span
                      className={cn(
                        "absolute -left-5 top-1 h-2.5 w-2.5 rounded-full ring-4 ring-surface-lowest",
                        color,
                      )}
                    />
                    <div className="flex items-center justify-between gap-2">
                      <b>{title}</b>
                      <span className="whitespace-nowrap text-[10px] text-muted-foreground">
                        {time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => notify("Full audit trail loaded")}
                className="mt-6 w-full rounded bg-surface-high py-2 text-xs font-semibold"
              >
                Load Full Audit Trail
              </button>
            </Card>
          </div>
        </div>
        {notice && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-inverse-surface px-4 py-3 text-xs font-semibold text-white shadow-xl">
            {notice}
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Close notification"
            >
              {" "}
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Verified({ label = "Verified" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success">
      <Check className="h-3 w-3" />
      {label}
    </span>
  );
}
function InfoField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="type-label-caps mb-1 block text-muted-foreground">
        {label}
      </span>
      <p className="font-semibold">{children}</p>
    </div>
  );
}
function Preference({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "danger";
}) {
  return (
    <div className="flex items-center justify-between gap-2 border-b pb-1.5 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-right font-semibold",
          tone === "danger" && "text-destructive",
        )}
      >
        {value}
      </span>
    </div>
  );
}
function Address({
  label,
  address,
  instructions,
  isDefault,
  onDefault,
  onAction,
  icon: Icon,
}: {
  label: string;
  address: string;
  instructions: string;
  isDefault: boolean;
  onDefault: () => void;
  onAction: (message: string) => void;
  icon: typeof Home;
}) {
  return (
    <div className="rounded-lg bg-surface-low p-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold uppercase",
                isDefault ? "bg-primary text-white" : "bg-surface-high",
              )}
            >
              <Icon className="h-3 w-3" />
              {label}
            </span>
            {isDefault && (
              <span className="rounded bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                DEFAULT ADDRESS
              </span>
            )}
          </div>
          <p className="text-sm font-semibold">{address}</p>
          <p className="text-xs text-muted-foreground">
            <b className="text-foreground">Rider instructions:</b> “
            {instructions}”
          </p>
        </div>
        <div className="flex shrink-0 items-start gap-2">
          <button
            type="button"
            onClick={() => onAction("Address editor opened")}
            className="rounded bg-surface-lowest px-2.5 py-1 text-xs"
          >
            Edit
          </button>
          {!isDefault && (
            <button
              type="button"
              onClick={onDefault}
              className="rounded bg-surface-lowest px-2.5 py-1 text-xs text-primary"
            >
              Set as Default
            </button>
          )}
          <button
            type="button"
            onClick={() => onAction("Address deletion requires confirmation")}
            className="rounded bg-surface-lowest px-2.5 py-1 text-xs text-destructive"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
function Insight({
  label,
  value,
  detail,
  icon: Icon,
  success,
}: {
  label: string;
  value: string;
  detail?: string;
  icon: typeof Pizza;
  success?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded bg-surface-low p-2.5 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon
          className={cn("h-4 w-4", success ? "text-success" : "text-primary")}
        />
        {label}
      </div>
      <div className="text-right">
        <b>{value}</b>
        {detail && (
          <span className="block text-[10px] text-muted-foreground">
            {detail}
          </span>
        )}
      </div>
    </div>
  );
}
