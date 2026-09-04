"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Archive,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCopy,
  Download,
  History,
  Lock,
  Pause,
  Printer,
  ShoppingBag,
  Ticket,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { CouponStatusConfirmationDialog } from "@/components/coupons/coupon-status-confirmation-dialog";

const redemptions = [
  [
    "#10482",
    "Today, 12:42 PM",
    "Ahmed Khan",
    "+92 300 1234567",
    "Chicken Tikka (Lrg) x2, Garlic Bread",
    "Rs. 3,198",
    "-Rs. 300",
    "Rs. 2,898",
    "PENDING (COD)",
    "Mobile Web",
  ],
  [
    "#10476",
    "Today, 11:15 AM",
    "Sara Ali",
    "+92 321 4567890",
    "Pepperoni Supreme (Med) x1",
    "Rs. 1,250",
    "-Rs. 125",
    "Rs. 1,125",
    "PAID (Card)",
    "Storefront",
  ],
  [
    "#10450",
    "Yesterday, 09:20 PM",
    "Usman Tariq",
    "+92 333 7891234",
    "Classic Margherita x2, Truffle Fries",
    "Rs. 2,420",
    "-Rs. 242",
    "Rs. 2,178",
    "PAID (Online)",
    "Mobile App",
  ],
  [
    "#10412",
    "01 Sep, 08:30 PM",
    "Bilal Sheikh",
    "+92 345 6789012",
    "BBQ Chicken Feast (Lrg) x1",
    "Rs. 1,650",
    "-Rs. 165",
    "Rs. 1,485",
    "PAID (Card)",
    "POS Kiosk",
  ],
  [
    "#10398",
    "31 Aug, 07:45 PM",
    "Fatima Noor",
    "+92 312 3456789",
    "Veggie Supreme (Med) x1, Lava Cake",
    "Rs. 1,850",
    "-Rs. 185",
    "Rs. 1,665",
    "PAID (Card)",
    "Mobile Web",
  ],
];
const bars = [16, 20, 24, 36, 40, 28, 16, 18, 32, 38, 24, 20, 30, 34];

