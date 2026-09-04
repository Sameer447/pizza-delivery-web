"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Check,
  CircleHelp,
  Clock3,
  Info,
  Bike,
  Percent,
  RefreshCw,
  Save,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type DiscountType = "percent" | "fixed" | "delivery";
const categories = [
  "Signature Pizzas",
  "Classic Pizzas",
  "Deep Dish Gourmet",
  "Sides & Beverages",
  "Dessert Calzones",
];
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function TextField({
  label,
  value,
  onChange,
  helper,
  prefix,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
  prefix?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="type-label-caps text-muted-foreground">{label}</span>
      <div className="flex items-center rounded-lg bg-surface-low">
        <>
          {prefix && (
            <span className="pl-3.5 text-xs font-bold text-muted-foreground">
              {prefix}
            </span>
          )}
        </>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={type}
          className={cn(
            "w-full bg-transparent px-3 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary",
            prefix && "pl-2",
          )}
        />
      </div>
      {helper && (
        <span className="text-[11px] text-muted-foreground">{helper}</span>
      )}
    </label>
  );
}

function Section({
  number,
  title,
  aside,
  children,
}: {
  number: string;
  title: string;
  aside: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col gap-5 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-high text-xs font-bold text-primary">
            {number}
          </span>
          <h2 className="type-card-title">{title}</h2>
        </div>
        <span className="type-label-caps text-muted-foreground">{aside}</span>
      </div>
      {children}
    </Card>
  );
}

