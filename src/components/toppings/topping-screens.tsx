"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Ban,
  CheckCircle2,
  Copy,
  Edit3,
  Eye,
  Layers,
  MoreVertical,
  PackageOpen,
  PauseCircle,
  Plus,
  Save,
  Search,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Pagination } from "@/components/shared/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type Topping = {
  id: string;
  name: string;
  description: string;
  type: "Extra" | "Ingredient" | "Sauce";
  price: number;
  status: "ACTIVE" | "UNAVAILABLE";
  usage: number;
  updated: string;
  sku: string;
};

const initialToppings: Topping[] = [
  {
    id: "extra-cheese",
    name: "Extra Cheese",
    description: "Creamy whole-milk mozzarella topping",
    type: "Extra",
    price: 150,
    status: "ACTIVE",
    usage: 142,
    updated: "Today, 14:20",
    sku: "TOP-EXT-004",
  },
  {
    id: "kalamata-olives",
    name: "Kalamata Olives",
    description: "Pitted Mediterranean black olives in brine",
    type: "Ingredient",
    price: 100,
    status: "ACTIVE",
    usage: 98,
    updated: "Yesterday, 11:05",
    sku: "TOP-ING-012",
  },
  {
    id: "jalapeno",
    name: "Jalapeño",
    description: "Sliced green jalapeños with a mild kick",
    type: "Ingredient",
    price: 80,
    status: "ACTIVE",
    usage: 76,
    updated: "Sep 03, 2026",
    sku: "TOP-ING-019",
  },
  {
    id: "truffle-oil",
    name: "Truffle Oil",
    description: "Aromatic finishing oil for gourmet pizzas",
    type: "Extra",
    price: 250,
    status: "ACTIVE",
    usage: 64,
    updated: "Sep 02, 2026",
    sku: "TOP-EXT-008",
  },
  {
    id: "basil",
    name: "Fresh Basil",
    description: "Hand-picked basil leaves",
    type: "Ingredient",
    price: 0,
    status: "ACTIVE",
    usage: 54,
    updated: "Aug 29, 2026",
    sku: "TOP-ING-021",
  },
  {
    id: "garlic-sauce",
    name: "Garlic Sauce",
    description: "Signature creamy garlic drizzle",
    type: "Sauce",
    price: 120,
    status: "UNAVAILABLE",
    usage: 31,
    updated: "Aug 28, 2026",
    sku: "TOP-SAU-003",
  },
  {
    id: "spicy-beef",
    name: "Spicy Beef",
    description: "Seasoned beef crumble with smoked paprika",
    type: "Ingredient",
    price: 200,
    status: "ACTIVE",
    usage: 27,
    updated: "Aug 26, 2026",
    sku: "TOP-ING-026",
  },
  {
    id: "chili-flakes",
    name: "Chili Flakes",
    description: "Complimentary crushed red pepper garnish",
    type: "Extra",
    price: 0,
    status: "ACTIVE",
    usage: 19,
    updated: "Aug 24, 2026",
    sku: "TOP-EXT-011",
  },
];

function StatusBadge({ status }: { status: Topping["status"] }) {
  const active = status === "ACTIVE";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        active
          ? "bg-success/10 text-success"
          : "bg-destructive/10 text-destructive",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {active ? "ACTIVE" : "UNAVAILABLE"}
    </span>
  );
}

