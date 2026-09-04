"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  CloudCog,
  Home,
  Layers,
  MoreVertical,
  Plus,
  RefreshCw,
  Save,
  Search,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type Option = {
  id: string;
  name: string;
  sku: string;
  descriptor: string;
  station: string;
  tier: string;
  price: number;
  defaultSelected: boolean;
  available: boolean;
};
const startingOptions: Option[] = [
  {
    id: "mozzarella",
    name: "Extra Mozzarella Cheese",
    sku: "TOP-EXT-004",
    descriptor: "Dairy",
    station: "Cold Line B",
    tier: "Excluded from Free Tier",
    price: 150,
    defaultSelected: false,
    available: true,
  },
  {
    id: "olives",
    name: "Kalamata Black Olives",
    sku: "TOP-ING-012",
    descriptor: "Standard Veg",
    station: "Cold Line A",
    tier: "Eligible for Free Allowance",
    price: 100,
    defaultSelected: true,
    available: true,
  },
  {
    id: "jalapenos",
    name: "Fire-Roasted Jalapeños",
    sku: "TOP-ING-008",
    descriptor: "Kitchen Depleted",
    station: "Hot Line",
    tier: "Eligible for Free Allowance",
    price: 90,
    defaultSelected: false,
    available: false,
  },
  {
    id: "chicken",
    name: "Smoked Tikka Chicken Strips",
    sku: "TOP-EXT-002",
    descriptor: "Signature Protein",
    station: "Tandoor Station",
    tier: "Premium Add-on",
    price: 220,
    defaultSelected: false,
    available: true,
  },
  {
    id: "mushrooms",
    name: "Wild Button Mushrooms",
    sku: "TOP-ING-005",
    descriptor: "Standard Veg",
    station: "Cold Line A",
    tier: "Eligible for Free Allowance",
    price: 120,
    defaultSelected: false,
    available: true,
  },
];

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "inline-flex h-6 w-11 rounded-full p-0.5 transition-colors",
        on ? "bg-tertiary" : "bg-surface-highest",
      )}
    >
      <span
        className={cn(
          "block h-5 w-5 rounded-full bg-surface-lowest shadow-sm transition-transform",
          on && "translate-x-5",
        )}
      />
    </button>
  );
}

