"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  CircleDot,
  Copy,
  Eye,
  GripVertical,
  History,
  MoreHorizontal,
  Plus,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Utensils,
  Verified,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type Group = {
  number: string;
  name: string;
  mode: string;
  rule: string;
  note: string;
  options: Array<{
    name: string;
    detail: string;
    price: string;
    status?: string;
  }>;
};

const groups: Group[] = [
  {
    number: "01",
    name: "Size",
    mode: "Single Choice",
    rule: "Required (Min: 1, Max: 1)",
    note: "Establishes item baseline price",
    options: [
      {
        name: 'Small (8")',
        detail: "20cm · Default Selected",
        price: "Base price Rs. 799",
      },
      {
        name: 'Medium (12")',
        detail: "30cm · Most Popular",
        price: "+Rs. 500 (Rs. 1,299)",
      },
      { name: 'Large (16")', detail: "40cm", price: "+Rs. 1,000 (Rs. 1,799)" },
    ],
  },
  {
    number: "02",
    name: "Crust Selection",
    mode: "Single Choice",
    rule: "Required (Min: 1, Max: 1)",
    note: "4 crust styles active",
    options: [
      {
        name: "Classic Hand-Tossed",
        detail: "Default",
        price: "Included (Free)",
      },
      { name: "Crispy Thin Crust", detail: "", price: "Included (Free)" },
      {
        name: "Cheese Burst Stuffed Crust",
        detail: "Real Cheddar & Mozz",
        price: "+Rs. 180",
      },
      {
        name: "Gluten-Free Cauliflower Crust",
        detail: "Allergen Friendly",
        price: "+Rs. 220",
      },
    ],
  },
  {
    number: "03",
    name: "Toppings",
    mode: "Multiple Choice",
    rule: "Optional (Min: 0, Max: 3)",
    note: "2 Free Included",
    options: [
      {
        name: "Kalamata Olives",
        detail: "Black sliced",
        price: "Free / +Rs. 100",
      },
      {
        name: "Wild Button Mushrooms",
        detail: "Sautéed garlic herb",
        price: "Free / +Rs. 100",
      },
      {
        name: "Fire-Roasted Jalapeños",
        detail: "86'd Kitchen Out",
        price: "Free / +Rs. 100",
        status: "Unavailable",
      },
      {
        name: "Sweet Sweetcorn",
        detail: "Golden kernel",
        price: "Free / +Rs. 100",
      },
    ],
  },
  {
    number: "04",
    name: "Specialty Extras & Dips",
    mode: "Multiple Choice",
    rule: "Optional (Add as many as you like)",
    note: "",
    options: [
      {
        name: "Extra Cheese Mozzarella Melt",
        detail: "Double layer",
        price: "+Rs. 150",
      },
      { name: "Garlic Herb Butter Dip", detail: "50g pot", price: "+Rs. 75" },
      {
        name: "Spicy Peri Peri Drizzle",
        detail: "Signature hot sauce",
        price: "+Rs. 60",
      },
    ],
  },
];

