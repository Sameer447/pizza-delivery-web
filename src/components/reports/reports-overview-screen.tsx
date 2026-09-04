"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  FileText,
  Flame,
  Store,
  TrendingUp,
  Utensils,
  X,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

const kpis = [
  [
    "Net Settled Revenue",
    "Rs. 14,892,450",
    "+14.8%",
    "Delta: +Rs. 1,920,300 vs Jul",
    "Gross: Rs. 16.2M • Discounts: -Rs. 1.3M",
  ],
  [
    "Fleet Order Volume",
    "5,842 Orders",
    "+8.2%",
    "Net change: +442 orders",
    "Daily Run: 194.7/day • Peak Day: 284 (Sat 16)",
  ],
  [
    "Average Order Value (AOV)",
    "Rs. 2,549",
    "+6.1%",
    "Basket Expansion: +Rs. 146/ticket",
    "Delivery: Rs. 2,718 • Takeaway: Rs. 1,980 • Dine-in: Rs. 3,140",
  ],
  [
    "Active Patrons",
    "3,410 Guests",
    "+12.4%",
    "68% Repeat Guests (2,318) • 32% First-time (1,092)",
    "Net Growth: +376 Patrons • 30-day LTV: Rs. 4,367",
  ],
  [
    "Fulfillment Completion",
    "96.4% (5,632 Orders)",
    "Stable",
    "Cancellation Rate: 2.1% (122 orders)",
    "Void: 0.8% • Address Reject: 0.7% • Out of Stock: 0.6%",
  ],
  [
    "On-Time Delivery SLA",
    "92.8% On-Time",
    "+Target: 90%",
    "Avg Delivery: 28.4 mins • Kitchen Prep: 14.2 mins",
    "Dispatch Hand-off: 3.1 min • Transit Time: 11.1 min",
  ],
];