export function CouponDetailScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(true);
  const [range, setRange] = useState<"14" | "run">("14");
  const [notice, setNotice] = useState("");
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const chartBars = useMemo(
    () => (range === "14" ? bars : [...bars, 26, 18, 22]),
    [range],
  );
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <span>/</span>
            <span>Management</span>
            <span>/</span>
            <Link href="/coupons" className="hover:text-primary">
              Coupons &amp; Promotions
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground">PIZZA10</span>
          </nav>
          <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs text-success">
            ● POS Sync Live: DHA Branch #402
          </span>
        </div>
        <Card className="relative overflow-hidden p-6 shadow-sm lg:p-7">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/5 blur-2xl" />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    void navigator.clipboard?.writeText("PIZZA10");
                    notify("PIZZA10 copied.");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-high px-3.5 py-1.5 font-mono text-lg font-bold tracking-wider text-primary"
                >
                  PIZZA10
                  <ClipboardCopy className="h-4 w-4" />
                </button>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase",
                    active
                      ? "bg-success/10 text-success"
                      : "bg-surface-high text-muted-foreground",
                  )}
                >
                  ● {active ? "Active" : "Inactive"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-surface-low px-2.5 py-1 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  Non-Stackable
                </span>
              </div>
              <div>
                <h1 className="type-page-title lg:text-3xl">
                  Summer Sizzler 10% Off
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  01 Aug 2026 – 30 Sep 2026
                  <span className="rounded bg-surface-high px-2 py-0.5 text-xs font-semibold text-primary">
                    18 days remaining
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => notify("Coupon editor opened.")}
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white"
              >
                Edit Coupon
              </button>
              <button
                onClick={() =>
                  active
                    ? setShowStatusDialog(true)
                    : (setActive(true), notify("Coupon activated."))
                }
                className="inline-flex items-center gap-2 rounded-lg bg-surface-low px-4 py-2.5 text-sm font-medium text-destructive"
              >
                <Pause className="h-4 w-4" />
                {active ? "Deactivate" : "Activate"}
              </button>
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center gap-1 rounded-lg bg-surface-low px-3.5 py-2.5 text-sm"
                >
                  Actions
                  <ChevronDown className="h-4 w-4" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border bg-white py-1.5 text-xs shadow-xl">
                    <button
                      onClick={() => notify("Campaign duplicated.")}
                      className="flex w-full gap-2 px-4 py-2.5 text-left hover:bg-surface-low"
                    >
                      <Archive className="h-4 w-4" />
                      Duplicate Campaign
                    </button>
                    <button
                      onClick={() => notify("Redemption export prepared.")}
                      className="flex w-full gap-2 px-4 py-2.5 text-left hover:bg-surface-low"
                    >
                      <Download className="h-4 w-4" />
                      Export Redemptions (.csv)
                    </button>
                    <button
                      onClick={() => notify("POS slip sent to printer.")}
                      className="flex w-full gap-2 px-4 py-2.5 text-left hover:bg-surface-low"
                    >
                      <Printer className="h-4 w-4" />
                      Print POS Cashier Slip
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total Redemptions", "1,420", "/ 2,000 cap", Ticket],
            [
              "Discounts Subsidized",
              "Rs. 364,280",
              "Avg. Order Subsidy: Rs. 256.53 / ticket",
              TrendingUp,
            ],
            [
              "Attributed Revenue",
              "Rs. 3,861,400",
              "Promo Efficiency / ROAS: 10.6x gross return",
              TrendingUp,
            ],
            [
              "Attributed AOV",
              "Rs. 2,718",
              "vs. Non-coupon tickets: +18.4% uplift",
              ShoppingBag,
            ],
          ].map(([title, value, detail, Icon]) => (
            <Card key={title as string} className="p-5 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <span className="type-label-caps text-muted-foreground">
                    {title as string}
                  </span>
                  <b className="mt-2 block text-2xl">{value as string}</b>
                </div>
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 border-t pt-3 text-xs text-muted-foreground">
                {detail as string}
              </div>
              {title === "Total Redemptions" && (
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
                  <div className="h-full w-[71%] rounded-full bg-primary" />
                </div>
              )}
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Card className="flex flex-col justify-between space-y-6 p-6 shadow-sm lg:col-span-5">
            <div>
              <div className="mb-3 flex items-center justify-between border-b pb-3">
                <h2 className="type-card-title">
                  Configuration &amp; Eligibility
                </h2>
                <span className="rounded bg-surface-high px-2 py-0.5 text-xs">
                  RULESET V2
                </span>
              </div>
              <dl className="divide-y text-xs">
                {[
                  ["Discount Formula", "10% Off (Capped at Rs. 300)"],
                  ["Order Basket Threshold", "Min Rs. 1,000 | No Maximum"],
                  ["Usage Limit", "1 Redemption / Customer"],
                  ["Stacking Policy", "Strict Isolated"],
                  ["Applicable Catalog", "Signature & Specialty Pizzas"],
                  ["Location Scope", "Pizza House DHA Branch #402"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 py-2.5"
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="text-right font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-lg bg-surface-low p-3.5 text-xs text-muted-foreground">
              <div className="mb-1 flex items-center gap-2 font-medium text-foreground">
                <History className="h-4 w-4" />
                Governance &amp; Audit Log
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Created by Admin Marco</span>
                <span className="font-mono">28 Jul 2026, 14:10</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Last modified by Automation</span>
                <span className="font-mono">02 Aug 2026, 09:30</span>
              </div>
            </div>
          </Card>
          <div className="space-y-6 lg:col-span-7">
            <Card className="p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="type-card-title">Daily Redemption Velocity</h2>
                  <p className="text-xs text-muted-foreground">
                    Aggregated claims &amp; daily dinner spikes across campaign
                    timeline
                  </p>
                </div>
                <div className="flex rounded-lg bg-surface-low p-1 text-xs">
                  <button
                    onClick={() => setRange("14")}
                    className={cn(
                      "rounded px-2.5 py-1",
                      range === "14" &&
                        "bg-surface-lowest font-semibold shadow-sm",
                    )}
                  >
                    Last 14 Days
                  </button>
                  <button
                    onClick={() => setRange("run")}
                    className={cn(
                      "rounded px-2.5 py-1",
                      range === "run" &&
                        "bg-surface-lowest font-semibold shadow-sm",
                    )}
                  >
                    Entire Run
                  </button>
                </div>
              </div>
              <div className="mt-5 flex h-52 items-end gap-1.5 border-b px-1">
                {chartBars.map((height, index) => (
                  <div
                    key={index}
                    className="group relative flex h-full flex-1 items-end"
                  >
                    <div
                      className={cn(
                        "w-full rounded-t group-hover:bg-primary",
                        index === 4 ||
                          index === 5 ||
                          index === 9 ||
                          index === 10
                          ? "bg-primary"
                          : "bg-surface-high",
                      )}
                      style={{ height: `${height * 4}px` }}
                    >
                      <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-inverse-surface px-2 py-1 text-[10px] text-white group-hover:block">
                        {height * 4} Redemptions
                      </span>
                    </div>
                    <span className="mt-1 text-[9px] text-muted-foreground">
                      {index + 22}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                <span>Aug 22</span>
                <span>Aug 28</span>
                <span>Sep 01</span>
                <span>Sep 04 (Live)</span>
              </div>
            </Card>
            <Card className="flex items-center justify-between gap-4 p-5 shadow-sm">
              <div className="flex items-center gap-3.5">
                <span className="text-2xl text-primary">⏰</span>
                <div>
                  <b className="block text-xs">Peak Dinner Rush Window</b>
                  <span className="text-xs text-muted-foreground">
                    Friday &amp; Saturday{" "}
                    <b className="text-primary">7:00 PM – 10:00 PM</b>
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-surface-low px-4 py-2.5 text-right">
                <b className="block text-base">62% Volume</b>
                <span className="text-[11px] text-muted-foreground">
                  880 orders in dinner rush
                </span>
              </div>
            </Card>
          </div>
        </div>
        <Card className="overflow-hidden shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b p-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="type-card-title">
                  Recent Redemptions &amp; Usage Ledger
                </h2>
                <span className="rounded-full bg-surface-high px-2 py-0.5 text-[11px] font-bold text-primary">
                  5 New Today
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Real-time transaction log of orders redeeming PIZZA10
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => notify("Redemption CSV export prepared.")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-surface-low px-3 py-1.5 text-xs"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
              <button
                onClick={() => notify("Ledger filter opened.")}
                className="rounded-lg bg-surface-low px-3 py-1.5 text-xs"
              >
                Filter
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-xs">
              <thead className="bg-surface-low text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  {[
                    "Order #",
                    "Date & Time",
                    "Customer Details",
                    "Order Items",
                    "Gross Subtotal",
                    "Discount",
                    "Net Paid",
                    "Status",
                    "Channel",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {redemptions.map((row) => (
                  <tr key={row[0]} className="hover:bg-surface-low/60">
                    {row.map((cell, index) => (
                      <td
                        key={`${row[0]}-${index}`}
                        className={cn(
                          "px-4 py-3.5",
                          index === 0 && "font-mono font-semibold text-primary",
                          [5, 6, 7].includes(index) &&
                            "text-right font-semibold",
                          index === 8 && "text-center",
                        )}
                      >
                        <span
                          className={
                            index === 8
                              ? "rounded-full bg-success/10 px-2 py-0.5 text-[10px] text-success"
                              : undefined
                          }
                        >
                          {cell}
                        </span>
                        {index === 2 && (
                          <small className="block font-mono text-[11px] text-muted-foreground">
                            {row[3]}
                          </small>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between border-t p-4 text-xs text-muted-foreground">
            <span>
              Showing <b className="text-foreground">1 - 5</b> of{" "}
              <b className="text-foreground">1,420</b> completed redemptions
            </span>
            <span>
              ‹ &nbsp;{" "}
              <b className="rounded bg-primary px-3 py-1 text-white">1</b>{" "}
              &nbsp; 2 &nbsp; 3 &nbsp; … &nbsp; 284 &nbsp; ›
            </span>
          </div>
        </Card>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed right-6 top-20 z-50 flex items-center gap-2 rounded-lg bg-surface-lowest px-4 py-3 text-xs font-semibold shadow-xl"
        >
          <Check className="h-4 w-4 text-success" />
          {notice}
        </div>
      )}
      {showStatusDialog && (
        <CouponStatusConfirmationDialog
          onClose={() => setShowStatusDialog(false)}
          onDeactivated={() => {
            setShowStatusDialog(false);
            setActive(false);
            notify("PIZZA10 deactivated. Audit #LOG-8841 recorded.");
          }}
        />
      )}
    </div>
  );
}
