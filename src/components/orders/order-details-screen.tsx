"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bike,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Flame,
  History,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  Send,
  Soup,
  UserRound,
  Utensils,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

const steps = [
  "Placed",
  "Confirmed",
  "Preparing",
  "Baking",
  "Ready",
  "Dispatch",
  "Delivered",
];
const items = [
  {
    name: 'Chicken Tikka Pizza (Large 14")',
    badge: "Signature",
    station: "Prep Line B (Cold)",
    qty: 2,
    unit: "Rs. 1,399",
    total: "Rs. 2,798",
    modifiers: [
      "Crust: Cheese Burst (+Rs. 180)",
      "Toppings: Kalamata Olives, Wild Sautéed Mushrooms (Included Allowance)",
      "Extras: Extra Whole-Milk Mozzarella (+Rs. 150)",
    ],
    icon: Utensils,
  },
  {
    name: "Artisanal Garlic Herb Butter Bread (6 pcs)",
    station: "Station C (Sides & Fryer)",
    qty: 1,
    unit: "Rs. 250",
    total: "Rs. 250",
    modifiers: [
      "Customization: Standard recipe with extra herb seasoning glaze",
    ],
    icon: Soup,
  },
  {
    name: "House Special Garlic & Herb Whipped Dip",
    station: "Cold Dispenser",
    qty: 2,
    unit: "Rs. 75",
    total: "Rs. 150",
    modifiers: ["Chilled 60ml condiment cup"],
    icon: Soup,
  },
];

