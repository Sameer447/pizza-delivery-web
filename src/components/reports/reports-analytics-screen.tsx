"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BarChart3,
  Check,
  ChevronDown,
  Download,
  FileText,
  Store,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

export type ReportView =
  "overview" | "revenue-fleet" | "orders-delivery" | "menu-economics";
const reportMeta: Record<
  ReportView,
  { title: string; description: string; report: string }
> = {
  overview: {
    title: "Reports & Analytics",
    description:
      "Monitor revenue, order throughput, patron retention, menu performance, and delivery SLA velocity.",
    report: "Executive overview",
  },
  "revenue-fleet": {
    title: "Revenue Analytics & Fleet Comparison",
    description:
      "Fiscal settlement, discount subsidies, payment breakdown, and cross-branch unit economics.",
    report: "Revenue & fleet",
  },
  "orders-delivery": {
    title: "Orders & Delivery Performance Analytics",
    description:
      "Real-time kitchen lifecycle velocity, station bottlenecks, courier SLA dispatch timings, and fulfillment metrics.",
    report: "Orders & delivery",
  },
  "menu-economics": {
    title: "Menu Economics & Customer Retention",
    description:
      "Item profitability, modifier attach rates, 86'd stock impact, and patron lifetime value cohorts.",
    report: "Menu economics",
  },
};
const datasets: Record<ReportView, [string, string, string, string][]> = {
  overview: [
    [
      "Gross Revenue",
      "Rs. 8.42M",
      "+14.2% MoM",
      "Revenue velocity is above target",
    ],
    ["Completed Orders", "4,820", "+8.6% MoM", "Fulfillment throughput"],
    ["Active Patrons", "3,620", "+12.1% MoM", "90-day ordering cohort"],
    ["Avg. Delivery SLA", "31.4 min", "-4.8% MoM", "Within 35 min target"],
  ],
  "revenue-fleet": [
    ["Gross Revenue", "Rs. 8.42M", "+14.2%", "Across 3 active branches"],
    ["Net Captured", "Rs. 7.96M", "+12.8%", "After discounts and refunds"],
    ["Avg. Order Value", "Rs. 2,718", "+6.4%", "Cross-branch average"],
    ["Fleet Contribution", "38.6%", "DHA #402", "Highest revenue node"],
  ],
  "orders-delivery": [
    ["Orders Processed", "4,820", "+8.6%", "30-day fulfillment volume"],
    ["On-Time Delivery", "94.2%", "+3.1%", "Courier SLA compliance"],
    ["Avg. Kitchen Time", "18.6 min", "-6.4%", "From accept to ready"],
    ["Active Exceptions", "42", "-12 today", "Requires dispatch review"],
  ],
  "menu-economics": [
    ["Top Seller Units", "1,240", "+14.2%", "Chicken Tikka Pizza"],
    ["Highest Gross Margin", "74%", "+Rs. 180", "Cheese Burst Stuffed"],
    ["Modifier Attach Rate", "61.2%", "+4.8%", "Garlic Bread leading"],
    ["At-Risk SKU", "28 units", "86 alert", "Gluten-Free Veggie"],
  ],
};
const rows = [
  "Chicken Tikka Pizza",
  "Pepperoni Supreme",
  "BBQ Chicken Feast",
  "Margherita Extra",
  "Truffle Mushroom",
];

