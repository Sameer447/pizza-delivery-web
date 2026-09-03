"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Copy,
  Edit3,
  ImagePlus,
  Info,
  PackageCheck,
  PauseCircle,
  Pizza,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";

import { RowActionsMenu } from "@/components/shared/row-actions-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type MenuStatus = "Active" | "Unavailable" | "Draft";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  prices: string[];
  orders: string;
  status: MenuStatus;
  updated: string;
};

const menuItems: MenuItem[] = [
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    category: "Gourmet & Special",
    description:
      "Spicy marinated chicken, roasted peppers, and signature sauce.",
    prices: ["799", "1,099", "1,399"],
    orders: "1,428",
    status: "Active",
    updated: "2 hours ago",
  },
  {
    id: "truffle-mushroom",
    name: "Truffle Mushroom",
    category: "Gourmet & Special",
    description: "Wild mushrooms, truffle oil, parmesan, and fresh herbs.",
    prices: ["899", "1,249", "1,599"],
    orders: "2,850",
    status: "Active",
    updated: "Yesterday",
  },
  {
    id: "pepperoni-feast",
    name: "Pepperoni Feast",
    category: "Classic Pizzas",
    description: "Double pepperoni, mozzarella, and a crisp wood-fired crust.",
    prices: ["899", "1,199", "1,499"],
    orders: "612",
    status: "Unavailable",
    updated: "3 days ago",
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight",
    category: "Vegetarian",
    description: "Seasonal vegetables, olives, mozzarella, and basil.",
    prices: ["749", "999", "1,299"],
    orders: "943",
    status: "Active",
    updated: "5 days ago",
  },
  {
    id: "chicken-bbq",
    name: "Chicken BBQ",
    category: "Classic Pizzas",
    description: "Smoky BBQ chicken, red onion, and melted mozzarella.",
    prices: ["849", "1,149", "1,449"],
    orders: "—",
    status: "Draft",
    updated: "1 week ago",
  },
  {
    id: "margherita",
    name: "Margherita",
    category: "Classic Pizzas",
    description: "San Marzano tomato, mozzarella, basil, and olive oil.",
    prices: ["699", "899", "1,199"],
    orders: "1,104",
    status: "Active",
    updated: "2 weeks ago",
  },
];

const statusStyles: Record<MenuStatus, string> = {
  Active: "bg-success/10 text-success",
  Unavailable: "bg-destructive/10 text-destructive",
  Draft: "bg-warning/10 text-warning",
};

function Breadcrumbs({ current }: { current: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      <Link href="/dashboard" className="hover:text-primary">
        Dashboard
      </Link>
      <span>›</span>
      <Link href="/menu" className="hover:text-primary">
        Menu
      </Link>
      <span>›</span>
      <span className="text-primary">{current}</span>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Pizza;
  className: string;
}) {
  return (
    <Card className="flex items-center justify-between p-5">
      <div>
        <p className="type-label-caps text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
        <p
          className={cn(
            "mt-1 flex items-center gap-1 text-xs font-medium",
            className,
          )}
        >
          {detail}
        </p>
      </div>
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)]",
          className.replace("text-", "bg-").split(" ")[0],
          className.split(" ")[0],
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
    </Card>
  );
}