function Pipeline({ activeStep }: { activeStep: number }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[700px] items-start justify-between">
        <>
          {steps.map((step, index) => (
            <div key={step} className="flex flex-1 items-start">
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                    index < activeStep
                      ? "bg-success text-white"
                      : index === activeStep
                        ? "animate-pulse bg-primary text-white ring-4 ring-primary/20"
                        : "bg-surface-high text-muted-foreground",
                  )}
                >
                  {index < activeStep ? (
                    <Check className="h-4 w-4" />
                  ) : index === activeStep ? (
                    <Flame className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 whitespace-nowrap text-xs font-semibold",
                    index === activeStep && "text-primary",
                    index > activeStep && "text-muted-foreground",
                  )}
                >
                  {step}
                </span>
                <span className="mt-0.5 whitespace-nowrap text-[10px] text-muted-foreground">
                  {index < activeStep
                    ? ["12:42 PM", "12:44 PM", "12:48 PM"][index] || "Pending"
                    : index === activeStep
                      ? "12:48 PM"
                      : index === 5
                        ? "Rider #12"
                        : index === 6
                          ? "ETA 1:25"
                          : "Pending"}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mt-4 h-1 flex-1",
                    index < activeStep ? "bg-success" : "bg-surface-high",
                  )}
                />
              )}
            </div>
          ))}
        </>
      </div>
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-bold">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function OrderDetailsScreen() {
  const [activeStep, setActiveStep] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [delayed, setDelayed] = useState(false);
  const [note, setNote] = useState(
    "Staff Marco: Checked allergen status (Dairy confirmed for Mozzarella Burst, No nuts present on station prep line).",
  );
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };
  const advance = () => {
    setActiveStep((step) => Math.min(step + 1, steps.length - 1));
    notify("Order #10482 dispatched to the next production stage.");
  };

  return (
    <div className="min-h-full bg-background">
      <div className="bg-surface px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Dashboard</span>
              <span>/</span>
              <span>Orders</span>
              <span>/</span>
              <span className="font-semibold text-foreground">#10482</span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-high px-2.5 py-1 text-[11px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              LOCATION: PIZZA HOUSE #402 <span>·</span>
              <b className="text-primary">ACTIVE ORDER VIEW</b>
            </span>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-5 xl:flex-row xl:items-center">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-black tracking-tight lg:text-4xl">
                  Order #10482
                </h1>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  {steps[activeStep]}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                  <Clock3 className="h-3.5 w-3.5" />
                  16m elapsed
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
                <span>
                  Placed <strong>03 Sep 2026, 12:42 PM</strong>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Bike className="h-3.5 w-3.5 text-success" />
                  <strong>Delivery</strong>
                </span>
                <span>•</span>
                <span>
                  Source: <strong>Customer Web App</strong>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-medium text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  POS Synced #PH-9821
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={advance}
                className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-primary-container"
              >
                <Flame className="h-4 w-4" />
                Mark as {steps[Math.min(activeStep + 1, steps.length - 1)]}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded bg-surface-high px-3.5 py-2.5 text-sm font-semibold hover:bg-surface-highest"
              >
                <Printer className="h-4 w-4" />
                Print Kitchen Ticket
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="inline-flex items-center gap-1.5 rounded bg-surface-high px-3 py-2.5 text-sm font-semibold hover:bg-surface-highest"
                >
                  More Actions
                  <ChevronDown className="h-4 w-4" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 z-20 mt-1.5 w-52 rounded bg-surface-lowest py-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => notify("Order reassigned to Prep Line B")}
                      className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-surface-low"
                    >
                      Reassign Station
                    </button>
                    <button
                      type="button"
                      onClick={() => notify("Staff note editor opened")}
                      className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-xs hover:bg-surface-low"
                    >
                      Add Staff Note
                    </button>
                    <a
                      href="tel:+923001234567"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-surface-low"
                    >
                      <Phone className="h-4 w-4 text-success" />
                      Call Customer
                    </a>
                    <div className="my-1 h-px bg-border" />
                    <button
                      type="button"
                      onClick={() =>
                        notify("Cancellation request queued for review")
                      }
                      className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-xs text-destructive hover:bg-destructive/10"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <Card className="p-5 shadow-sm lg:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="type-label-caps text-muted-foreground">
                Production Pipeline
              </span>
              <span className="text-xs font-medium text-primary">
                Station SLA: Target 22m / Max 30m
              </span>
            </div>
            <Pipeline activeStep={activeStep} />
            <div className="mt-4 flex items-center gap-3 rounded bg-surface-low px-4 py-3 text-xs">
              <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex-1">
                <b>Prep Line Alert:</b>{" "}
                <span className="text-muted-foreground">
                  Order has been in prep line for 10 minutes. Recommended oven
                  dispatch in <strong>2 mins</strong> to preserve delivery
                  commitment.
                </span>
              </div>
              <button
                type="button"
                onClick={() => notify("Reminder pushed to Prep Line B Screen")}
                className="rounded bg-surface-high px-2.5 py-1 text-[11px] font-semibold"
              >
                Ping Station
              </button>
            </div>
          </Card>
          <Card className="overflow-hidden p-5 shadow-sm lg:p-6">
            <SectionTitle
              title="Line Item Breakdown"
              subtitle="3 billable items across 3 prep stations"
              action={
                <span className="rounded bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">
                  All stations acknowledged
                </span>
              }
            />
            <div className="-mx-5 overflow-x-auto lg:-mx-6">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="bg-surface-low text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 lg:px-6">Item & Specifications</th>
                    <th className="px-4 py-3">Station</th>
                    <th className="px-3 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Unit Price</th>
                    <th className="px-5 py-3 text-right lg:px-6">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <tr key={item.name} className="hover:bg-surface-low">
                        <td className="px-5 py-4 align-top lg:px-6">
                          <div className="flex items-start gap-3">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                              <ItemIcon className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5 text-sm font-bold">
                                {item.name}
                                {item.badge && (
                                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                                {item.modifiers.map((modifier, index) => (
                                  <div
                                    key={modifier}
                                    className="flex items-start gap-1.5"
                                  >
                                    <span
                                      className={cn(
                                        "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                                        index === 1
                                          ? "bg-success"
                                          : "bg-primary",
                                      )}
                                    />
                                    <span>{modifier}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 align-top">
                          <span className="inline-flex items-center gap-1 rounded bg-surface-high px-2.5 py-1 text-xs font-medium">
                            <Utensils className="h-3.5 w-3.5" />
                            {item.station}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-center align-top font-bold">
                          ×{item.qty}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right align-top text-xs text-muted-foreground">
                          <div>{item.unit}</div>
                          {item.qty === 2 && (
                            <div className="text-[10px]">+Rs. 330 mod</div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right align-top text-sm font-bold lg:px-6">
                          {item.total}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-surface-high p-4">
              <div className="mb-2 flex items-center gap-2">
                <UserRound className="h-5 w-5 text-primary" />
                <h3 className="type-label-caps">Customer Special Request</h3>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                “Please ensure the pizza is well-done/crispy crust. Apartment
                gate code is{" "}
                <strong className="rounded bg-surface px-1.5 py-0.5 text-primary">
                  #4092
                </strong>
                . Please don&apos;t ring doorbell after delivery.”
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Acknowledged by Front-of-House Dispatch
              </div>
            </Card>
            <Card className="bg-surface-high p-4">
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <h3 className="type-label-caps">Kitchen Internal Log</h3>
              </div>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="min-h-20 w-full resize-none bg-transparent text-sm leading-relaxed outline-none"
              />
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Station Line B Logged</span>
                <button
                  type="button"
                  onClick={() => notify("Internal shift note appended")}
                  className="font-bold text-primary"
                >
                  + Append Note
                </button>
              </div>
            </Card>
          </div>
          <Card className="p-5 shadow-sm lg:p-6">
            <SectionTitle
              title="Fiscal Breakdown"
              subtitle="Tax Invoice #INV-2026-8891"
              action={
                <span className="inline-flex items-center gap-2 rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
                  <span className="h-2 w-2 rounded-full bg-warning" />
                  Payment Pending: Collect on Delivery
                </span>
              }
            />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2.5 text-xs text-muted-foreground">
                <div className="flex justify-between py-1">
                  <span>Items Subtotal:</span>
                  <b className="text-foreground">Rs. 3,198</b>
                </div>
                <div className="flex justify-between py-1">
                  <span>Customization Upcharges:</span>
                  <b className="text-foreground">+Rs. 330</b>
                </div>
                <div className="flex justify-between py-1">
                  <span>Standard Delivery Fee (Sector Y):</span>
                  <b className="text-foreground">Rs. 200</b>
                </div>
                <div className="flex justify-between py-1 text-success">
                  <span>Promo Voucher (PIZZA10)</span>
                  <b>-Rs. 352</b>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg bg-surface-low p-4">
                <div>
                  <span className="type-label-caps text-muted-foreground">
                    Net Payable by Customer
                  </span>
                  <div className="mt-1 text-3xl font-black">Rs. 3,376</div>
                </div>
                <div className="flex items-center justify-between pt-3 text-xs">
                  <span className="font-semibold">Cash on Delivery (COD)</span>
                  <span className="rounded bg-surface-high px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
                    Exact change requested
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Card className="p-5 shadow-sm lg:p-6">
            <div className="flex items-center justify-between">
              <span className="type-label-caps text-muted-foreground">
                Guest Profile & Dispatch
              </span>
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-black uppercase text-success">
                VIP Tier
              </span>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-highest text-lg font-bold">
                AK
              </div>
              <div>
                <h3 className="font-bold">
                  Ahmed Khan{" "}
                  <CheckCircle2 className="ml-1 inline h-4 w-4 text-success" />
                </h3>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  18 previous orders · 0 canceled
                </div>
                <div className="mt-1 font-mono text-xs font-semibold">
                  +92 300 1234567
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="tel:+923001234567"
                className="inline-flex items-center justify-center gap-1.5 rounded bg-surface-high py-2 text-xs font-bold"
              >
                <Phone className="h-4 w-4 text-primary" />
                Call Phone
              </a>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded bg-success py-2 text-xs font-bold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
            <div className="my-4 h-px bg-border" />
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="text-xs">
                <b>Delivery Address</b>
                <p className="mt-0.5 leading-relaxed text-muted-foreground">
                  House #14-B, Street 7, Sector Y, DHA Phase 6, Lahore.
                </p>
              </div>
            </div>
            <div className="relative mt-3 h-32 overflow-hidden rounded bg-[linear-gradient(135deg,#d9e3df,#b6cdc6_45%,#d7c8b7)]">
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(30deg,transparent_45%,#fff_46%,#fff_48%,transparent_49%),linear-gradient(120deg,transparent_45%,#fff_46%,#fff_48%,transparent_49%)]" />
              <span className="absolute bottom-2 left-2 rounded bg-surface/90 px-2 py-0.5 text-[10px] font-bold">
                Sector Y Area Zone (3.4 km)
              </span>
            </div>
            <div className="mt-3 space-y-2 rounded bg-surface-low p-3 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span>Assigned Rider</span>
                <span className="text-primary">Approaching Branch</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  #12
                </div>
                <div className="flex-1">
                  <b>Tariq Mehmood</b>
                  <div className="text-[11px] text-muted-foreground">
                    Hero Honda 125 · <span className="font-mono">LEA-4921</span>
                  </div>
                </div>
                <div className="text-right">
                  <b className="text-xs text-primary">ETA 1:25 PM</b>
                  <div className="text-[10px] text-muted-foreground">
                    in 27 mins
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-primary/10 to-surface-high p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Send className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Next Transition Helper</h4>
                <p className="mt-1 text-xs leading-normal text-muted-foreground">
                  Assembly completed on Line B? Advance status now to alert Chef
                  Imran at the stone deck ovens.
                </p>
              </div>
            </div>
            <div className="mt-3.5 flex gap-2">
              <button
                type="button"
                onClick={advance}
                className="flex-1 rounded bg-primary py-2 text-xs font-bold text-white"
              >
                Dispatch to Oven
              </button>
              <button
                type="button"
                onClick={() => {
                  setDelayed(true);
                  notify(
                    "Order delayed alert sent to customer dispatch view (+10 mins)",
                  );
                }}
                className="rounded bg-surface px-3 py-2 text-xs font-medium"
              >
                +10m Delay
              </button>
            </div>
            {delayed && (
              <p className="mt-2 text-[11px] font-semibold text-primary">
                Delay alert active for dispatch.
              </p>
            )}
          </Card>
          <Card className="p-5 shadow-sm lg:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="type-label-caps text-muted-foreground">
                Audit Log & Timeline
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                Sync live
              </span>
            </div>
            <div className="relative space-y-4 pl-5 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-0.5 before:bg-surface-high">
              {[
                [
                  "Status: PREPARING",
                  "12:48 PM",
                  "Chef Marco claimed ticket on Prep Line B terminal.",
                  "bg-primary",
                ],
                [
                  "Routing Dispatched",
                  "12:45 PM",
                  "Automated split: Station B (Pizza), Station C (Sides), Dispenser.",
                  "bg-success",
                ],
                [
                  "Order Confirmed",
                  "12:44 PM",
                  "Shift Manager approved order & validated delivery radius.",
                  "bg-success",
                ],
                [
                  "Web Checkout Created",
                  "12:42 PM",
                  "Customer Ahmed Khan placed order via mobile web client (v4.1.2).",
                  "bg-muted-foreground",
                ],
              ].map(([title, time, description, color]) => (
                <div key={title as string} className="relative text-xs">
                  <span
                    className={cn(
                      "absolute -left-5 top-1 h-2.5 w-2.5 rounded-full ring-4 ring-surface-lowest",
                      color as string,
                    )}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <b>{title as string}</b>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {time as string}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {description as string}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center border-t pt-3">
              <button
                type="button"
                onClick={() =>
                  notify(
                    "Full server audit trail loaded. 14 system checkpoints passed.",
                  )
                }
                className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary"
              >
                <History className="h-3.5 w-3.5" />
                View Full Raw Event Log
              </button>
            </div>
          </Card>
        </div>
      </div>
      {notice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-inverse-surface px-4 py-3 text-xs font-semibold text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-success" />
          {notice}
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
