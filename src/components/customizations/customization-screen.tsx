"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Check,
  CheckCircle2,
  CircleDot,
  Info,
  RotateCcw,
  Save,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

function StepHeading({
  number,
  title,
  hint,
}: {
  number: string;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-high text-xs font-bold">
          {number}
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-tight">
          {title}
        </h3>
      </div>
      <span className="hidden text-[11px] text-muted-foreground sm:block">
        {hint}
      </span>
    </div>
  );
}

function Counter({
  label,
  value,
  onChange,
  accent = false,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  accent?: boolean;
  hint: string;
}) {
  return (
    <div className="flex flex-col justify-between space-y-2 rounded-[var(--radius-lg)] bg-surface-lowest p-3.5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className={cn("text-xs font-bold", accent && "text-primary")}>
          {label}
        </span>
        <span className="text-xs text-muted-foreground">⌗</span>
      </div>
      <div
        className={cn(
          "flex items-center justify-between rounded-[var(--radius)] bg-surface-low p-1",
          accent && "bg-surface-high",
        )}
      >
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex h-7 w-7 items-center justify-center rounded bg-surface-lowest text-sm font-bold shadow-sm hover:bg-surface-high"
        >
          −
        </button>
        <span
          className={cn(
            "px-2 font-mono text-base font-bold",
            accent && "text-primary",
          )}
        >
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-7 w-7 items-center justify-center rounded bg-surface-lowest text-sm font-bold shadow-sm hover:bg-surface-high"
        >
          +
        </button>
      </div>
      <span className="text-[10px] text-muted-foreground">{hint}</span>
    </div>
  );
}