export function OptionPricingAvailability() {
  const [options, setOptions] = useState(startingOptions);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("all");
  const [tier, setTier] = useState("all");
  const [saved, setSaved] = useState("");
  const filtered = useMemo(
    () =>
      options.filter(
        (option) =>
          `${option.name} ${option.sku} ${option.station}`
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          (availability === "all" ||
            (availability === "in-stock"
              ? option.available
              : !option.available)) &&
          (tier === "all" ||
            (tier === "free-eligible"
              ? option.tier.includes("Eligible")
              : option.tier === "Premium Add-on")),
      ),
    [availability, options, search, tier],
  );
  const update = (id: string, patch: Partial<Option>) =>
    setOptions((items) =>
      items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  const notify = (message: string) => {
    setSaved(message);
    window.setTimeout(() => setSaved(""), 2800);
  };
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </Link>
            <span>›</span>
            <Link href="/menu" className="hover:text-primary">
              Menu
            </Link>
            <span>›</span>
            <Link href="/menu" className="hover:text-primary">
              Pizzas
            </Link>
            <span>›</span>
            <span>Chicken Tikka</span>
            <span>›</span>
            <Link
              href="/menu/chicken-tikka/customization"
              className="hover:text-primary"
            >
              Customization
            </Link>
            <span>›</span>
            <span className="font-bold text-primary">Toppings Pricing</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-high px-3 py-1 text-xs font-semibold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            Location: Pizza House #402{" "}
            <b className="rounded bg-surface px-1.5 py-0.5 text-[10px] uppercase text-primary">
              Live POS
            </b>
          </span>
        </div>
        <div className="flex flex-col justify-between gap-5 pb-2 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-1.5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                CUSTOM-08 / 05 / 06
              </span>
              <span className="rounded bg-surface-high px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Active Group Matrix
              </span>
            </div>
            <h1 className="type-page-title">
              Modifier Option Pricing &amp; Inventory Matrix
            </h1>
            <p className="text-body-reg text-muted-foreground">
              Manage base prices, upcharge surcharges, default selections, and
              live kitchen availability for all options in this customization
              group.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded bg-surface-highest px-4 py-2.5 text-xs font-semibold hover:bg-surface-high"
            >
              <Plus className="h-4 w-4" />
              Add New Option
            </button>
            <button
              type="button"
              onClick={() =>
                notify("Customization matrix and pricing successfully updated")
              }
              className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary-container"
            >
              <Save className="h-4 w-4" />
              {saved.includes("updated") ? "Saved" : "Save Pricing Changes"}
            </button>
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-12">
          <Card className="flex flex-col justify-between gap-4 p-5 xl:col-span-8 md:flex-row md:items-center">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold">Group: Toppings</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs font-semibold text-primary">
                    Multiple Choice
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    Max 3 Options Allowed
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Customer pays surcharge after exceeding 2 free qualifying
                  selections.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="rounded bg-surface-low px-3 py-2 text-center">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Free Allowance
                </span>
                <b className="text-base text-success">2 Selected</b>
              </div>
              <div className="rounded bg-surface-low px-3 py-2 text-center">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Group Threshold
                </span>
                <b className="text-base">Cap: 3</b>
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3 xl:col-span-4">
            <Card className="p-4">
              <p className="type-label-caps text-muted-foreground">
                Available{" "}
                <CheckCircle2 className="float-right h-4 w-4 text-success" />
              </p>
              <p className="mt-2 text-2xl font-black">
                {options.filter((item) => item.available).length}
                <span className="ml-1 text-xs font-semibold text-success">
                  / 5 online
                </span>
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-high">
                <div className="h-full w-4/5 rounded-full bg-success" />
              </div>
            </Card>
            <Card className="p-4">
              <p className="type-label-caps text-muted-foreground">
                Stock Deficit{" "}
                <XCircle className="float-right h-4 w-4 text-destructive" />
              </p>
              <p className="mt-2 text-2xl font-black text-destructive">
                {options.filter((item) => !item.available).length}
                <span className="ml-1 text-xs font-semibold text-destructive">
                  86&apos;d Kitchen
                </span>
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-destructive/10">
                <div className="h-full w-1/5 rounded-full bg-destructive" />
              </div>
            </Card>
          </div>
        </div>
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b bg-surface-low p-3.5 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-9 bg-surface pl-9 text-xs"
                placeholder="Search option name, SKU, or station..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                className="h-9 rounded-[var(--radius-lg)] border bg-surface-low px-3 text-xs"
                aria-label="Availability filter"
              >
                <option value="all">Availability: All States</option>
                <option value="in-stock">In Stock Only</option>
                <option value="86">Out of Stock (86&apos;d)</option>
              </select>
              <select
                value={tier}
                onChange={(event) => setTier(event.target.value)}
                className="h-9 rounded-[var(--radius-lg)] border bg-surface-low px-3 text-xs"
                aria-label="Pricing tier filter"
              >
                <option value="all">Pricing Tier: All Tiers</option>
                <option value="free-eligible">Free Allowance Eligible</option>
                <option value="premium">Premium Surcharge</option>
              </select>
              <button
                type="button"
                onClick={() => notify("POS sync status refreshed")}
                className="rounded-[var(--radius-lg)] bg-surface-low p-2 text-muted-foreground hover:bg-surface-high"
                aria-label="Reload POS sync status"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-xs">
              <thead className="border-b bg-surface-low text-muted-foreground">
                <tr>
                  {[
                    "Option & Identifier",
                    "Prep Station",
                    "Allowance Rule",
                    "Surcharge / Extra Price",
                    "Default Selected",
                    "Real-Time Availability",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="type-table-header px-4 py-3.5">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((option) => (
                  <tr
                    key={option.id}
                    className={cn(
                      "group hover:bg-surface-low",
                      !option.available && "bg-destructive/5",
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary">
                          <UtensilsIcon />
                        </div>
                        <div>
                          <span
                            className={cn(
                              "block text-sm font-bold leading-tight",
                              !option.available &&
                                "line-through decoration-destructive",
                            )}
                          >
                            {option.name}
                          </span>
                          <div className="mt-1 flex items-center gap-1.5">
                            <span className="rounded bg-surface-high px-1.5 py-0.5 font-mono text-[10px]">
                              {option.sku}
                            </span>
                            <span
                              className={cn(
                                "text-[10px]",
                                !option.available &&
                                  "font-bold text-destructive",
                              )}
                            >
                              • {option.descriptor}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-high px-2.5 py-1 text-[11px] font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        {option.station}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded px-2 py-0.5 text-[11px] font-semibold",
                          option.tier.includes("Eligible")
                            ? "bg-success/10 text-success"
                            : "bg-primary/10 text-primary",
                        )}
                      >
                        {option.tier}
                      </span>
                      <span className="mt-1 block text-[10px] text-muted-foreground">
                        {option.tier.includes("Eligible")
                          ? "Billed only if selections &gt; 2"
                          : "Always billable as add-on"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center rounded-lg bg-surface-low px-2.5 py-1.5 shadow-inner focus-within:ring-1 focus-within:ring-primary">
                          <span className="mr-1 text-xs font-bold text-muted-foreground">
                            Rs.
                          </span>
                          <input
                            value={option.price}
                            onChange={(event) =>
                              update(option.id, {
                                price: Number(event.target.value) || 0,
                              })
                            }
                            type="number"
                            min="0"
                            className="w-16 bg-transparent text-xs font-bold outline-none"
                            aria-label={`${option.name} price`}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {option.tier.includes("Eligible")
                            ? "overage fee"
                            : "fixed fee"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Toggle
                        on={option.defaultSelected}
                        onChange={() =>
                          update(option.id, {
                            defaultSelected: !option.defaultSelected,
                          })
                        }
                        label={`Default selection for ${option.name}`}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Toggle
                          on={option.available}
                          onChange={() =>
                            update(option.id, { available: !option.available })
                          }
                          label={`Availability for ${option.name}`}
                        />
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-[11px] font-bold",
                            option.available
                              ? "text-success"
                              : "text-destructive",
                          )}
                        >
                          {option.available ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              In Stock
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5" />
                              Out of Stock (86&apos;d)
                            </>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface-high"
                        aria-label={`Actions for ${option.name}`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-between gap-4 bg-surface-low px-6 py-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3 text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <b>{options.length} Options configured in group</b>
              <span className="hidden text-muted-foreground sm:inline">•</span>
              <span className="font-semibold text-destructive">
                {options.filter((item) => !item.available).length} Currently Out
                of Stock (86&apos;d)
              </span>
            </div>
            <div className="flex flex-wrap justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setOptions((items) =>
                    items.map((item) => ({ ...item, available: true })),
                  );
                  notify("All modifier options marked In Stock");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-surface-highest px-3.5 py-2 text-xs font-semibold hover:bg-surface-high"
              >
                <CheckCircle2 className="h-4 w-4 text-success" />
                Mark All Available
              </button>
              <button
                type="button"
                onClick={() =>
                  notify(
                    "Modifier surcharges broadcasted to Pizza House #402 POS",
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-surface-highest px-4 py-2 text-xs font-bold text-primary hover:bg-surface-high"
              >
                <CloudCog className="h-4 w-4" />
                Sync POS Prices
              </button>
            </div>
          </div>
        </Card>
        {saved && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg bg-inverse-surface px-4 py-3 text-xs font-semibold text-white shadow-xl">
            <CheckCircle2 className="h-4 w-4 text-success" />
            {saved}
          </div>
        )}
      </div>
    </div>
  );
}

function UtensilsIcon() {
  return <Layers className="h-6 w-6" />;
}
