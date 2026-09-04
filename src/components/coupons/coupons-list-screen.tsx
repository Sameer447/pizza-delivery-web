"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Archive,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Ellipsis,
  FilterX,
  History,
  LockKeyhole,
  PauseCircle,
  Plus,
  Search,
  ShieldCheck,
  Store,
  Ticket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type CouponStatus = "active" | "scheduled" | "expired" | "disabled";
type Coupon = {
  code: string;
  name: string;
  glyph: string;
  discount: string;
  detail: string;
  type: string;
  used: string;
  cap: string;
  percent: number;
  validity: string;
  timing: string;
  scope: string;
  scopeDetail: string;
  status: CouponStatus;
  tone: string;
};

const coupons: Coupon[] = [
  {
    code: "PIZZA10",
    name: "Summer Sizzler 10% Off",
    glyph: "%",
    discount: "10% OFF",
    detail: "Max Rs. 300",
    type: "Percentage",
    used: "1,420",
    cap: "2,000",
    percent: 71,
    validity: "01 Aug - 30 Sep 2026",
    timing: "38 days remaining",
    scope: "Pizza House",
    scopeDetail: "Local Storefront",
    status: "active",
    tone: "bg-primary/10 text-primary",
  },
  {
    code: "CHEESEBURST",
    name: "Free Cheese Burst Upgrade",
    glyph: "₹",
    discount: "Rs. 180 OFF",
    detail: "On Med & Large",
    type: "Fixed Amount",
    used: "842",
    cap: "1,000",
    percent: 84,
    validity: "15 Aug - 15 Oct 2026",
    timing: "53 days remaining",
    scope: "Pizza House",
    scopeDetail: "Local Storefront",
    status: "active",
    tone: "bg-success/10 text-success",
  },
  {
    code: "FIRSTBITE",
    name: "New Patron Welcome Bonus",
    glyph: "1st",
    discount: "20% OFF",
    detail: "Max Cap Rs. 500",
    type: "First Order",
    used: "312",
    cap: "Unlimited",
    percent: 25,
    validity: "Ongoing (Evergreen)",
    timing: "Auto-renews daily",
    scope: "Multi-Branch",
    scopeDetail: "3 Region Stores",
    status: "active",
    tone: "bg-surface-high text-primary",
  },
  {
    code: "CRICKETRUSH",
    name: "T20 Finals Weekend Special",
    glyph: "T20",
    discount: "25% OFF",
    detail: "Cap Rs. 600 (Combos)",
    type: "Percentage",
    used: "0",
    cap: "500",
    percent: 0,
    validity: "12 Sep - 14 Sep 2026",
    timing: "Starts in 3 days",
    scope: "Pizza House",
    scopeDetail: "Local Outlet",
    status: "scheduled",
    tone: "bg-surface-high text-secondary",
  },
  {
    code: "MONSOON50",
    name: "Monsoon Midweek Flash Flat Rs. 200",
    glyph: "☔",
    discount: "Rs. 200 OFF",
    detail: "Min Cart Rs. 800",
    type: "Fixed Amount",
    used: "500",
    cap: "500",
    percent: 100,
    validity: "01 Jul - 31 Jul 2026",
    timing: "Ended 23d ago",
    scope: "Pizza House",
    scopeDetail: "Local Storefront",
    status: "expired",
    tone: "bg-surface text-muted-foreground",
  },
  {
    code: "VIPFREESHIP",
    name: "Zero Delivery Fee for VIP Patrons",
    glyph: "↗",
    discount: "Free Delivery",
    detail: "Saves Rs. 200 fee",
    type: "Shipping",
    used: "618",
    cap: "1,000",
    percent: 61.8,
    validity: "01 Jan - 31 Dec 2026",
    timing: "Active through year",
    scope: "Pizza House",
    scopeDetail: "Loyalty Segment",
    status: "active",
    tone: "bg-success/10 text-success",
  },
  {
    code: "LATEBITE15",
    name: "Late Night Cravings 15%",
    glyph: "☾",
    discount: "15% OFF",
    detail: "Cap Rs. 250",
    type: "Percentage",
    used: "94",
    cap: "300",
    percent: 31.3,
    validity: "10 Aug - 31 Aug 2026",
    timing: "Paused by Kitchen Mgr",
    scope: "Pizza House",
    scopeDetail: "23:00 - 03:00 Only",
    status: "disabled",
    tone: "bg-surface-highest text-primary",
  },
];