export function CustomizationScreen() {
  const [name, setName] = useState("Gourmet Toppings");
  const [logic, setLogic] = useState<"single" | "multi">("multi");
  const [required, setRequired] = useState(true);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(3);
  const [free, setFree] = useState(2);
  const [saved, setSaved] = useState(false);
  const safeMax = Math.max(min, Math.min(10, max));
  const safeFree = Math.min(free, safeMax);
  const chooseLogic = (value: "single" | "multi") => {
    setLogic(value);
    if (value === "single") {
      setMin(1);
      setMax(1);
      setFree(0);
    } else {
      setMin(1);
      setMax(3);
      setFree(2);
    }
  };
  const setMinimum = (value: number) => {
    const next = Math.min(safeMax, Math.max(required ? 1 : 0, value));
    setMin(next);
    if (next > safeFree) setFree(next);
  };
  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };
  return (
    <div className="relative min-h-full overflow-hidden bg-background">
      <div className="pointer-events-none select-none p-4 opacity-30 blur-[1px] sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1200px] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                Menu Catalog / Pizzas &amp; Calzones
              </p>
              <h1 className="type-page-title mt-2">Chicken Tikka Pizza</h1>
            </div>
            <div className="flex gap-3">
              <span className="rounded border bg-surface-lowest px-4 py-2 text-sm">
                Back to Catalog
              </span>
              <span className="rounded bg-primary px-4 py-2 text-sm text-white">
                + Add Customization Group
              </span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              "Base Price",
              "Active Modifiers",
              "Avg Upsell Yield",
              "Validation Status",
            ].map((item) => (
              <Card key={item} className="p-4">
                <p className="type-label-caps text-muted-foreground">{item}</p>
                <p className="mt-2 text-xl font-bold">
                  {item === "Base Price"
                    ? "$16.80"
                    : item === "Validation Status"
                      ? "100% Compliant"
                      : "4 Groups"}
                </p>
              </Card>
            ))}
          </div>
          <Card className="p-5">
            <p className="font-semibold">Existing Configuration Groups</p>
            <div className="mt-4 space-y-2">
              <div className="rounded bg-surface-low p-3">
                Crust Selection · Single Choice · Required
              </div>
              <div className="rounded bg-surface-low p-3">
                Extra Cheese &amp; Dips · Multi Choice · Optional
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="absolute inset-0 z-10 flex items-start justify-center overflow-y-auto bg-inverse-surface/40 p-3 backdrop-blur-sm sm:p-6">
        <section className="my-2 flex w-full max-w-[800px] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-surface-lowest text-foreground shadow-xl sm:my-4">
          <header className="flex items-start justify-between gap-4 bg-surface-low px-5 py-4 sm:px-7 sm:py-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  CUSTOM-03
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Rule &amp; Limit Matrix
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                Configure Customization Group
              </h2>
              <p className="text-xs text-muted-foreground">
                Set up selection constraints, customer limits, and free
                allowances for{" "}
                <strong className="text-primary">Chicken Tikka Pizza</strong>.
              </p>
            </div>
            <Link
              href="/menu"
              aria-label="Close customization dialog"
              className="rounded p-1 text-muted-foreground hover:bg-surface-high"
            >
              <X className="h-5 w-5" />
            </Link>
          </header>
          <div className="max-h-[calc(100vh-190px)] space-y-7 overflow-y-auto p-5 sm:p-7">
            <section className="space-y-4">
              <StepHeading
                number="1"
                title="Basic Identification"
                hint="Core identifiers"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1.5 text-xs font-semibold">
                  Group Name <span className="text-primary">*</span>
                  <Input
                    value={name}
                    maxLength={40}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <span className="block text-right text-[11px] font-normal text-muted-foreground">
                    {name.length} / 40
                  </span>
                </label>
                <label className="space-y-1.5 text-xs font-semibold">
                  Internal Slug / Identifier
                  <div className="flex items-center rounded bg-surface-low px-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      pkg_
                    </span>
                    <Input
                      defaultValue="gourmet-toppings"
                      className="border-0 bg-transparent font-mono shadow-none focus-visible:ring-0"
                    />
                    <span className="text-xs text-muted-foreground">⌑</span>
                  </div>
                </label>
                <label className="space-y-1.5 text-xs font-semibold md:col-span-2">
                  Customer-Facing Prompt / Subtitle
                  <Input defaultValue="Choose your favorite ingredients for stone-baking." />
                  <span className="block text-[11px] font-normal text-muted-foreground">
                    Displayed under the group header in menu boards, kiosks, and
                    mobile checkout.
                  </span>
                </label>
              </div>
            </section>
            <section className="space-y-4">
              <StepHeading
                number="2"
                title="Selection Logic"
                hint="Input behavior & UI rendering pattern"
              />
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    value: "single" as const,
                    title: "Single Choice (Radio)",
                    description:
                      "Customer chooses exactly one option (e.g., Pizza Crust, Dough Base, Size).",
                    icon: CircleDot,
                    footer: "Fixed: Exactly 1 pick",
                  },
                  {
                    value: "multi" as const,
                    title: "Multiple Choice (Checkbox)",
                    description:
                      "Customer can select multiple options with configurable floor, ceiling, and free counts.",
                    icon: Check,
                    footer: "Dynamic Thresholds Configured",
                  },
                ].map((item) => {
                  const active = logic === item.value;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => chooseLogic(item.value)}
                      className={cn(
                        "flex flex-col justify-between space-y-3 rounded-[var(--radius-lg)] p-4 text-left shadow-sm transition-colors",
                        active
                          ? "bg-surface-high ring-1 ring-primary/20"
                          : "bg-surface-lowest hover:bg-surface-low",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full",
                            active
                              ? "bg-primary text-white"
                              : "bg-surface-high",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full",
                            active
                              ? "bg-primary text-white"
                              : "bg-surface-container",
                          )}
                        >
                          {active && <Check className="h-3 w-3" />}
                        </span>
                      </div>
                      <span>
                        <span
                          className={cn(
                            "block text-sm font-bold",
                            active && "text-primary",
                          )}
                        >
                          {item.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {item.footer}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
            <section className="space-y-4">
              <StepHeading
                number="3"
                title="Selection Rules & Thresholds"
                hint="CUSTOM-07 Engine"
              />
              <div className="flex items-center justify-between gap-4 rounded-[var(--radius-lg)] bg-surface-low p-3.5">
                <div>
                  <p className="text-xs font-bold">
                    Mandatory Requirement{" "}
                    <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase text-primary">
                      Strict
                    </span>
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Customers must make at least one selection before adding
                    this pizza.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRequired((value) => !value);
                    if (required) setMin(0);
                    else setMin(Math.max(1, min));
                  }}
                  className={cn(
                    "relative h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors",
                    required ? "bg-primary" : "bg-surface-highest",
                  )}
                  aria-pressed={required}
                >
                  <span
                    className={cn(
                      "block h-5 w-5 rounded-full bg-white shadow transition-transform",
                      required ? "translate-x-5" : "translate-x-0",
                    )}
                  />
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Counter
                  label="Min Selections"
                  value={min}
                  onChange={setMinimum}
                  hint="Floor required to complete item"
                />
                <Counter
                  label="Max Selections"
                  value={safeMax}
                  onChange={(value) => {
                    setMax(Math.max(min, Math.min(10, value)));
                    if (safeFree > value) setFree(value);
                  }}
                  hint="Ceiling cap per pizza item"
                />
                <Counter
                  label="Free Allowance"
                  value={safeFree}
                  accent
                  onChange={(value) =>
                    setFree(Math.max(0, Math.min(safeMax, value)))
                  }
                  hint="Inclusive complimentary choices"
                />
              </div>
              <div className="space-y-3 rounded-[var(--radius-lg)] bg-surface-container p-4">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-bold uppercase tracking-wide">
                      Live Rule Synthesis
                    </p>
                    <p className="mt-1">
                      Customer Rule: Customers must pick between{" "}
                      <strong className="text-primary">{min}</strong> and{" "}
                      <strong className="text-primary">{safeMax}</strong>{" "}
                      toppings. The first{" "}
                      <strong className="text-tertiary">{safeFree}</strong>{" "}
                      selections are included free with this pizza; each
                      additional selection costs its configured extra price.
                    </p>
                  </div>
                </div>
                <div className="flex h-3 overflow-hidden rounded-full bg-surface-highest">
                  <div
                    className="bg-tertiary text-center text-[9px] font-bold text-white"
                    style={{
                      width: `${safeMax ? (safeFree / safeMax) * 100 : 0}%`,
                    }}
                  >
                    {safeFree ? `${safeFree} Free` : ""}
                  </div>
                  <div
                    className="bg-primary text-center text-[9px] font-bold text-white"
                    style={{
                      width: `${safeMax ? ((safeMax - safeFree) / safeMax) * 100 : 0}%`,
                    }}
                  >
                    + Extra Fee
                  </div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>0 (Baseline)</span>
                  <span>
                    Min Required:{" "}
                    <strong className="text-foreground">{min}</strong>
                  </span>
                  <span>
                    Max Cap:{" "}
                    <strong className="text-foreground">{safeMax} Items</strong>
                  </span>
                </div>
              </div>
            </section>
            <div className="flex items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-tertiary/10 p-3.5">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-tertiary" />
                <div>
                  <p className="text-xs font-bold text-tertiary">
                    Valid Configuration Logic
                  </p>
                  <p className="text-[11px]">
                    Math invariant satisfied: Min ({min}) ≤ Free ({safeFree}) ≤
                    Max ({safeMax})
                  </p>
                </div>
              </div>
              <span className="hidden rounded bg-surface-lowest px-2.5 py-1 text-[11px] font-bold text-tertiary sm:block">
                POS Compliant
              </span>
            </div>
            <section className="space-y-4">
              <StepHeading
                number="4"
                title="Status & Channel Visibility"
                hint="Omnichannel propagation"
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Group Status",
                  "Online Web",
                  "Dine-in Kiosks",
                  "Register POS",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center justify-between rounded-[var(--radius-lg)] bg-surface-low p-3 text-xs"
                  >
                    <span className="font-bold uppercase tracking-wider text-muted-foreground">
                      {item}
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded text-primary focus:ring-primary"
                      aria-label={item}
                    />
                  </label>
                ))}
              </div>
            </section>
          </div>
          <footer className="flex items-center justify-between gap-3 bg-surface-low px-5 py-4 shadow-inner sm:px-7">
            <button
              type="button"
              onClick={() => chooseLogic("multi")}
              className="inline-flex items-center gap-1.5 rounded px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Defaults
            </button>
            <div className="flex items-center gap-3">
              <Link
                href="/menu"
                className="rounded px-4 py-2 text-xs font-semibold hover:bg-surface-high"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={save}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-container",
                  saved && "bg-tertiary hover:bg-tertiary",
                )}
              >
                <Save className="h-4 w-4" />
                {saved ? "Saved Successfully" : "Save Customization Group"}
              </button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
