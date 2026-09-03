"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  Pizza,
  Plus,
  Utensils,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="type-label-caps block text-muted-foreground">
      {children}
    </label>
  );
}

export function CreateCategoryForm() {
  const [name, setName] = useState("Pizzas");
  const [slug, setSlug] = useState("pizzas");
  const [description, setDescription] = useState(
    "Classic pizzas and signature favorites...",
  );
  const [active, setActive] = useState(true);
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Link href="/dashboard" className="hover:text-primary">
                Dashboard
              </Link>
              <span>›</span>
              <Link href="/categories" className="hover:text-primary">
                Categories
              </Link>
              <span>›</span>
              <span className="text-primary">Create</span>
            </div>
            <h1 className="type-page-title">Create Category</h1>
            <p className="mt-1 text-body-reg text-muted-foreground">
              Add a category to organize your restaurant menu.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/categories"
              className="inline-flex h-10 items-center rounded-[var(--radius)] px-4 text-sm font-semibold text-muted-foreground hover:bg-surface-high"
            >
              Cancel
            </Link>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Category
            </Button>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="space-y-6 p-6 sm:p-8 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Category Name</Label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Appetizers, Desserts"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="font-mono text-[13px]"
                  placeholder="e.g. pizzas"
                />
                <p className="text-body-sm text-muted-foreground">
                  Used for internal references and URLs
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                placeholder="Enter a brief overview of this category..."
                className="w-full resize-none rounded-[var(--radius)] border bg-surface-low px-3 py-2 text-body-reg outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid gap-6 pt-2 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Display Order</Label>
                <div className="relative">
                  <Input type="number" defaultValue={1} />
                  <span className="absolute right-3 top-2.5 text-body-sm text-muted-foreground">
                    Order #
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  onClick={() => setActive(!active)}
                  className="flex h-10 items-center gap-4"
                >
                  <span
                    className={cn(
                      "relative h-6 w-11 rounded-full",
                      active ? "bg-primary" : "bg-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                        active ? "translate-x-6" : "translate-x-1",
                      )}
                    />
                  </span>
                  <span className="text-body-reg font-semibold">
                    {active ? "Active" : "Inactive"}
                  </span>
                </button>
              </div>
            </div>
          </Card>
          <div className="space-y-6">
            <Card className="space-y-4 p-6">
              <Label>Category Image</Label>
              <button
                type="button"
                className="group flex min-h-44 w-full flex-col items-center justify-center rounded-[var(--radius-lg)] border-2 border-dashed border-border bg-surface-low p-6 text-center transition-colors hover:border-primary"
              >
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-high text-primary transition-transform group-hover:scale-105">
                  <ImagePlus className="h-6 w-6" />
                </span>
                <span className="text-body-reg font-semibold">
                  + Upload Category Image
                </span>
                <span className="mt-1 text-body-sm text-muted-foreground">
                  PNG, JPG, WebP up to 5MB
                </span>
              </button>
              <div>
                <Label>Live Preview Card</Label>
                <div className="mt-2 flex items-center gap-4 rounded-[var(--radius-lg)] bg-surface-low p-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                    <Pizza className="h-8 w-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="truncate font-semibold">
                        {name || "Category name"}
                      </h2>
                      <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                        {active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-body-sm text-muted-foreground">
                      {description}
                    </p>
                    <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                      <span>Display Order: 01</span>
                      <span>•</span>
                      <span>Slug: {slug}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryDetails() {
  const items = [
    ["Chicken Tikka", "Spicy marinated chicken chunks, bell peppers", true],
    ["Pepperoni", "Double pepperoni slices, extra mozzarella", true],
    ["Cheese Burst", "Extra cheese-filled crust with mozzarella", true],
  ] as const;
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <Link
          href="/categories"
          className="mb-6 inline-flex items-center gap-2 text-body-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Link>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-lg)] bg-surface-high text-primary">
              <Pizza className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="type-page-title">Pizzas</h1>
                <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                  ACTIVE
                </span>
              </div>
              <p className="mt-1 text-body-reg text-muted-foreground">
                Hand-tossed crusts, signature sauces, and premium artisanal
                toppings.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/categories/pizzas/edit"
              className="inline-flex h-10 items-center rounded-[var(--radius)] bg-surface-high px-4 text-sm font-semibold hover:bg-surface-highest"
            >
              Edit Category
            </Link>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {[
            ["Menu Items", "24", Utensils, "text-primary"],
            ["Active Items", "22", CheckCircle2, "text-success"],
            ["Unavailable", "2", X, "text-destructive"],
          ].map(([label, value, Icon, color]) => (
            <Card
              key={String(label)}
              className="flex items-center justify-between p-6"
            >
              <div>
                <p className="type-label-caps text-muted-foreground">
                  {String(label)}
                </p>
                <p className={cn("mt-1 text-3xl font-bold", String(color))}>
                  {String(value)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-high">
                <Icon className="h-6 w-6" />
              </div>
            </Card>
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="p-6">
            <h2 className="border-b pb-3 text-lg font-semibold">
              Category Metadata
            </h2>
            {[
              ["Category Name", "Pizzas"],
              ["Slug", "pizzas"],
              ["Display Order", "01"],
              ["Status", "ACTIVE"],
              ["Created", "21 Aug 2026"],
              ["Last Updated", "02 Sep 2026"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 border-b py-3 last:border-0"
              >
                <span className="text-body-sm text-muted-foreground">
                  {label}
                </span>
                <span className="text-right text-body-sm font-semibold">
                  {value}
                </span>
              </div>
            ))}
          </Card>
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between border-b p-6">
              <h2 className="text-lg font-semibold">
                Items in Category Preview
              </h2>
              <Link
                href="/menu"
                className="text-body-sm font-semibold text-primary hover:underline"
              >
                View Menu →
              </Link>
            </div>
            <div className="space-y-3 p-6">
              {items.map(([name, description, active]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4 rounded-[var(--radius)] bg-surface-low p-3 transition-colors hover:bg-surface-high"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-surface-high text-primary">
                      <Pizza className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-body-sm font-semibold">{name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                  {active && (
                    <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                      ACTIVE
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