export function ReportsOverviewScreen() {
  const [scope, setScope] = useState("All Branches (Global Fleet)");
  const [date, setDate] = useState("Last 30 Days (01 Aug - 30 Aug 2026)");
  const [compare, setCompare] = useState(true);
  const [exportOpen, setExportOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                  Executive Command Center
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  • Fleet Telemetry REPORT-01 / 02
                </span>
              </div>
              <h1 className="type-page-title lg:text-3xl">
                Reports &amp; Analytics
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground lg:text-sm">
                Monitor revenue, order throughput, patron retention, menu
                performance, and delivery SLA velocity.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => notify("Two report filters are active.")}
                className="inline-flex items-center gap-2 rounded bg-surface-high px-3.5 py-2 text-xs font-semibold"
              >
                <span className="text-primary">☷</span>Filters{" "}
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  2
                </span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setExportOpen(!exportOpen)}
                  className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-xs font-semibold text-white"
                >
                  <Download className="h-4 w-4" />
                  Export Report
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {exportOpen && (
                  <div className="absolute right-0 z-30 mt-1.5 w-52 rounded-lg border bg-white p-1.5 text-xs shadow-xl">
                    <button
                      onClick={() => notify("CSV spreadsheet export prepared.")}
                      className="flex w-full items-center gap-2 rounded px-3 py-2 hover:bg-surface-low"
                    >
                      <FileText className="h-4 w-4 text-primary" />
                      CSV Spreadsheet (.csv)
                    </button>
                    <button
                      onClick={() => notify("Executive brief export prepared.")}
                      className="flex w-full items-center gap-2 rounded px-3 py-2 hover:bg-surface-low"
                    >
                      <Download className="h-4 w-4 text-primary" />
                      Executive Brief (.pdf)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Card className="flex flex-col justify-between gap-3 p-3 shadow-sm xl:flex-row xl:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-2 rounded bg-surface-low px-3 py-1.5 text-xs font-semibold">
                <Store className="h-4 w-4 text-muted-foreground" />
                <select
                  value={scope}
                  onChange={(event) => setScope(event.target.value)}
                  className="bg-transparent outline-none"
                >
                  <option>All Branches (Global Fleet)</option>
                  <option>Pizza House DHA #402</option>
                  <option>Gulberg Galleria Flagship</option>
                  <option>Bahria Town Express</option>
                </select>
              </label>
              <label className="inline-flex items-center gap-2 rounded bg-surface-low px-3 py-1.5 text-xs font-semibold">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <select
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="bg-transparent outline-none"
                >
                  <option>Last 30 Days (01 Aug - 30 Aug 2026)</option>
                  <option>Last 7 Days</option>
                  <option>This Month to Date</option>
                  <option>Previous Fiscal Quarter</option>
                </select>
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded bg-surface-high/60 px-3 py-1.5 text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={compare}
                  onChange={(event) => setCompare(event.target.checked)}
                  className="accent-primary"
                />
                Compare: Previous Period (02 Jul - 31 Jul 2026)
              </label>
            </div>
            <span className="text-right font-mono text-[11px] text-muted-foreground">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-success" />
              Sync: T-4s ago • 100% telemetry healthy
            </span>
          </Card>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-b text-xs">
          {[
            ["Overview", "/reports"],
            ["Revenue Velocity", "/reports/revenue-fleet"],
            ["Live Orders & Throughput", "/reports/orders-delivery"],
            ["Customer Retention", "/reports/menu-economics"],
            ["Menu Item Performance", "/reports/menu-economics"],
            ["Kitchen & Delivery Ops", "/reports/orders-delivery"],
            ["Multi-Restaurant Fleet", "/reports/revenue-fleet"],
          ].map(([label, href], index) => (
            <Link
              key={`${label}-${index}`}
              href={href}
              className={cn(
                "whitespace-nowrap rounded-t px-4 py-2",
                index === 0
                  ? "border-b-2 border-primary bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-surface-low hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
          {kpis.map(([title, value, trend, detail, footer], index) => (
            <Card key={title} className="overflow-hidden p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <span className="type-label-caps text-muted-foreground">
                    {title}
                  </span>
                  <b className="mt-1 block text-2xl tracking-tight">{value}</b>
                </div>
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-[11px] font-bold",
                    index === 4
                      ? "bg-surface-high text-foreground"
                      : "bg-success/10 text-success",
                  )}
                >
                  {trend}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>{detail}</span>
                <TrendingUp className="h-4 w-4 shrink-0 text-success" />
              </div>
              <div className="mt-3 -mx-4 -mb-4 border-t bg-surface-low px-4 py-2 text-[11px] text-muted-foreground">
                {footer}
              </div>
            </Card>
          ))}
        </div>
        <Card className="p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h2 className="type-label-caps">
                Operational Health &amp; Anomaly Triage
              </h2>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                3 Action Items
              </span>
            </div>
            <button
              onClick={() => notify("Non-critical anomalies dismissed.")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Dismiss Non-Critical
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              [
                "Oven Deck #2 Bottleneck",
                "Average prep time peaked at 18.5 mins during Friday dinner surge.",
                Flame,
                "DHA #402",
              ],
              [
                "Cheese Burst SKU Depletion",
                "Mozzarella core stock dropped to zero. 14 orders were altered.",
                Utensils,
                "Bahria Town",
              ],
              [
                "Late Night SLA High Peak",
                "SLA achieved 96.1% on-time between 23:00 and 03:00.",
                Zap,
                "Gulberg Galleria",
              ],
            ].map(([title, body, Icon, branch], index) => (
              <div
                key={title as string}
                className="flex items-start gap-3 rounded bg-surface-low p-3"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded",
                    index === 0
                      ? "bg-primary/10 text-primary"
                      : index === 1
                        ? "bg-surface-high text-secondary"
                        : "bg-success/10 text-success",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-bold">
                    <span>{title as string}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {branch as string}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    {body as string}
                  </p>
                  <button
                    onClick={() => notify(`${title} action opened.`)}
                    className="mt-2 text-[10px] font-bold text-primary hover:underline"
                  >
                    Review action →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="type-card-title">
                Revenue Velocity &amp; Demand Wave
              </h2>
              <p className="text-xs text-muted-foreground">
                Comparative pacing of current 30 days vs prior cycle with dinner
                rush inflection points.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-primary" />
                Current (Aug: Rs. 14.89M)
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-3 border-t border-dashed border-secondary" />
                Previous (Jul: Rs. 12.97M)
              </span>
            </div>
          </div>
          <div className="relative mt-5 flex h-72 items-end gap-2 rounded-lg bg-surface-low/50 px-3 pb-8 pt-6">
            {[38, 44, 42, 52, 48, 60, 55, 68, 64, 78, 72, 88, 82, 96].map(
              (height, index) => (
                <div
                  key={index}
                  className="group relative flex h-full flex-1 items-end"
                >
                  <div
                    className={cn(
                      "w-full rounded-t transition-colors group-hover:bg-primary-container",
                      index > 9 ? "bg-primary" : "bg-primary/55",
                    )}
                    style={{ height: `${height}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-inverse-surface px-2 py-1 text-[10px] text-white group-hover:block">
                      Rs. {height * 6},400
                    </span>
                  </div>
                </div>
              ),
            )}
            <div className="absolute inset-x-3 bottom-2 flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>01 Aug</span>
              <span>05 Aug</span>
              <span>10 Aug</span>
              <span>15 Aug (Peak)</span>
              <span>20 Aug</span>
              <span>25 Aug</span>
              <span>30 Aug (Today)</span>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <h3 className="type-card-title">Order Channel Share</h3>
              <span className="text-[11px] text-muted-foreground">
                By Ticket Count
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Proprietary delivery vs self-pickup takeaway orders.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <div
                className="flex h-28 w-28 items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(hsl(var(--primary)) 74%, hsl(var(--surface-high)) 0)",
                }}
              >
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-surface-lowest">
                  <b className="text-base">74%</b>
                  <span className="text-[9px] uppercase text-muted-foreground">
                    Delivery
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span>● Delivery Fleet</span>
                  <b>74%</b>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>4,323 Orders</span>
                  <span>Rs. 11.75M</span>
                </div>
                <div className="flex justify-between">
                  <span>● Takeaway Pickup</span>
                  <b>26%</b>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>1,519 Orders</span>
                  <span>Rs. 3.14M</span>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded bg-surface-low p-2.5 text-[11px]">
              Delivery Ticket Premium: <b>+37.2% larger AOV</b>
            </div>
          </Card>
          <Card className="p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <h3 className="type-card-title">Top Revenue Drivers</h3>
              <span className="text-[11px] font-semibold text-primary">
                Full 50+ Menu →
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Highest grossing pizza recipes and crust modifier attachments.
            </p>
            <div className="mt-4 space-y-3">
              {[
                ["Chicken Tikka Supreme (Large)", "Rs. 4,120,800", "82%"],
                ["Pepperoni Overload Extreme", "Rs. 2,984,500", "61%"],
                ["Cheese Burst Rim Upgrade", "Rs. 1,489,200", "38%"],
              ].map(([label, value, width], index) => (
                <div key={label}>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>
                      {index + 1}. {label}
                    </span>
                    <span className="font-mono">{value}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {
                      [
                        "1,840 units sold",
                        "1,210 units sold",
                        "3,310 add-ons (56.6% attach)",
                      ][index]
                    }{" "}
                    • Margin: {["64.2%", "59.8%", "78.1%"][index]}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <h3 className="type-card-title">Payment Settlement</h3>
              <span className="text-[11px] text-muted-foreground">
                Reconciled
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Consumer settlement gateway vs Cash On Delivery.
            </p>
            <div className="mt-4 space-y-3">
              {[
                ["Online Card & PayFast", "58%", "Rs. 8,637,621"],
                ["Cash on Delivery (COD)", "34%", "Rs. 5,063,433"],
                ["POS Counter & Self-Kiosk", "8%", "Rs. 1,191,396"],
              ].map(([label, percent, value]) => (
                <div key={label} className="rounded bg-surface-low p-2.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{label}</span>
                    <span>{percent}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                    <span>{value}</span>
                    <span>Settlement reconciled</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded bg-surface-low p-2.5 text-[11px]">
              Payment Gateway Fee Burden:{" "}
              <b className="text-primary">1.42% (Rs. 211,472)</b>
            </div>
          </Card>
        </div>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed right-6 top-20 z-50 flex items-center gap-2 rounded-lg bg-surface-lowest px-4 py-3 text-xs font-semibold shadow-xl"
        >
          <Check className="h-4 w-4 text-success" />
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