export function ReportsAnalyticsScreen({ view }: { view: ReportView }) {
  const meta = reportMeta[view];
  const [period, setPeriod] = useState("Last 30 Days");
  const [category, setCategory] = useState("All Categories");
  const [exportOpen, setExportOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const chartValues =
    view === "orders-delivery"
      ? [38, 52, 45, 62, 58, 76, 68, 82, 74, 91, 86, 96]
      : view === "menu-economics"
        ? [44, 52, 48, 70, 64, 78, 72, 86, 80, 92, 88, 96]
        : [42, 48, 55, 50, 64, 58, 74, 70, 82, 78, 90, 96];
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <nav className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Link href="/dashboard" className="hover:text-primary">
                Dashboard
              </Link>
              <span>›</span>
              <span>Reports &amp; Analytics</span>
              <span>›</span>
              <span className="font-semibold text-primary">{meta.report}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="type-page-title lg:text-3xl">{meta.title}</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                Live Sync Active
              </span>
            </div>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
              {meta.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-surface-low px-3.5 py-2 text-xs font-semibold">
              <Store className="h-4 w-4 text-primary" />
              Pizza House - DHA Branch #402
            </span>
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="rounded-lg bg-surface-low px-3 py-2 text-xs font-semibold outline-none"
            >
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
            <div className="relative">
              <button
                onClick={() => setExportOpen(!exportOpen)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white"
              >
                <Download className="h-4 w-4" />
                Export Report
                <ChevronDown className="h-4 w-4" />
              </button>
              {exportOpen && (
                <div className="absolute right-0 z-20 mt-2 w-52 rounded-lg border bg-white p-1 shadow-xl">
                  <button
                    onClick={() => notify("CSV export prepared.")}
                    className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs hover:bg-surface-low"
                  >
                    <FileText className="h-4 w-4" />
                    CSV data export
                  </button>
                  <button
                    onClick={() => notify("Executive PDF export prepared.")}
                    className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs hover:bg-surface-low"
                  >
                    <Download className="h-4 w-4" />
                    Executive PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {datasets[view].map(([title, value, trend, detail], index) => (
            <Card
              key={title}
              className="relative overflow-hidden p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="type-label-caps text-muted-foreground">
                    {title}
                  </span>
                  <b
                    className={cn(
                      "mt-2 block text-2xl",
                      index === 3 &&
                        view === "menu-economics" &&
                        "text-destructive",
                    )}
                  >
                    {value}
                  </b>
                </div>
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    index === 3 && view === "menu-economics"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-surface-high text-primary",
                  )}
                >
                  {index === 2 ? (
                    <Users className="h-5 w-5" />
                  ) : index === 3 ? (
                    <Zap className="h-5 w-5" />
                  ) : (
                    <TrendingUp className="h-5 w-5" />
                  )}
                </span>
              </div>
              <div className="mt-4 flex justify-between border-t pt-3 text-xs">
                <span
                  className={cn(
                    "font-semibold",
                    trend.startsWith("-") ? "text-success" : "text-primary",
                  )}
                >
                  {trend}
                </span>
                <span className="text-muted-foreground">{detail}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
                <div
                  className={cn(
                    "h-full rounded-full",
                    index === 3 && view === "menu-economics"
                      ? "bg-destructive"
                      : "bg-primary",
                  )}
                  style={{ width: `${[82, 74, 68, 54][index]}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
        <Card className="p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="type-section-title">
                {view === "menu-economics"
                  ? "REPORT-06: Menu Item Performance & Modifier Attach Dynamics"
                  : view === "orders-delivery"
                    ? "Kitchen Lifecycle Velocity & Delivery SLA"
                    : view === "revenue-fleet"
                      ? "Revenue Trend & Contribution Analysis"
                      : "Revenue Velocity & Demand Wave"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Aggregated operational intelligence for {period.toLowerCase()}.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-lg bg-surface-low px-3 py-2 text-xs outline-none"
              >
                <option>All Categories</option>
                <option>Signature</option>
                <option>Classics</option>
                <option>Sides &amp; Drinks</option>
              </select>
              <button
                onClick={() => notify("Report filters reset.")}
                className="rounded-lg bg-surface-low px-3 py-2 text-xs font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex h-56 items-end gap-2 border-b px-2">
                {chartValues.map((value, index) => (
                  <div
                    key={index}
                    className="group relative flex h-full flex-1 items-end"
                  >
                    <div
                      className={cn(
                        "w-full rounded-t transition-colors group-hover:bg-primary-container",
                        index > 7 ? "bg-primary" : "bg-surface-high",
                      )}
                      style={{ height: `${value}%` }}
                    >
                      <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-inverse-surface px-2 py-1 text-[10px] text-white group-hover:block">
                        {value * 10} events
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                <span>01 Aug</span>
                <span>08 Aug</span>
                <span>15 Aug</span>
                <span>22 Aug</span>
                <span>30 Aug</span>
              </div>
            </div>
            <div className="space-y-3 rounded-lg bg-surface-low p-4 lg:col-span-4">
              <div className="flex items-center gap-2 text-xs font-bold">
                <BarChart3 className="h-4 w-4 text-primary" />
                Operational Signals
              </div>
              {[
                ["Peak demand window", "7:00 PM – 10:00 PM", "text-primary"],
                ["Target attainment", "92.4% on track", "text-success"],
                ["Variance to plan", "+6.8% favorable", "text-success"],
                [
                  "Data freshness",
                  "Synced 4 mins ago",
                  "text-muted-foreground",
                ],
              ].map(([label, value, color]) => (
                <div
                  key={label}
                  className="flex justify-between border-b pb-2 text-xs last:border-0"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <b className={color}>{value}</b>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
            <div>
              <h2 className="type-section-title">
                {view === "menu-economics"
                  ? "Top Performing Pizzas & Modifier Attachment"
                  : view === "orders-delivery"
                    ? "Station & Courier Performance Matrix"
                    : view === "revenue-fleet"
                      ? "Multi-Restaurant Fleet Performance Matrix"
                      : "Executive KPI Distribution & Branch Health"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Detailed breakdown by operational unit and performance health.
              </p>
            </div>
            <button
              onClick={() => notify("Detailed diagnostic view opened.")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View full diagnostic →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead className="bg-surface-low text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  {(view === "menu-economics"
                    ? [
                        "Menu Item",
                        "Category",
                        "Units Sold",
                        "Gross Revenue",
                        "ASP",
                        "Modifier Attach",
                        "Availability",
                        "Health",
                      ]
                    : [
                        "Operational Unit",
                        "Orders / Volume",
                        "Revenue",
                        "Target",
                        "Variance",
                        "Last Sync",
                        "Health",
                      ]
                  ).map((heading) => (
                    <th key={heading} className="px-4 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((item, index) => (
                  <tr key={item} className="hover:bg-surface-low/60">
                    <td className="px-4 py-3.5">
                      <b>{item}</b>
                      <span className="block text-[11px] text-muted-foreground">
                        SKU: PIZ-{index + 1}0
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">
                      {view === "menu-economics"
                        ? index % 2
                          ? "Classics"
                          : "Signature"
                        : `Branch #40${index + 1}`}
                    </td>
                    <td className="px-4 py-3.5 font-semibold">
                      {["1,240", "980", "710", "650", "124"][index]}
                    </td>
                    <td className="px-4 py-3.5 font-semibold">
                      Rs.{" "}
                      {
                        [
                          "1,850,000",
                          "1,421,000",
                          "994,000",
                          "747,500",
                          "235,600",
                        ][index]
                      }
                    </td>
                    <td className="px-4 py-3.5">
                      {view === "menu-economics"
                        ? "Rs. 1,492"
                        : `${[94, 91, 87, 83, 78][index]}%`}
                    </td>
                    <td className="px-4 py-3.5 text-primary">
                      {view === "menu-economics"
                        ? `${[78, 62, 54, 49, 21][index]}.4%`
                        : `+${[14, 11, 8, 6, 3][index]}.2%`}
                    </td>
                    <td className="px-4 py-3.5 text-success">
                      ● {index === 2 ? "2 exceptions" : "On track"}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold",
                          index === 4
                            ? "bg-destructive/10 text-destructive"
                            : "bg-success/10 text-success",
                        )}
                      >
                        {index === 4 ? "REVIEW" : "HEALTHY"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="p-5 shadow-sm">
            <h3 className="type-card-title">Customer Retention Cohorts</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Behavioral segmentation based on frequency, spend, and lapse risk.
            </p>
            <div className="mt-4 space-y-3">
              {[
                ["VIP / Power Diners", "480 patrons", "44%", "bg-primary"],
                ["Regulars", "1,140 patrons", "36%", "bg-secondary"],
                ["First-Time", "1,790 patrons", "34% repeat", "bg-success"],
              ].map(([label, value, share, color]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">{label}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-surface">
                    <div
                      className={cn("h-full rounded-full", color)}
                      style={{ width: share.replace("% repeat", "%") }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5 shadow-sm">
            <h3 className="type-card-title">Operational Anomaly Triage</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Items requiring an operator decision before the next shift.
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="rounded bg-destructive/10 p-2.5 text-destructive">
                <b>86&apos; alert:</b> Gluten-Free Veggie waste margin is 38%.
              </div>
              <div className="rounded bg-surface-low p-2.5">
                <b>Delivery:</b> 3 zones exceeded 35-minute SLA.
              </div>
              <div className="rounded bg-success/10 p-2.5 text-success">
                <b>Resolved:</b> DHA branch stock sync acknowledged.
              </div>
            </div>
          </Card>
          <Card className="flex flex-col justify-between p-5 shadow-sm">
            <div>
              <h3 className="type-card-title">
                Export Operational Intelligence
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Compile this report into a shareable data sheet or executive
                PDF.
              </p>
            </div>
            <button
              onClick={() =>
                notify("Export job queued and ready in approximately 2.4s.")
              }
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white"
            >
              <Download className="h-4 w-4" />
              Download Export
            </button>
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