export function CreateCouponScreen() {
  const [code, setCode] = useState("WEEKEND50");
  const [name, setName] = useState("Weekend Family Feast 15% Off");
  const [description, setDescription] = useState(
    "Valid across signature pizza categories during peak weekend dinner windows (5:00 PM - 11:30 PM). Minimum order requirement applies.",
  );
  const [status, setStatus] = useState<"active" | "draft">("active");
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [discountValue, setDiscountValue] = useState("15");
  const [cap, setCap] = useState("400");
  const [minSubtotal, setMinSubtotal] = useState("1200");
  const [maxSubtotal, setMaxSubtotal] = useState("");
  const [globalLimit, setGlobalLimit] = useState("500");
  const [perCustomer, setPerCustomer] = useState("1");
  const [selectedCategories, setSelectedCategories] = useState(
    categories.slice(0, 2),
  );
  const [tier, setTier] = useState("all");
  const [firstOrderOnly, setFirstOrderOnly] = useState(true);
  const [stacking, setStacking] = useState(false);
  const [days, setDays] = useState(["Fri", "Sat", "Sun"]);
  const [scope, setScope] = useState("current");
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };
  const updateDiscountType = (type: DiscountType) => {
    setDiscountType(type);
    setDiscountValue(
      type === "percent" ? "15" : type === "fixed" ? "250" : "150",
    );
  };
  const toggleCategory = (category: string) =>
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  const toggleDay = (day: string) =>
    setDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  const randomCode = () =>
    setCode(
      `${["PIZZA", "FEAST", "CHEF", "WEEKEND", "CRUST", "HOT"][Math.floor(Math.random() * 6)]}${Math.floor(Math.random() * 90 + 10)}`,
    );
  const calculation = useMemo(() => {
    const cart = 1399;
    const value = Number(discountValue) || 0;
    const raw = discountType === "percent" ? (cart * value) / 100 : value;
    const effective = Math.min(raw, Number(cap) || 99999);
    const total = Math.max(0, cart - effective) * 1.16;
    return { effective, total };
  }, [cap, discountType, discountValue]);
  const create = () =>
    notify(
      `Coupon ${code.toUpperCase()} successfully staged for Pizza House DHA Branch #402.`,
    );

  return (
    <div className="min-h-full bg-background p-4 pb-28 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <nav className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
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
              <span className="font-semibold text-primary">Create Coupon</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="type-page-title">Create Coupon</h1>
              <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                DHA Branch #402
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Configure discount logic, patron eligibility, redemption
              thresholds, and schedule.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/coupons"
              className="inline-flex items-center gap-1.5 rounded-lg bg-surface-low px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:bg-surface-high"
            >
              <span>×</span>Cancel
            </Link>
            <button
              onClick={() => notify("Coupon saved as draft.")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-surface-high px-3.5 py-2 text-xs font-semibold hover:bg-surface-highest"
            >
              <Save className="h-4 w-4" />
              Save as Draft
            </button>
            <button
              onClick={create}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-primary-container"
            >
              <Check className="h-4 w-4" />
              Create Coupon
            </button>
          </div>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <Section
              number="01"
              title="Basic Information"
              aside="Core Credentials"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <TextField
                    label="Coupon Code"
                    value={code}
                    onChange={(value) => setCode(value.toUpperCase())}
                    helper="Customer-facing alphanumeric promo code applied at cart/checkout."
                  />
                  <button
                    type="button"
                    onClick={randomCode}
                    className="absolute right-2 top-6 inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-semibold text-primary hover:bg-primary/10"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Auto-Gen
                  </button>
                </div>
                <TextField
                  label="Internal Campaign Name"
                  value={name}
                  onChange={setName}
                  helper="Admin identifier for kitchen telemetry, shifts, and marketing sync."
                />
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="type-label-caps text-muted-foreground">
                  Description &amp; Cart Note
                </span>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={2}
                  className="resize-none rounded-lg bg-surface-low px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
              <div className="flex flex-col justify-between gap-3 rounded-lg bg-surface-low p-3.5 sm:flex-row sm:items-center">
                <div>
                  <span className="block text-xs font-semibold">
                    Initial Activation State
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    Specify if the coupon launches automatically upon window
                    trigger.
                  </span>
                </div>
                <div className="flex rounded-lg bg-surface-highest p-0.5">
                  <button
                    type="button"
                    onClick={() => setStatus("active")}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-semibold",
                      status === "active"
                        ? "bg-surface-lowest text-primary shadow-sm"
                        : "text-muted-foreground",
                    )}
                  >
                    ● Active by Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("draft")}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-semibold",
                      status === "draft"
                        ? "bg-surface-lowest text-primary shadow-sm"
                        : "text-muted-foreground",
                    )}
                  >
                    Draft Mode Only
                  </button>
                </div>
              </div>
            </Section>
            <Section
              number="02"
              title="Discount Configuration"
              aside="Calculation Engine"
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {(
                  [
                    [
                      "percent",
                      "Percentage (%)",
                      "Calculates relative rate against eligible items",
                      Percent,
                    ],
                    [
                      "fixed",
                      "Fixed Amount (Rs.)",
                      "Deducts a static rupee sum from total bill",
                      Ticket,
                    ],
                    [
                      "delivery",
                      "Free Delivery Add-on",
                      "Waives rider delivery tariff automatically",
                      Bike,
                    ],
                  ] as const
                ).map(([value, title, helper, Icon]) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => updateDiscountType(value)}
                    className={cn(
                      "flex flex-col gap-2 rounded-xl p-3.5 text-left transition",
                      discountType === value
                        ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                        : "bg-surface-low hover:bg-surface-high",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5" />
                      {discountType === value && (
                        <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                          Selected
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{title}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {helper}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="grid gap-4 pt-2 md:grid-cols-2">
                <TextField
                  label="Discount Value"
                  value={discountValue}
                  onChange={setDiscountValue}
                  prefix={discountType === "percent" ? "%" : "Rs."}
                  type="number"
                  helper="Applied automatically at cart summary level."
                />
                <TextField
                  label="Max Discount Cap (Ceiling)"
                  value={cap}
                  onChange={setCap}
                  prefix="Rs."
                  type="number"
                  helper="Prevents oversized discounts on bulk or catering orders."
                />
              </div>
            </Section>
            <Section
              number="03"
              title="Eligibility & Cart Rules"
              aside="Validation Bounds"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="Minimum Order Subtotal"
                  value={minSubtotal}
                  onChange={setMinSubtotal}
                  prefix="Rs."
                  type="number"
                  helper="Cart value required before discount applies."
                />
                <TextField
                  label="Maximum Order Subtotal (Optional)"
                  value={maxSubtotal}
                  onChange={setMaxSubtotal}
                  prefix="Rs."
                  type="number"
                  helper="Excludes massive corporate bulk runs."
                />
              </div>
              <div>
                <label className="type-label-caps text-muted-foreground">
                  Applicable Menu Categories
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      type="button"
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold",
                        selectedCategories.includes(category)
                          ? "bg-primary text-white"
                          : "bg-surface-low text-muted-foreground hover:bg-surface-high",
                      )}
                    >
                      {selectedCategories.includes(category) && (
                        <Check className="h-3.5 w-3.5" />
                      )}
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="type-label-caps text-muted-foreground">
                  Specific Pizza Item Inclusions
                </label>
                <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-surface-low p-2.5">
                  {[
                    "Chicken Tikka Supreme",
                    "Pepperoni Supremo (Beef)",
                    "Smoked Fajita Melt",
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-md bg-surface-lowest px-2.5 py-1 text-xs font-semibold shadow-sm"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() =>
                          notify(`${item} removed from inclusions.`)
                        }
                      >
                        <span className="text-muted-foreground hover:text-primary">
                          ×
                        </span>
                      </button>
                    </span>
                  ))}
                  <input
                    placeholder="+ Add specific pizza or SKU..."
                    className="min-w-[160px] flex-1 bg-transparent px-1.5 py-1 text-xs outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="type-label-caps text-muted-foreground">
                  Patron Eligibility Tier
                </label>
                <div className="mt-2 grid gap-3 md:grid-cols-3">
                  {[
                    ["all", "All Patrons", "Walk-in, web, & aggregator users"],
                    [
                      "first",
                      "First-Time Patrons",
                      "Zero completed lifetime orders",
                    ],
                    [
                      "vip",
                      "VIP & Repeat Only",
                      "Minimum 5 verified orders recorded",
                    ],
                  ].map(([value, title, helper]) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setTier(value)}
                      className={cn(
                        "rounded-lg p-3 text-left",
                        tier === value
                          ? "bg-primary/10 ring-1 ring-primary/30"
                          : "bg-surface-low hover:bg-surface-high",
                      )}
                    >
                      <span className="block text-xs font-bold">{title}</span>
                      <span className="mt-1 block text-[11px] text-muted-foreground">
                        {helper}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-lg bg-surface-low p-3">
                <div>
                  <span className="block text-xs font-semibold">
                    Lock exclusively to Customer&apos;s 1st Order
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    Device fingerprint and verified mobile number prevent
                    secondary reuse.
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={firstOrderOnly}
                  onClick={() => setFirstOrderOnly(!firstOrderOnly)}
                  className={cn(
                    "h-5 w-9 rounded-full p-0.5",
                    firstOrderOnly ? "bg-primary" : "bg-surface-highest",
                  )}
                >
                  <span
                    className={cn(
                      "block h-4 w-4 rounded-full bg-white transition-transform",
                      firstOrderOnly ? "translate-x-4" : "translate-x-0",
                    )}
                  />
                </button>
              </div>
            </Section>
            <Section
              number="04"
              title="Redemption Limits & Anti-Abuse"
              aside="Quota Controls"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="Total Global Usage Limit"
                  value={globalLimit}
                  onChange={setGlobalLimit}
                  prefix="♙"
                  type="number"
                  helper="Total redemptions allowed before auto-expiration."
                />
                <TextField
                  label="Per-Customer Usage Limit"
                  value={perCustomer}
                  onChange={setPerCustomer}
                  prefix="♙"
                  type="number"
                  helper="Maximum redemptions per verified phone/account."
                />
              </div>
              <div className="rounded-lg bg-surface-low p-3.5">
                <label className="flex items-start gap-2.5 text-xs">
                  <input
                    type="checkbox"
                    checked={stacking}
                    onChange={(event) => setStacking(event.target.checked)}
                    className="mt-1 accent-primary"
                  />
                  <span>
                    <b>
                      Allow stacking with item-level loyalty points or promo
                      combos
                    </b>
                    <span className="mt-1 block text-[11px] text-muted-foreground">
                      Default recommended: unchecked prevents discount stacking
                      abuse on premium pizzas.
                    </span>
                  </span>
                </label>
                <div className="mt-2 flex items-center gap-2 rounded bg-destructive/10 px-3 py-1.5 text-xs text-destructive">
                  <ShieldCheck className="h-4 w-4" />
                  Stacking is disabled by default.
                </div>
              </div>
            </Section>
            <Section
              number="05"
              title="Campaign Schedule & Time Window"
              aside="Shift Targeting"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="Campaign Start Date & Time"
                  value="18 Sep 2026, 11:00 AM"
                  onChange={() => undefined}
                />
                <TextField
                  label="Campaign End Date & Time"
                  value="21 Sep 2026, 11:59 PM"
                  onChange={() => undefined}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="type-label-caps text-muted-foreground">
                    Active Days in Week
                  </label>
                  <span className="text-[11px] font-semibold text-primary">
                    Weekend Rush Strategy
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1.5">
                  {dayNames.map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={cn(
                        "rounded-lg py-2 text-xs font-semibold",
                        days.includes(day)
                          ? "bg-primary text-white"
                          : "bg-surface-low text-muted-foreground",
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4 rounded-lg bg-surface-low p-3.5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2.5">
                  <Clock3 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold">
                      Daily Operational Window
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Strict cutoff avoids oven congestion during midday
                      pre-prep.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold">
                  <span className="rounded bg-surface-lowest px-2.5 py-1">
                    17:00
                  </span>
                  to
                  <span className="rounded bg-surface-lowest px-2.5 py-1">
                    23:30
                  </span>
                </div>
              </div>
            </Section>
            <Section
              number="06"
              title="Restaurant Scope & Tenancy"
              aside="Fleet Authority"
            >
              <div className="space-y-3">
                {[
                  [
                    "current",
                    "Current Restaurant Only",
                    "Pizza House — DHA Branch #402, Sector Y Commercial Area.",
                    "Store #402",
                  ],
                  [
                    "fleet",
                    "Multi-Location Fleet",
                    "Gulberg Galleria, DHA Phase 6 Express, and Bahria Town Sector C.",
                    "3 Selected Branches",
                  ],
                  [
                    "global",
                    "Platform-wide Global Promotion",
                    "Applicable to all authorized franchises, cloud kitchens, and kiosk units.",
                    "Super Admin",
                  ],
                ].map(([value, title, helper, badge]) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setScope(value)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl p-3.5 text-left",
                      scope === value
                        ? "bg-primary/10 ring-1 ring-primary/30"
                        : "bg-surface-low hover:bg-surface-high",
                    )}
                  >
                    <input
                      type="radio"
                      checked={scope === value}
                      readOnly
                      className="mt-1 accent-primary"
                    />
                    <span className="flex-1">
                      <span className="flex justify-between gap-3 text-xs font-bold">
                        {title}
                        <small className="rounded bg-surface-high px-2 py-0.5 font-semibold">
                          {badge}
                        </small>
                      </span>
                      <span className="mt-1 block text-[11px] text-muted-foreground">
                        {helper}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-surface-high p-3.5 text-xs">
                <Info className="h-5 w-5 shrink-0 text-primary" />
                <span>
                  <b>Settlement Disclosure:</b> Store-level promotions are
                  funded directly from branch net billings; platform-wide
                  campaigns use a 45/55 cost-share SLA.
                </span>
              </div>
            </Section>
          </div>
          <aside className="sticky top-20 flex flex-col gap-6 lg:col-span-4">
            <Card className="overflow-hidden shadow-md">
              <div className="bg-primary p-4 text-white">
                <div className="mb-1 flex justify-between text-xs font-mono uppercase tracking-wider opacity-80">
                  <span>Simulation Ticket</span>
                  <span>POS v2.4</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="truncate font-mono text-xl font-extrabold tracking-widest">
                    {code || "COUPON"}
                  </h3>
                  <span className="shrink-0 rounded bg-white px-2 py-0.5 text-[11px] font-black text-primary">
                    {discountType === "percent"
                      ? `${discountValue || 0}% OFF`
                      : discountType === "fixed"
                        ? `Rs. ${discountValue || 0} OFF`
                        : "FREE DELIV"}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs opacity-90">
                  {name || "Custom Promo"}
                </p>
              </div>
              <div className="flex items-center bg-surface-low py-1.5">
                <span className="-ml-3.5 h-3 w-3 rounded-full bg-background" />
                <span className="mx-1 w-full border-b border-dashed" />
                <span className="-mr-3.5 h-3 w-3 rounded-full bg-background" />
              </div>
              <div className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Sample Benchmark Cart</span>
                  <span className="font-mono">Order #Sim-810</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-surface-low p-2.5">
                  <span className="text-xs font-bold">
                    🍕 Chicken Tikka (Large)
                  </span>
                  <span className="font-mono text-xs font-bold">Rs. 1,399</span>
                </div>
                <div className="flex flex-col gap-2 rounded-lg bg-surface-low p-3 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Cart Subtotal</span>
                    <b className="font-mono text-foreground">Rs. 1,399.00</b>
                  </div>
                  <div className="flex justify-between font-semibold text-primary">
                    <span>
                      Coupon Discount (
                      {discountType === "percent"
                        ? `${discountValue}%`
                        : "Fixed"}
                      )
                    </span>
                    <span className="font-mono">
                      - Rs. {calculation.effective.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Surcharge Cap Shield</span>
                    <span className="font-mono text-success">
                      {calculation.effective >= (Number(cap) || 99999)
                        ? `Capped at Rs. ${cap}`
                        : "Not Exceeded"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-dashed pt-2 font-bold">
                    <span>Simulated Cart Total</span>
                    <span className="font-mono text-base text-primary">
                      Rs. {calculation.total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="type-label-caps text-muted-foreground">
                    POS Engine Pre-Flight Checks
                  </span>
                  {[
                    [
                      "Min. Subtotal Threshold",
                      `≥ Rs. ${Number(minSubtotal || 0).toLocaleString()}`,
                    ],
                    ["Happy Hour Window Match", "Fri-Sun"],
                    [
                      "Remaining Quota Available",
                      `${globalLimit}/${globalLimit}`,
                    ],
                    ["Single Account Limit Enforced", `${perCustomer} Max`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded bg-surface-low p-2 text-xs"
                    >
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        {label}{" "}
                        <span className="text-muted-foreground">({value})</span>
                      </span>
                      <b className="text-[10px] uppercase text-success">Pass</b>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-surface-high p-3">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>Projected Burn Rate</span>
                    <span className="font-mono text-primary">
                      Rs. 104,925 Max
                    </span>
                  </div>
                  <div className="mt-2 flex h-10 items-end gap-1">
                    {["h-2", "h-4", "h-3", "h-6", "h-8", "h-10"].map(
                      (height, index) => (
                        <span
                          key={index}
                          className={cn(
                            "flex-1 rounded-t bg-primary",
                            height,
                            index < 5 && "opacity-60",
                          )}
                        />
                      ),
                    )}
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    Est. margin delta:{" "}
                    <b className="text-foreground">+18.4% order volume</b>{" "}
                    compensating promo allowance.
                  </p>
                </div>
              </div>
            </Card>
            <div className="flex items-center gap-3 rounded-xl bg-surface-low p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-high text-primary">
                <CircleHelp className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold">Need promotional advice?</p>
                <p className="text-[11px] text-muted-foreground">
                  Review historical sales before setting caps greater than Rs.
                  500.
                </p>
              </div>
            </div>
          </aside>
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-4 border-t bg-background/95 px-4 py-3 shadow-xl backdrop-blur-md lg:left-[260px] lg:px-8">
          <div className="hidden items-center gap-3 text-xs sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-success" />
            <span>Campaign parameters validated • Auto-save idle</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/coupons"
              className="rounded px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-destructive"
            >
              Discard Changes
            </Link>
            <button
              onClick={() => notify("Coupon saved as draft.")}
              className="inline-flex items-center gap-1.5 rounded bg-surface-high px-4 py-2 text-xs font-semibold"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </button>
            <button
              onClick={create}
              className="inline-flex items-center gap-1.5 rounded bg-primary px-5 py-2 text-xs font-bold text-white shadow-md"
            >
              <Check className="h-4 w-4" />
              Create Coupon
            </button>
          </div>
        </div>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed right-6 top-20 z-50 flex max-w-sm items-center gap-2 rounded-lg bg-surface-lowest px-4 py-3 text-xs font-semibold shadow-xl"
        >
          <Check className="h-4 w-4 text-success" />
          {notice}
        </div>
      )}
    </div>
  );
}