function ToppingMenu({
  topping,
  onDelete,
  onToggle,
}: {
  topping: Topping;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label={`Actions for ${topping.name}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded p-2 text-muted-foreground hover:bg-surface-high hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
      {open && (
        <div
          className="absolute right-0 z-30 mt-2 w-48 rounded-[var(--radius-lg)] border bg-surface-lowest py-1 shadow-lg"
          role="menu"
        >
          <Link
            href={`/toppings/${topping.id}`}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-surface-low"
            onClick={() => setOpen(false)}
          >
            <Eye className="h-[18px] w-[18px]" />
            View
          </Link>
          <Link
            href={`/toppings/${topping.id}/edit`}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-surface-low"
            onClick={() => setOpen(false)}
          >
            <Edit3 className="h-[18px] w-[18px]" />
            Edit
          </Link>
          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-surface-low"
            onClick={() => {
              onToggle();
              setOpen(false);
            }}
          >
            <PauseCircle className="h-[18px] w-[18px]" />
            {topping.status === "ACTIVE" ? "Deactivate" : "Activate"}
          </button>
          <div className="my-1 border-t" />
          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            <Trash2 className="h-[18px] w-[18px]" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export function ToppingsList() {
  const [toppings, setToppings] = useState(initialToppings);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [deleteTarget, setDeleteTarget] = useState<Topping | null>(null);
  const filtered = toppings.filter(
    (topping) =>
      topping.name.toLowerCase().includes(search.toLowerCase()) &&
      (status === "ALL" || topping.status === status) &&
      (type === "ALL" || topping.type === type),
  );
  const toggle = (id: string) =>
    setToppings((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "ACTIVE" ? "UNAVAILABLE" : "ACTIVE",
            }
          : item,
      ),
    );
  const activeCount = toppings.filter(
    (item) => item.status === "ACTIVE",
  ).length;
  const paidCount = toppings.filter((item) => item.price > 0).length;
  const summaryCards: Array<{
    label: string;
    value: number;
    Icon: LucideIcon;
    color: string;
  }> = [
    {
      label: "Total Toppings",
      value: toppings.length,
      Icon: Layers,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Active",
      value: activeCount,
      Icon: CheckCircle2,
      color: "bg-success/10 text-success",
    },
    {
      label: "Unavailable",
      value: toppings.length - activeCount,
      Icon: PackageOpen,
      color: "bg-destructive/10 text-destructive",
    },
    {
      label: "Paid Extras",
      value: paidCount,
      Icon: Utensils,
      color: "bg-surface-high text-foreground",
    },
  ];
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Link href="/dashboard" className="hover:text-primary">
            Dashboard
          </Link>
          <span>›</span>
          <Link href="/menu" className="hover:text-primary">
            Menu
          </Link>
          <span>›</span>
          <span className="text-primary">Toppings</span>
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="type-label-caps text-primary">Catalog management</p>
            <h1 className="type-page-title mt-1">Toppings &amp; Extras</h1>
            <p className="mt-1 text-body-reg text-muted-foreground">
              Manage ingredients, sauces, and paid customization options for
              your menu.
            </p>
          </div>
          <Link
            href="/toppings/create"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-container"
          >
            <Plus className="h-4 w-4" />
            Add Topping
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map(({ label, value, Icon, color }) => (
            <Card key={label} className="flex items-center justify-between p-5">
              <div>
                <p className="type-label-caps text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-bold">{value}</p>
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-[var(--radius)]",
                  color,
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            </Card>
          ))}
        </div>
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b bg-surface-low p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-9 pl-9 text-xs"
                placeholder="Search by topping name..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-9 rounded-[var(--radius)] border bg-surface-lowest px-3 text-xs"
                aria-label="Filter status"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-9 rounded-[var(--radius)] border bg-surface-lowest px-3 text-xs"
                aria-label="Filter type"
              >
                <option value="ALL">All Types</option>
                <option value="Extra">Paid Extras</option>
                <option value="Ingredient">Ingredients</option>
                <option value="Sauce">Sauces</option>
              </select>
              <span className="flex items-center px-2 text-xs text-muted-foreground">
                Showing{" "}
                <strong className="ml-1 text-foreground">
                  {filtered.length}
                </strong>
                &nbsp;of {toppings.length}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead className="border-b bg-surface-low text-muted-foreground">
                <tr>
                  {[
                    "",
                    "Topping",
                    "Type",
                    "Price",
                    "Availability",
                    "Order Usage",
                    "Updated",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="type-table-header px-4 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((topping) => (
                  <tr key={topping.id} className="group hover:bg-surface-low">
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        aria-label={`Select ${topping.name}`}
                        className="rounded text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/toppings/${topping.id}`}
                        className="font-semibold hover:text-primary hover:underline"
                      >
                        {topping.name}
                      </Link>
                      <p className="mt-0.5 max-w-xs truncate text-[11px] text-muted-foreground">
                        {topping.description}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="rounded bg-surface-high px-2.5 py-1 text-[11px] font-medium">
                        {topping.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold">
                      {topping.price ? `Rs. ${topping.price}` : "Free"}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={topping.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-high">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${Math.min(100, topping.usage / 2)}%`,
                            }}
                          />
                        </div>
                        <span className="font-medium">
                          {topping.usage} uses
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">
                      {topping.updated}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <ToppingMenu
                        topping={topping}
                        onDelete={() => setDeleteTarget(topping)}
                        onToggle={() => toggle(topping.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={1}
            totalPages={1}
            totalItems={filtered.length}
            pageSize={8}
            itemLabel="toppings"
            onPageChange={() => undefined}
          />
        </Card>
      </div>
      {deleteTarget && (
        <DeleteToppingDialog
          topping={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            setToppings((items) =>
              items.filter((item) => item.id !== deleteTarget.id),
            );
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}

export function DeleteToppingDialog({
  topping,
  onClose,
  onConfirm,
}: {
  topping: Topping;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-topping-title"
        className="w-full max-w-[520px] rounded-[var(--radius-lg)] border bg-surface-lowest shadow-2xl"
      >
        <div className="flex items-start justify-between border-b p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-destructive/10 text-destructive">
              <Trash2 className="h-6 w-6" />
            </div>
            <div>
              <h2 id="delete-topping-title" className="type-section-title">
                Delete {topping.name}?
              </h2>
              <p className="mt-1 text-body-sm text-muted-foreground">
                This topping is currently configured on{" "}
                <strong className="text-foreground">18 active menus</strong>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-muted"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 p-6">
          <div className="rounded-[var(--radius)] bg-surface-low p-4 text-body-sm text-muted-foreground">
            <p className="font-semibold text-foreground">What happens next?</p>
            <p className="mt-1">
              The topping will be hidden from customization menus. Historical
              order records and pricing remain unchanged.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-[var(--radius)] border bg-surface p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">{topping.name}</p>
              <p className="text-xs text-muted-foreground">
                SKU: {topping.sku} · Type: {topping.type} · Rs. {topping.price}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t bg-surface-low p-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center rounded-[var(--radius)] border bg-surface-lowest px-4 text-sm font-semibold hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] bg-destructive px-4 text-sm font-semibold text-white hover:opacity-90"
          >
            <Trash2 className="h-4 w-4" />
            Delete Topping
          </button>
        </div>
      </section>
    </div>
  );
}

export function ToppingDetails({ id }: { id: string }) {
  const topping =
    initialToppings.find((item) => item.id === id) ?? initialToppings[0];
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [status, setStatus] = useState(topping.status);
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1200px] space-y-6">
        <Link
          href="/toppings"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Toppings
        </Link>
        <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="type-label-caps text-primary">
              Topping registry · {topping.sku}
            </p>
            <h1 className="type-display mt-2">{topping.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded bg-surface-high px-2.5 py-1 text-[11px] font-semibold">
                Type: {topping.type} Add-on
              </span>
              <span className="rounded bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                Allergen: Dairy
              </span>
              <span className="rounded bg-surface-high px-2.5 py-1 font-mono text-[11px]">
                SKU: {topping.sku}
              </span>
            </div>
            <p className="mt-2 text-body-reg text-muted-foreground">
              {topping.description}.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/toppings/${topping.id}/edit`}
              className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] bg-surface-high px-4 text-sm font-semibold hover:bg-surface-highest"
            >
              <Edit3 className="h-4 w-4 text-primary" />
              Edit Topping
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                aria-expanded={menuOpen}
                className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] bg-inverse-surface px-4 text-sm font-semibold text-white hover:bg-foreground"
              >
                More Actions <span aria-hidden="true">⌄</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-[var(--radius-lg)] border bg-surface-lowest py-1 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus(status === "ACTIVE" ? "UNAVAILABLE" : "ACTIVE");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs hover:bg-surface-low"
                  >
                    <Ban className="h-4 w-4 text-destructive" />
                    {status === "ACTIVE"
                      ? "Mark Unavailable"
                      : "Mark Available"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs hover:bg-surface-low"
                  >
                    <Copy className="h-4 w-4" />
                    Duplicate Item
                  </button>
                  <div className="my-1 border-t" />
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteOpen(true);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Topping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Topping Metadata &amp; View</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex h-40 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
                <Utensils className="h-16 w-16" />
              </div>
              {[
                ["Topping Name", topping.name],
                ["Type", `${topping.type} Add-on`],
                ["SKU", topping.sku],
                ["Retail Price", `Rs. ${topping.price}`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b pb-3 text-sm last:border-0"
                >
                  <span className="type-label-caps text-muted-foreground">
                    {label}
                  </span>
                  <strong>{value}</strong>
                </div>
              ))}
              <StatusBadge status={status} />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Pizzas Utilizing this Topping</CardTitle>
              <p className="text-body-sm text-muted-foreground">
                Top menu items customized with {topping.name}.
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead className="border-b text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2">Pizza Name</th>
                      <th className="px-3 py-2">Additions Volume</th>
                      <th className="px-3 py-2">Add-on Share</th>
                      <th className="px-3 py-2 text-right">Revenue Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      [
                        "Margherita Extra",
                        "142 additions",
                        "68%",
                        "Rs. 21,300",
                      ],
                      [
                        "Pepperoni Supreme",
                        "88 additions",
                        "42%",
                        "Rs. 13,200",
                      ],
                      ["Truffle Funghi", "54 additions", "26%", "Rs. 8,100"],
                    ].map(([name, volume, share, revenue]) => (
                      <tr key={name} className="hover:bg-surface-low">
                        <td className="px-3 py-3 font-semibold">{name}</td>
                        <td className="px-3 py-3 text-muted-foreground">
                          {volume}
                        </td>
                        <td className="px-3 py-3">
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                            {share}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right font-semibold">
                          {revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                View all configured pizzas →
              </button>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Today, 14:20</strong> ·
              Topping updated by Chef Marco
            </p>
            <p>
              <strong className="text-foreground">Aug 28, 2026</strong> · Added
              to active catalog
            </p>
          </CardContent>
        </Card>
      </div>
      {deleteOpen && (
        <DeleteToppingDialog
          topping={topping}
          onClose={() => setDeleteOpen(false)}
          onConfirm={() => setDeleteOpen(false)}
        />
      )}
    </div>
  );
}

export function ToppingForm({ edit = false }: { edit?: boolean }) {
  const [name, setName] = useState(edit ? "Extra Cheese" : "");
  const [description, setDescription] = useState(
    edit
      ? "Creamy whole-milk mozzarella cheese topping for a richer melt and authentic stone-baked crust finish."
      : "",
  );
  const [price, setPrice] = useState(edit ? "150" : "0");
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1100px] space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Link href="/toppings" className="hover:text-primary">
            Toppings
          </Link>
          <span>›</span>
          <span className="text-primary">{edit ? "Edit" : "New Topping"}</span>
        </div>
        <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
          <div>
            <h1 className="type-page-title">
              {edit ? "Edit Topping" : "Create Topping"}
            </h1>
            <p className="mt-1 text-body-reg text-muted-foreground">
              Add an ingredient or extra option for pizza customization.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/toppings"
              className="inline-flex h-10 items-center rounded-[var(--radius)] border px-4 text-sm font-semibold hover:bg-muted"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-container"
            >
              <Save className="h-4 w-4" />
              {edit ? "Save Changes" : "Create Topping"}
            </button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-body-sm text-muted-foreground">
                Define how this modifier appears in the catalog.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <label className="block space-y-1 text-sm font-semibold">
                Topping Name{" "}
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Buffalo Mozzarella"
                />
              </label>
              <label className="block space-y-1 text-sm font-semibold">
                Slug{" "}
                <Input
                  defaultValue={edit ? "extra-cheese" : ""}
                  className="font-mono"
                  placeholder="extra-cheese"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-semibold">
                  Type
                  <select className="h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm">
                    <option>Ingredient</option>
                    <option selected={edit}>Extra</option>
                    <option>Sauce</option>
                  </select>
                </label>
                <label className="space-y-1 text-sm font-semibold">
                  Availability
                  <select className="h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm">
                    <option>Active</option>
                    <option>Unavailable</option>
                  </select>
                </label>
              </div>
              <label className="block space-y-1 text-sm font-semibold">
                Description
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  maxLength={240}
                  className="w-full resize-y rounded-[var(--radius)] border bg-surface-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Describe this topping for internal catalog use."
                />
              </label>
              <div className="flex flex-wrap gap-2">
                {["Dairy", "Gluten-Free", "Vegetarian", "Spicy"].map(
                  (badge) => (
                    <label
                      key={badge}
                      className="flex items-center gap-2 rounded-full bg-surface-high px-3 py-1.5 text-xs"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={badge !== "Spicy"}
                        className="rounded text-primary focus:ring-primary"
                      />
                      {badge}
                    </label>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Pricing &amp; Stock Configuration</CardTitle>
              <p className="text-body-sm text-muted-foreground">
                Set the customer price and kitchen routing.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <label className="block space-y-1 text-sm font-semibold">
                Retail Price (PKR / Rs.)
                <div className="flex">
                  <span className="flex items-center rounded-l-[var(--radius)] border border-r-0 bg-surface-high px-3 text-xs font-bold">
                    Rs.
                  </span>
                  <Input
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    type="number"
                    min="0"
                    className="rounded-l-none"
                  />
                </div>
                <span className="text-xs font-normal text-muted-foreground">
                  Set to Rs. 0 for complimentary toppings.
                </span>
              </label>
              <label className="block space-y-1 text-sm font-semibold">
                Maximum Portions per Pizza
                <Input defaultValue="3" type="number" min="1" max="10" />
              </label>
              <label className="block space-y-1 text-sm font-semibold">
                Kitchen Station Route
                <select className="h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm">
                  <option>Prep Line B — Dairy &amp; Cold Assembly</option>
                  <option>Prep Line A — Hot Meats &amp; Seasonings</option>
                  <option>Oven Station — Post-Bake Garnishes</option>
                </select>
              </label>
              <div className="rounded-[var(--radius)] bg-surface-low p-3 text-xs text-muted-foreground">
                This topping is included in 68% of customized orders.
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="overflow-hidden">
          <CardHeader className="flex-row items-center justify-between border-b">
            <div>
              <CardTitle>Live Customer Modifier Preview</CardTitle>
              <p className="mt-1 text-body-sm text-muted-foreground">
                Preview how this option appears in the ordering kiosk.
              </p>
            </div>
            <span className="rounded bg-surface-high px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Kiosk view
            </span>
          </CardHeader>
          <CardContent className="grid gap-4 bg-surface-low p-6 md:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border bg-surface-lowest p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Add-ons
              </p>
              <label className="mt-4 flex items-center justify-between rounded-[var(--radius)] border bg-surface p-3">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded bg-primary/10 text-primary">
                    <Utensils className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">
                      {name || "Topping Name"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Optional · Rs. {price || "0"}
                    </span>
                  </span>
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded text-primary focus:ring-primary"
                  aria-label={`Preview ${name || "topping"}`}
                />
              </label>
            </div>
            <div className="flex min-h-32 items-center justify-center rounded-[var(--radius-lg)] border border-dashed bg-surface-lowest p-6 text-center text-sm text-muted-foreground">
              <div>
                <Layers className="mx-auto mb-2 h-8 w-8 text-primary/40" />
                <p>Changes appear here before publishing.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