export function MenuList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null);
  const filtered = useMemo(
    () =>
      menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          (status === "all" || item.status.toLowerCase() === status),
      ),
    [search, status],
  );

  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex flex-col gap-4">
          <Breadcrumbs current="Pizzas" />
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="type-page-title">Pizzas</h1>
              <p className="mt-1 text-body-reg text-muted-foreground">
                Manage pizzas available on your restaurant menu.
              </p>
            </div>
            <Link
              href="/menu/create"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-container"
            >
              <Plus className="h-4 w-4" />
              Add Pizza
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total Pizzas"
            value="24"
            detail="↗ +2 this month"
            icon={Pizza}
            className="text-primary"
          />
          <SummaryCard
            label="Active"
            value="21"
            detail="✓ 87.5% of total"
            icon={CheckCircle2}
            className="text-success"
          />
          <SummaryCard
            label="Unavailable"
            value="2"
            detail="⚠ Out of stock ingredients"
            icon={PauseCircle}
            className="text-destructive"
          />
          <SummaryCard
            label="Draft"
            value="1"
            detail="Hidden from menu"
            icon={Edit3}
            className="text-warning"
          />
        </div>
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b bg-surface-low p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-10 pl-9"
                placeholder="Search by pizza name..."
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 lg:w-auto">
              <select
                className="h-10 rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm"
                aria-label="Filter category"
              >
                <option>All Categories</option>
                <option>Classic Pizzas</option>
                <option>Gourmet & Special</option>
                <option>Vegetarian</option>
              </select>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-10 rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm"
                aria-label="Filter status"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="unavailable">Unavailable</option>
                <option value="draft">Draft</option>
              </select>
              <select
                className="h-10 rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm"
                aria-label="Sort pizzas"
              >
                <option>Sort: Most Popular</option>
                <option>Sort: Name (A-Z)</option>
                <option>Sort: Price (Low to High)</option>
                <option>Sort: Recently Updated</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="border-b bg-surface-high text-muted-foreground">
                <tr>
                  {[
                    "Pizza",
                    "Category",
                    "Sizes / Starting Price",
                    "Orders",
                    "Status",
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
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-surface-low"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-primary/10 text-primary">
                          <Pizza className="h-5 w-5" />
                        </div>
                        <div>
                          <Link
                            href={`/menu/${item.id}`}
                            className="font-semibold hover:text-primary hover:underline"
                          >
                            {item.name}
                          </Link>
                          <p className="max-w-xs truncate text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-body-sm text-muted-foreground">
                      {item.category}
                    </td>
                    <td className="px-4 py-4 text-body-sm">
                      <p className="font-medium">
                        {item.prices.map((price) => `Rs. ${price}`).join(" · ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Starting at Rs. {item.prices[0]}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-body-sm font-semibold">
                      {item.orders}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                          statusStyles[item.status],
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground">
                      {item.updated}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <RowActionsMenu
                        label={item.name}
                        actions={[
                          { label: "View", href: `/menu/${item.id}` },
                          { label: "Edit", href: `/menu/${item.id}/edit` },
                          { label: "Duplicate", onSelect: () => undefined },
                          {
                            label:
                              item.status === "Active"
                                ? "Mark Unavailable"
                                : "Mark Active",
                            onSelect: () => undefined,
                          },
                          {
                            label: "Delete",
                            destructive: true,
                            dividerBefore: true,
                            onSelect: () => setDeleteItem(item),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t bg-surface-low p-4 text-body-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {filtered.length} of 24 pizzas</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="rounded border px-3 py-1.5 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded bg-primary px-3 py-1.5 font-medium text-white"
              >
                1
              </button>
              <button
                type="button"
                className="rounded border px-3 py-1.5 hover:bg-muted"
              >
                2
              </button>
              <button
                type="button"
                className="rounded border px-3 py-1.5 hover:bg-muted"
              >
                3
              </button>
              <button
                type="button"
                className="rounded border px-3 py-1.5 hover:bg-muted"
              >
                Next
              </button>
            </div>
          </div>
        </Card>
      </div>
      {deleteItem && (
        <MenuDeleteDialog
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
        />
      )}
    </div>
  );
}

export function MenuDeleteDialog({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-menu-title"
        className="w-full max-w-[480px] rounded-[var(--radius-lg)] border bg-surface-container-lowest p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-destructive/10 text-destructive">
            <Trash2 className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h2 id="delete-menu-title" className="type-section-title">
              Delete {item.name}?
            </h2>
            <p className="mt-1 text-body-sm text-muted-foreground">
              This action cannot be undone. The pizza will be removed from your
              catalog.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close delete dialog"
            className="ml-auto rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-[var(--radius-lg)] bg-surface-low p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <p className="text-body-sm text-muted-foreground">
            Orders and reporting history will remain available, but this pizza
            will no longer appear in the active menu.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-surface-container pt-4">
          <Button
            type="button"
            className="bg-surface-container text-foreground hover:bg-surface-container-high"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Pizza
          </Button>
        </div>
      </section>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="type-label-caps block text-muted-foreground">
      {children}
    </label>
  );
}

export function MenuForm({ edit = false }: { edit?: boolean }) {
  const [sizes, setSizes] = useState(["Small", "Medium", "Large"]);
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1180px] space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Breadcrumbs current={edit ? "Edit Pizza" : "New Pizza"} />
            <h1 className="type-page-title mt-3">
              {edit ? "Edit Pizza" : "Create Pizza"}
            </h1>
            <p className="mt-1 text-body-reg text-muted-foreground">
              Configure the pizza, pricing, and kitchen details for your menu.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/menu"
              className="inline-flex h-10 items-center rounded-[var(--radius)] px-4 text-sm font-semibold text-muted-foreground hover:bg-surface-high"
            >
              Cancel
            </Link>
            <Button type="button">
              {edit ? "Save Changes" : "Create Pizza"}
            </Button>
          </div>
        </div>
        <form
          className="grid gap-6 lg:grid-cols-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <Card className="space-y-6 p-6 lg:col-span-2">
            <div className="flex items-center gap-3 border-b pb-4">
              <Pizza className="h-5 w-5 text-primary" />
              <h2 className="type-card-title">Basic Information</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <FieldLabel>Pizza Name</FieldLabel>
                <Input
                  defaultValue={edit ? "Chicken Tikka" : ""}
                  placeholder="e.g., Truffle Mushroom Supreme"
                  required
                />
              </div>
              <div className="space-y-2">
                <FieldLabel>Category</FieldLabel>
                <select className="h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm">
                  <option>Signature Pizzas</option>
                  <option>Classic Favorites</option>
                  <option>Gourmet & Truffle</option>
                  <option>Plant-Based / Vegan</option>
                </select>
              </div>
              <div className="space-y-2">
                <FieldLabel>Status</FieldLabel>
                <select className="h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm">
                  <option>Active (Available immediately)</option>
                  <option>Unavailable (Out of stock)</option>
                  <option>Draft (Hidden from menu)</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <FieldLabel>Description</FieldLabel>
                <textarea
                  rows={4}
                  className="w-full resize-none rounded-[var(--radius)] border bg-surface-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Describe ingredients, flavor profile, cheese blend, and crust style..."
                  defaultValue={
                    edit
                      ? "Spicy marinated chicken chunks, bell peppers, and our signature sauce."
                      : ""
                  }
                />
              </div>
            </div>
            <div className="border-t pt-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
                    Rs
                  </span>
                  <h2 className="type-card-title">Pricing & Sizes</h2>
                </div>
                <Button type="button" className="h-9 px-3">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Size
                </Button>
              </div>
              <div className="space-y-3">
                {sizes.map((size, index) => (
                  <div
                    key={size}
                    className="grid items-end gap-3 rounded-[var(--radius)] bg-surface-low p-3 sm:grid-cols-[1fr_1fr_auto]"
                  >
                    <div className="space-y-1">
                      <FieldLabel>Size</FieldLabel>
                      <Input defaultValue={size} />
                    </div>
                    <div className="space-y-1">
                      <FieldLabel>Price (Rs.)</FieldLabel>
                      <Input
                        type="number"
                        defaultValue={[799, 1299, 1799][index] ?? 799}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${size} size`}
                      className="rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      onClick={() =>
                        setSizes((current) =>
                          current.filter((currentSize) => currentSize !== size),
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <div className="space-y-6">
            <Card className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <ImagePlus className="h-5 w-5 text-primary" />
                <h2 className="type-card-title">Pizza Imagery</h2>
              </div>
              <button
                type="button"
                className="flex min-h-40 w-full flex-col items-center justify-center rounded-[var(--radius-lg)] border-2 border-dashed border-border bg-surface-low p-6 text-center hover:border-primary"
              >
                <ImagePlus className="mb-3 h-8 w-8 text-primary" />
                <span className="text-sm font-semibold">
                  Upload Pizza Image
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG up to 10MB
                </span>
              </button>
            </Card>
            <Card className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-primary" />
                <h2 className="type-card-title">Kitchen Preparation</h2>
              </div>
              <div className="space-y-2">
                <FieldLabel>Preparation Time</FieldLabel>
                <div className="relative">
                  <Input type="number" defaultValue="15" />
                  <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                    mins
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <FieldLabel>Kitchen Station</FieldLabel>
                <select className="h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm">
                  <option>Station A - Wood Fire Oven</option>
                  <option>Station B - Prep & Assembly</option>
                  <option>Station C - Express Fryer/Oven</option>
                </select>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}

export function MenuDetails({ id = "chicken-tikka" }: { id?: string }) {
  const item = menuItems.find((entry) => entry.id === id) ?? menuItems[0];
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1180px] space-y-6">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-body-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pizzas
        </Link>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary">
              <Pizza className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="type-page-title">{item.name}</h1>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase",
                    statusStyles[item.status],
                  )}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-1 text-body-reg text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/menu/${item.id}/edit`}
              className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] bg-surface-high px-4 text-sm font-semibold hover:bg-surface-highest"
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </Link>
            <Button type="button">
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Pizza
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <p className="type-label-caps text-muted-foreground">Base Price</p>
            <p className="mt-1 text-2xl font-bold">Rs. {item.prices[0]}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Small size baseline
            </p>
          </Card>
          <Card className="p-5">
            <p className="type-label-caps text-muted-foreground">
              Total Orders
            </p>
            <p className="mt-1 text-2xl font-bold">{item.orders}</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-success">
              <TrendingUp className="h-3.5 w-3.5" />
              +12% this week
            </p>
          </Card>
          <Card className="p-5">
            <p className="type-label-caps text-muted-foreground">
              Active Sizes
            </p>
            <p className="mt-1 text-2xl font-bold">3 Sizes</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Small, Medium, Large
            </p>
          </Card>
          <Card className="p-5">
            <p className="type-label-caps text-muted-foreground">Prep Time</p>
            <p className="mt-1 text-2xl font-bold">15 min</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Average kitchen timer
            </p>
          </Card>
        </div>
        <Card className="overflow-hidden">
          <div className="border-b p-6">
            <h2 className="type-card-title">Size & Pricing Matrix</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="border-b bg-surface-low text-muted-foreground">
                <tr>
                  {[
                    "Size Name",
                    "Dimensions",
                    "Base Price",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th key={heading} className="type-table-header px-6 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Small", '8"', item.prices[0]],
                  ["Medium", '12"', item.prices[1]],
                  ["Large", '16"', item.prices[2]],
                ].map(([size, dimension, price]) => (
                  <tr key={size} className="hover:bg-surface-low">
                    <td className="px-6 py-4 text-sm font-semibold">{size}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {dimension}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      Rs. {price}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-semibold text-success">
                        Available
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        Configure
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="type-card-title">Recipe & Ingredients</h2>
            <p className="mt-4 text-body-sm text-muted-foreground">
              Signature tomato sauce, mozzarella, marinated chicken, bell
              peppers, and fresh herbs.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-surface-high px-3 py-1 text-xs font-medium">
                Dairy
              </span>
              <span className="rounded-full bg-surface-high px-3 py-1 text-xs font-medium">
                Gluten
              </span>
              <span className="rounded-full bg-surface-high px-3 py-1 text-xs font-medium">
                Garlic
              </span>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="type-card-title">Recent Activity</h2>
            <div className="mt-4 space-y-4">
              <p className="flex items-start gap-3 text-sm">
                <Activity className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  <strong>Price Updated</strong>
                  <span className="block text-xs text-muted-foreground">
                    Today, 2:45 PM
                  </span>
                </span>
              </p>
              <p className="flex items-start gap-3 text-sm">
                <PackageCheck className="mt-0.5 h-4 w-4 text-success" />
                <span>
                  <strong>Stock Restocked</strong>
                  <span className="block text-xs text-muted-foreground">
                    Yesterday, 11:20 AM
                  </span>
                </span>
              </p>
              <p className="flex items-start gap-3 text-sm">
                <Clock3 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>
                  <strong>Status Set to Active</strong>
                  <span className="block text-xs text-muted-foreground">
                    Oct 24, 4:15 PM
                  </span>
                </span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