function GroupCard({ group }: { group: Group }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="flex min-w-0 items-start gap-3">
          <GripVertical className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-primary">
                {group.number}
              </span>
              <h3 className="text-base font-bold">{group.name}</h3>
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
                Active
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-surface-high px-2 py-0.5 text-xs font-medium">
                {group.mode}
              </span>
              <span
                className={cn(
                  "rounded px-2 py-0.5 text-xs font-bold",
                  group.name === "Toppings"
                    ? "bg-surface-high text-foreground"
                    : "bg-primary/10 text-primary",
                )}
              >
                {group.rule}
              </span>
              <span className="text-xs text-muted-foreground">
                {group.note}
              </span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            className="rounded p-1.5 text-muted-foreground hover:bg-surface-low"
            aria-label={`${group.name} settings`}
          >
            <Settings2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded p-1.5 text-muted-foreground hover:bg-surface-low"
            aria-label={`More options for ${group.name}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      {group.name === "Toppings" && (
        <div className="mx-4 mb-3 flex items-center gap-2 rounded bg-surface-high p-2.5 text-xs">
          <InfoIcon />
          <span>
            <strong>Allowance Logic:</strong> Choose up to 3 toppings. First 2
            toppings included in base price, 3rd is +Rs. 100.
          </span>
        </div>
      )}
      <div className="space-y-2 px-4 pb-4">
        {group.options.map((option) => (
          <div
            key={option.name}
            className={cn(
              "flex items-center justify-between gap-3 rounded bg-surface-low p-3 text-xs",
              option.status === "Unavailable" && "opacity-70",
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span
                className={cn(
                  "font-bold",
                  option.status === "Unavailable" && "line-through",
                )}
              >
                {option.name}
              </span>
              {option.detail && (
                <span
                  className={cn(
                    "hidden rounded px-1.5 py-0.5 text-[10px] sm:inline",
                    option.status === "Unavailable"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-surface-high text-muted-foreground",
                  )}
                >
                  {option.detail}
                </span>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={cn(
                  "hidden font-semibold sm:inline",
                  option.status === "Unavailable"
                    ? "text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {option.price}
              </span>
              <span
                className={cn(
                  "hidden text-[11px] font-semibold md:inline",
                  option.status === "Unavailable"
                    ? "text-destructive"
                    : "text-success",
                )}
              >
                {option.status ?? "Active"}
              </span>
              <button
                type="button"
                className="text-muted-foreground hover:text-primary"
                aria-label={`Edit ${option.name}`}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <Plus className="h-4 w-4" />
            Add Option to {group.name}
          </button>
          {group.name === "Toppings" && (
            <button
              type="button"
              className="hidden items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground sm:flex"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Edit Allowance Rules
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

function InfoIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
      i
    </span>
  );
}

function Simulator() {
  const [size, setSize] = useState("Medium");
  const [toppings, setToppings] = useState([
    "Olives",
    "Mushrooms",
    "Jalapeños",
  ]);
  const [validated, setValidated] = useState(false);
  const toggleTopping = (value: string) =>
    setToppings((items) =>
      items.includes(value)
        ? items.filter((item) => item !== value)
        : items.length < 3
          ? [...items, value]
          : items,
    );
  return (
    <Card className="space-y-4 p-5 lg:sticky lg:top-20">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-success" />
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Live Customer Simulator
          </h2>
        </div>
        <span className="rounded bg-surface-high px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          Device: Web Kiosk
        </span>
      </div>
      <div className="space-y-4 rounded-[var(--radius-lg)] bg-surface-low p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded bg-primary/10 text-primary">
            <Utensils className="h-7 w-7" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Chicken Tikka</h4>
            <p className="text-[11px] text-muted-foreground">
              Fresh clay-oven chicken, capsicum &amp; rich sauce
            </p>
            <p className="mt-0.5 text-xs font-bold text-primary">
              Base from Rs. 799
            </p>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-bold">
              1. Choose Size <b className="text-primary">*</b>
            </span>
            <span className="text-[11px] text-muted-foreground">Required</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              ["Small", "799"],
              ["Medium", "1,299"],
              ["Large", "1,799"],
            ].map(([label, price]) => (
              <button
                key={label}
                type="button"
                onClick={() => setSize(label)}
                className={cn(
                  "rounded px-1 py-2 text-xs",
                  size === label
                    ? "bg-primary font-bold text-white"
                    : "bg-surface-high hover:bg-surface-highest",
                )}
              >
                <span className="block font-bold">
                  {label} ({" "}
                  {label === "Small" ? "8" : label === "Medium" ? "12" : "16"}
                  &quot;)
                </span>
                <span className="text-[10px]">Rs. {price}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-bold">
              2. Choose Crust <b className="text-primary">*</b>
            </span>
            <span className="text-[11px] text-muted-foreground">Required</span>
          </div>
          {[
            "Classic Hand-Tossed",
            "Cheese Burst Stuffed Crust",
            "Gluten-Free Cauliflower",
          ].map((crust, index) => (
            <label
              key={crust}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded p-2 text-xs",
                index === 1 ? "bg-surface-high" : "bg-surface-lowest",
              )}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="crust"
                  defaultChecked={index === 1}
                  className="accent-primary"
                />
                {crust}
              </span>
              <b className={index === 1 ? "text-primary" : "text-success"}>
                {index === 0 ? "Free" : `+Rs. ${index === 1 ? "180" : "220"}`}
              </b>
            </label>
          ))}
        </div>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold">3. Toppings</span>
            <span className="rounded bg-surface-high px-2 py-0.5 text-[11px] font-semibold text-primary">
              {toppings.length} of 3 selected ·{" "}
              {Math.max(0, toppings.length - 2)} extra (+Rs. 100)
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {[
              ["Olives", "Kalamata Olives"],
              ["Mushrooms", "Mushrooms"],
              ["Jalapeños", "Jalapeños"],
              ["Sweetcorn", "Sweetcorn (Maxed)"],
            ].map(([value, label]) => (
              <label
                key={value}
                className={cn(
                  "flex items-center gap-2 rounded p-2",
                  toppings.includes(value)
                    ? "bg-surface-high"
                    : value === "Sweetcorn"
                      ? "cursor-not-allowed bg-surface-lowest opacity-60"
                      : "bg-surface-lowest",
                )}
              >
                <input
                  type="checkbox"
                  checked={toppings.includes(value)}
                  disabled={value === "Sweetcorn"}
                  onChange={() => toggleTopping(value)}
                  className="rounded accent-primary"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-bold">4. Specialty Extras &amp; Dips</span>
            <span className="text-[11px] text-muted-foreground">Optional</span>
          </div>
          {[
            ["Garlic Herb Butter Dip", "75"],
            ["Spicy Peri Peri Drizzle", "60"],
          ].map(([label, price], index) => (
            <label
              key={label}
              className={cn(
                "flex items-center justify-between rounded p-2 text-xs",
                index === 0 ? "bg-surface-high" : "bg-surface-lowest",
              )}
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked={index === 0}
                  className="rounded accent-primary"
                />
                {label}
              </span>
              <b>+Rs. {price}</b>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2 border-t pt-2 text-xs text-muted-foreground">
        <Line
          label={`Base Pizza (${size}):`}
          value={
            size === "Small"
              ? "Rs. 799"
              : size === "Large"
                ? "Rs. 1,799"
                : "Rs. 1,299"
          }
        />
        <Line label="Crust (Cheese Burst):" value="+Rs. 180" />
        <Line
          label="Toppings (Olives + Mush + Jal):"
          value="+Rs. 100 (1 Paid Extra)"
        />
        <Line label="Extras (Garlic Butter Dip):" value="+Rs. 75" />
        <div className="space-y-1.5 rounded bg-surface-low p-2.5">
          <div className="flex justify-between text-[11px] font-semibold">
            <span>Ingredient Cost Margin</span>
            <span className="text-success">71.4% Target GP</span>
          </div>
          <div className="flex h-2 overflow-hidden rounded-full">
            <span className="w-[60%] bg-primary" />
            <span className="w-[15%] bg-primary-container" />
            <span className="w-[12%] bg-success" />
            <span className="w-[13%] bg-outline" />
          </div>
          <div className="flex justify-between font-mono text-[10px]">
            <span>Food Cost: Rs. 473</span>
            <span>Margin: Rs. 1,181</span>
          </div>
        </div>
        <div className="flex items-baseline justify-between pt-2">
          <span className="text-sm font-bold text-foreground">
            Simulated Total
          </span>
          <span className="font-mono text-2xl font-bold text-primary">
            Rs. 1,654
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setValidated(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded bg-primary py-2.5 text-xs font-bold text-white hover:bg-primary-container"
      >
        <Verified className="h-4 w-4" />
        {validated ? "Re-run Validation" : "Test Validation Rules"}
      </button>
      {validated && (
        <div className="flex items-center gap-2 rounded bg-success/10 p-2.5 text-xs font-medium text-success">
          <CheckCircle2 className="h-4 w-4" />
          All constraint checks passed (Min/Max, status, allowances)
        </div>
      )}
    </Card>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span>{label}</span>
      <span className="font-mono font-medium text-foreground">{value}</span>
    </div>
  );
}

export function PizzaCustomizationBuilder() {
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Link href="/dashboard" className="hover:text-primary">
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
              <span className="font-bold text-primary">Customization</span>
            </div>
            <h1 className="type-page-title mt-2">Pizza Customization</h1>
            <p className="max-w-3xl text-body-reg text-muted-foreground">
              Define and configure the groups, selection rules, and modifier
              pricing customers see when personalizing{" "}
              <strong className="text-foreground">Chicken Tikka Pizza</strong>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded bg-surface-high px-4 py-2 text-xs font-semibold hover:bg-surface-highest"
            >
              <Eye className="h-4 w-4" />
              Preview Customer View
            </button>
            <Link
              href="/menu/customizations/create"
              className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-container"
            >
              <Plus className="h-4 w-4" />
              Add Customization Group
            </Link>
          </div>
        </div>
        <Card className="space-y-5 p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded bg-primary/10 text-primary">
                <Utensils className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-base font-bold">Chicken Tikka</h2>
                  <span className="rounded bg-surface-high px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    PIZZA-CHK-092
                  </span>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">
                    ● ACTIVE
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Category:{" "}
                  <strong className="text-foreground">Signature Pizzas</strong>{" "}
                  · Kitchen Station:{" "}
                  <strong className="text-foreground">Oven Station #2</strong> ·
                  Prep Standard:{" "}
                  <strong className="text-foreground">8 mins</strong>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded bg-surface-low px-3 py-1.5 text-xs font-medium hover:bg-surface-high"
              >
                <History className="h-4 w-4" />
                Version v3.8
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded bg-surface-low px-3 py-1.5 text-xs font-medium hover:bg-surface-high"
              >
                <Copy className="h-4 w-4" />
                Clone Rules
              </button>
              <button
                type="button"
                className="rounded bg-surface-low p-1.5 text-muted-foreground hover:text-foreground"
                aria-label="More pizza actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Customization Groups", "4", "Configured", SlidersHorizontal],
              ["Total Options", "19", "Modifiers", LayersIcon],
              ["Required Groups", "2", "(Size, Crust)", CircleDot],
              ["Optional Add-ons", "2", "(Toppings, Extras)", Sparkles],
            ].map(([label, value, detail, Icon]) => (
              <div
                key={String(label)}
                className="flex items-center justify-between rounded bg-surface-low p-3.5"
              >
                <div>
                  <p className="type-label-caps text-muted-foreground">
                    {String(label)}
                  </p>
                  <p className="mt-0.5 text-xl font-bold">
                    {String(value)}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      {String(detail)}
                    </span>
                  </p>
                </div>
                <Icon className="h-5 w-5 text-primary" />
              </div>
            ))}
          </div>
        </Card>
        <div className="grid items-start gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="type-label-caps text-muted-foreground">
                  Step Groups Order
                </span>
                <span className="rounded bg-surface-high px-2 py-0.5 font-mono text-[11px]">
                  4 Sequential Stages
                </span>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <GripVertical className="h-4 w-4" />
                Reorder Sequence
              </button>
            </div>
            {groups.map((group) => (
              <GroupCard key={group.number} group={group} />
            ))}
          </div>
          <div className="lg:col-span-5">
            <Simulator />
          </div>
        </div>
      </div>
    </div>
  );
}

function LayersIcon(props: { className?: string }) {
  return <Sparkles {...props} />;
}