const statusLabels: Record<CouponStatus, string> = {
  active: "ACTIVE",
  scheduled: "SCHEDULED",
  expired: "EXPIRED",
  disabled: "DISABLED",
};

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
  icon: typeof Ticket;
  color?: string;
}) {
  return (
    <Card className="p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <span className="type-label-caps text-muted-foreground">{title}</span>
          <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
        </div>
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg bg-surface-low",
            color,
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
        {detail}
      </div>
    </Card>
  );
}

export function CouponsListScreen() {
  const [role, setRole] = useState<"restaurant" | "super">("restaurant");
  const [filter, setFilter] = useState<"all" | CouponStatus>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const visibleCoupons = useMemo(
    () =>
      coupons.filter(
        (coupon) =>
          (filter === "all" || coupon.status === filter) &&
          `${coupon.code} ${coupon.name}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, query],
  );
  const allVisibleSelected =
    visibleCoupons.length > 0 &&
    visibleCoupons.every((coupon) => selected.includes(coupon.code));
  const toggleCoupon = (code: string) =>
    setSelected((current) =>
      current.includes(code)
        ? current.filter((item) => item !== code)
        : [...current, code],
    );
  const toggleAll = () =>
    setSelected(
      allVisibleSelected
        ? selected.filter(
            (code) => !visibleCoupons.some((coupon) => coupon.code === code),
          )
        : [
            ...new Set([
              ...selected,
              ...visibleCoupons.map((coupon) => coupon.code),
            ]),
          ],
    );

  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <nav className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span>Dashboard</span>
              <span>/</span>
              <span>Management</span>
              <span>/</span>
              <span className="font-semibold text-primary">
                Coupons &amp; Promotions
              </span>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="type-page-title">Coupons &amp; Promotions</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-high px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Live Storefront
              </span>
            </div>
            <p className="mt-1 max-w-2xl text-xs text-muted-foreground">
              Create, schedule, and govern operational discounts, promo codes,
              and campaign eligibility for Pizza House.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg bg-surface-low p-1 shadow-sm">
              <button
                onClick={() => setRole("restaurant")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs",
                  role === "restaurant"
                    ? "bg-surface-lowest font-semibold shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                <Store className="h-3.5 w-3.5 text-primary" />
                Store Admin
              </button>
              <button
                onClick={() => setRole("super")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs",
                  role === "super"
                    ? "bg-surface-lowest font-semibold shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                <Users className="h-3.5 w-3.5" />
                Super Admin View
              </button>
            </div>
            <button
              onClick={() => notify("Coupon CSV export prepared.")}
              className="inline-flex items-center gap-2 rounded-lg bg-surface-lowest px-3.5 py-2 text-xs font-semibold shadow-sm hover:bg-surface-low"
            >
              <Download className="h-4 w-4 text-secondary" />
              Export CSV
            </button>
            <Link
              href="/coupons/create"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-container"
            >
              <Plus className="h-4 w-4" />
              Create Coupon
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            title="Total Campaigns"
            value="38"
            icon={Ticket}
            detail={
              <>
                <span className="inline-flex items-center gap-1 font-semibold text-success">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +3 this month
                </span>
                <span>Global &amp; Local</span>
              </>
            }
          />
          <Metric
            title="Active & Ready"
            value="14"
            icon={Zap}
            color="text-success"
            detail={<span>Live on Storefront &amp; POS</span>}
          />
          <Metric
            title="Scheduled"
            value="6"
            icon={History}
            color="text-secondary"
            detail={
              <>
                <span>Upcoming drops queued</span>
                <b>Next: in 3 days</b>
              </>
            }
          />
          <Metric
            title="Archived / Capped"
            value="18"
            icon={Archive}
            color="text-muted-foreground"
            detail={
              <>
                <span>4 manually paused</span>
                <button
                  onClick={() => notify("Audit log opened.")}
                  className="font-semibold text-primary hover:underline"
                >
                  View Audit
                </button>
              </>
            }
          />
        </div>

        <Card className="flex flex-wrap items-center justify-between gap-4 bg-surface-low p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="h-4.5 w-4.5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <b>Weekly Promotion Burn Rate:</b>
                <b className="font-mono text-primary">Rs. 142,850</b>
                <span className="text-muted-foreground">
                  granted across 1,934 redeemers
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Avg gross margin reduction is currently controlled at{" "}
                <b className="text-foreground">6.2%</b> (target &lt; 8.0%).
              </div>
            </div>
          </div>
          <button
            onClick={() => notify("Detailed yield analysis opened.")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            Detailed Yield Analysis <ChevronRight className="h-4 w-4" />
          </button>
        </Card>

        <Card className="overflow-hidden shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(
                [
                  ["all", "All", "38"],
                  ["active", "Active", "14"],
                  ["scheduled", "Scheduled", "6"],
                  ["expired", "Expired / Exhausted", "18"],
                  ["disabled", "Disabled", "4"],
                ] as const
              ).map(([value, label, count]) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-1.5 text-xs transition",
                    filter === value
                      ? "bg-primary font-bold text-white"
                      : "text-muted-foreground hover:bg-surface-low",
                  )}
                >
                  {label}{" "}
                  <span className="ml-1 text-[10px] opacity-80">{count}</span>
                </button>
              ))}
            </div>
            <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search coupon code, campaign name..."
                className="w-full rounded-lg bg-surface-low py-1.5 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-surface-lowest px-3.5 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <select
                className="rounded-lg bg-surface-low px-3 py-1.5 text-xs outline-none"
                aria-label="Discount type"
              >
                <option>Discount Type: All</option>
                <option>Percentage Off (%)</option>
                <option>Fixed Amount (Rs.)</option>
                <option>Free Shipping</option>
              </select>
              <select
                className="rounded-lg bg-surface-low px-3 py-1.5 text-xs outline-none"
                aria-label="Coupon scope"
              >
                <option>Scope: Pizza House (Local)</option>
                <option>Platform-wide (All Outlets)</option>
              </select>
              <select
                className="rounded-lg bg-surface-low px-3 py-1.5 text-xs outline-none"
                aria-label="Sort coupons"
              >
                <option>Sort: Most Used First</option>
                <option>Sort: Expiring Soonest</option>
              </select>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                className="inline-flex items-center gap-1 px-2 py-1.5 text-xs text-muted-foreground hover:text-primary"
              >
                <FilterX className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground">
                {selected.length} selected
              </span>
              <button
                disabled={!selected.length}
                onClick={() => notify(`${selected.length} coupon(s) paused.`)}
                className="inline-flex items-center gap-1 rounded-lg bg-surface-low px-2.5 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PauseCircle className="h-3.5 w-3.5" />
                Pause Selected
              </button>
              <button
                disabled={!selected.length}
                onClick={() => notify(`${selected.length} coupon(s) archived.`)}
                className="inline-flex items-center gap-1 rounded-lg bg-surface-low px-2.5 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Archive className="h-3.5 w-3.5" />
                Archive
              </button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-left text-xs">
              <thead className="bg-surface-low text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="w-10 px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleAll}
                      aria-label="Select visible coupons"
                      className="accent-primary"
                    />
                  </th>
                  {[
                    "Coupon & Campaign",
                    "Discount Value",
                    "Type",
                    "Usage / Cap Limit",
                    "Validity Period",
                    "Scope",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {visibleCoupons.map((coupon) => (
                  <tr
                    key={coupon.code}
                    className={cn(
                      "group hover:bg-surface-low/60",
                      coupon.status === "expired" && "opacity-75",
                    )}
                  >
                    <td className="px-4 py-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(coupon.code)}
                        onChange={() => toggleCoupon(coupon.code)}
                        aria-label={`Select ${coupon.code}`}
                        className="accent-primary"
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold",
                            coupon.tone,
                          )}
                        >
                          {coupon.glyph}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Link
                              href={`/coupons/${coupon.code}`}
                              className={cn(
                                "font-mono tracking-wide hover:text-primary hover:underline",
                                coupon.status === "expired" && "line-through",
                              )}
                            >
                              {coupon.code}
                            </Link>
                            <button
                              onClick={() => {
                                void navigator.clipboard?.writeText(
                                  coupon.code,
                                );
                                notify(`${coupon.code} copied.`);
                              }}
                              className="opacity-0 transition group-hover:opacity-100"
                              aria-label={`Copy ${coupon.code}`}
                            >
                              <Copy className="h-3 w-3 text-muted-foreground hover:text-primary" />
                            </button>
                          </div>
                          <span className="text-[11px] text-muted-foreground">
                            {coupon.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <b>{coupon.discount}</b>
                      <span className="block text-[10px] text-muted-foreground">
                        {coupon.detail}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="rounded bg-surface px-2 py-0.5 text-[11px] text-muted-foreground">
                        {coupon.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="max-w-[130px]">
                        <div className="flex justify-between">
                          <b>{coupon.used}</b>
                          <span className="text-muted-foreground">
                            / {coupon.cap}
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              coupon.status === "expired"
                                ? "bg-muted-foreground"
                                : coupon.status === "scheduled"
                                  ? "bg-secondary"
                                  : "bg-primary",
                            )}
                            style={{ width: `${coupon.percent}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-muted-foreground">
                          {coupon.status === "scheduled"
                            ? "Starts in 3 days"
                            : `${coupon.percent}% Redeemed`}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <b className="block font-medium">{coupon.validity}</b>
                      <span
                        className={cn(
                          "text-[10px]",
                          coupon.status === "disabled"
                            ? "text-destructive"
                            : coupon.status === "expired"
                              ? "text-muted-foreground"
                              : "text-success",
                        )}
                      >
                        {coupon.timing}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {coupon.scope}
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {coupon.scopeDetail}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                          coupon.status === "active"
                            ? "bg-success/10 text-success"
                            : coupon.status === "scheduled"
                              ? "bg-surface-high text-secondary"
                              : coupon.status === "disabled"
                                ? "bg-surface-highest text-primary"
                                : "bg-surface text-muted-foreground",
                        )}
                      >
                        {coupon.status === "active" ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : coupon.status === "scheduled" ? (
                          <History className="h-3.5 w-3.5" />
                        ) : (
                          <PauseCircle className="h-3.5 w-3.5" />
                        )}
                        {statusLabels[coupon.status]}
                      </span>
                    </td>
                    <td className="relative px-4 py-3.5 text-center">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === coupon.code ? null : coupon.code,
                          )
                        }
                        className="rounded p-1.5 text-muted-foreground hover:bg-surface-high"
                        aria-label={`Actions for ${coupon.code}`}
                      >
                        <Ellipsis className="h-4 w-4" />
                      </button>
                      {openMenu === coupon.code && (
                        <div className="absolute right-4 top-11 z-20 w-40 rounded-lg border bg-white py-1 text-left shadow-xl">
                          <button
                            onClick={() =>
                              notify(`${coupon.code} details opened.`)
                            }
                            className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-surface-low"
                          >
                            <Ticket className="h-3.5 w-3.5" />
                            Edit Details
                          </button>
                          <Link
                            href={`/coupons/${coupon.code}`}
                            className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-surface-low"
                          >
                            <BarChart3 className="h-3.5 w-3.5" />
                            Analytics
                          </Link>
                          <button
                            onClick={() => notify(`${coupon.code} paused.`)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-primary hover:bg-surface-low"
                          >
                            <PauseCircle className="h-3.5 w-3.5" />
                            Pause Code
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t bg-surface-lowest p-4 text-xs text-muted-foreground">
            <span>
              Showing{" "}
              <b className="text-foreground">
                {visibleCoupons.length ? 1 : 0}-{visibleCoupons.length}
              </b>{" "}
              of <b className="text-foreground">38</b> campaigns • Pizza House
              Outlet Cluster
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="rounded bg-surface-low px-2 py-1.5 opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="h-7 w-7 rounded bg-primary text-white">
                1
              </button>
              <button className="h-7 w-7 rounded hover:bg-surface-low">
                2
              </button>
              <button className="h-7 w-7 rounded hover:bg-surface-low">
                3
              </button>
              <span className="px-1">…</span>
              <button className="h-7 w-7 rounded hover:bg-surface-low">
                6
              </button>
              <button
                onClick={() => notify("Next campaign page selected.")}
                className="rounded bg-surface-low px-2 py-1.5"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="type-card-title">Redemption by Channel</h2>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Volume breakdown of Pizza House discount codes redeemed over the
              past 30 days.
            </p>
            {[
              [
                "Storefront Web / Mobile App",
                "62% (1,920)",
                "62%",
                "bg-primary",
              ],
              ["Counter POS / Waiter Tablet", "26% (806)", "26%", "bg-success"],
              [
                "Third-party Aggregator Sync",
                "12% (372)",
                "12%",
                "bg-secondary",
              ],
            ].map(([label, value, width, color]) => (
              <div key={label} className="mb-2.5">
                <div className="mb-1 flex justify-between text-xs">
                  <span>{label}</span>
                  <b>{value}</b>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface">
                  <div
                    className={cn("h-full rounded-full", color)}
                    style={{ width }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-between border-t pt-3 text-[11px] text-muted-foreground">
              <span>
                Channel auto-sync: <b>Active</b>
              </span>
              <button
                onClick={() => notify("Channel settings opened.")}
                className="font-semibold text-primary hover:underline"
              >
                Edit Channels
              </button>
            </div>
          </Card>
          <Card className="p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="type-card-title">
                Operational Rules &amp; Guardrails
              </h2>
              <ShieldCheck className="h-4 w-4 text-success" />
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Kitchen margin limits dynamically applied to checkout
              calculations.
            </p>
            <div className="space-y-3">
              {[
                [
                  LockKeyhole,
                  "Peak Hour Auto-Throttling",
                  "Discounts above 20% disable if kitchen queue exceeds 18 orders.",
                ],
                [
                  Users,
                  "One Usage Per Customer Limit",
                  "Enforced via verified phone number OTP hash across all touchpoints.",
                ],
              ].map(([Icon, title, description]) => (
                <div
                  key={title as string}
                  className="flex items-start gap-3 rounded-lg bg-surface-low p-2.5"
                >
                  <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                  <div>
                    <b className="block text-xs">{title as string}</b>
                    <span className="text-[11px] text-muted-foreground">
                      {description as string}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t pt-3 text-[11px]">
              <span className="font-semibold text-success">
                ● Kitchen Guard Active
              </span>
              <button
                onClick={() => notify("Promotion limits opened.")}
                className="font-semibold text-primary hover:underline"
              >
                Manage Limits
              </button>
            </div>
          </Card>
          <Card className="p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="type-card-title">Top Performer</h2>
              <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                Highest ROI
              </span>
            </div>
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-white">
                P10
              </span>
              <div>
                <b className="block text-sm">PIZZA10 (Summer Sizzler)</b>
                <span className="text-[11px] text-muted-foreground">
                  Generated Rs. 486,200 in gross sales
                </span>
              </div>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Patrons redeeming this coupon spend an average of <b>Rs. 720</b>{" "}
              compared to normal ticket sizes of Rs. 490.
            </p>
            <div className="flex justify-around rounded-lg bg-surface-low p-3 text-center">
              <span>
                <small className="block text-[10px] uppercase text-muted-foreground">
                  Conversion
                </small>
                <b>31.4%</b>
              </span>
              <span>
                <small className="block text-[10px] uppercase text-muted-foreground">
                  Avg Basket
                </small>
                <b className="text-success">+46.9%</b>
              </span>
              <span>
                <small className="block text-[10px] uppercase text-muted-foreground">
                  Burn
                </small>
                <b className="text-primary">Rs. 42k</b>
              </span>
            </div>
            <div className="mt-4 flex justify-between border-t pt-3 text-[11px] text-muted-foreground">
              <span>
                Scheduled end: <b>30 Sep 2026</b>
              </span>
              <button
                onClick={() => notify("Campaign duplicated.")}
                className="font-semibold text-primary hover:underline"
              >
                Duplicate Campaign
              </button>
            </div>
          </Card>
        </div>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed right-6 top-20 z-50 flex items-center gap-2 rounded-lg bg-surface-lowest px-4 py-3 text-xs font-semibold shadow-xl"
        >
          <CheckCircle2 className="h-4 w-4 text-success" />
          {notice}
        </div>
      )}
    </div>
  );
}
