"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CakeSlice,
  CheckCircle2,
  CupSoda,
  PauseCircle,
  Pizza,
  Search,
  Tags,
  Utensils,
} from "lucide-react";

import { Pagination } from "@/components/shared/pagination";
import { DeleteCategoryDialog } from "@/components/categories/delete-category-dialog";
import { RowActionsMenu } from "@/components/shared/row-actions-menu";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type CategoryRow = {
  name: string;
  group: string;
  description: string;
  items: number;
  active: boolean;
  order: string;
  updated: string;
  icon: typeof Pizza;
};
const categories: CategoryRow[] = [
  {
    name: "Pizzas",
    group: "Main Course",
    description: "Hand-tossed authentic wood-fired artisanal pizzas",
    items: 24,
    active: true,
    order: "01",
    updated: "Oct 24, 2023",
    icon: Pizza,
  },
  {
    name: "Sides",
    group: "Appetizers",
    description: "Crispy fries, garlic bread, and savory starters",
    items: 8,
    active: true,
    order: "02",
    updated: "Oct 20, 2023",
    icon: Utensils,
  },
  {
    name: "Drinks",
    group: "Beverages",
    description: "Refreshing soft drinks, craft beers, and iced teas",
    items: 10,
    active: true,
    order: "03",
    updated: "Oct 18, 2023",
    icon: CupSoda,
  },
  {
    name: "Desserts",
    group: "Sweets",
    description: "Decadent homemade tiramisu and gelato cakes",
    items: 4,
    active: false,
    order: "04",
    updated: "Sep 12, 2023",
    icon: CakeSlice,
  },
];

export function CategoryList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [deleteCategory, setDeleteCategory] = useState<CategoryRow | null>(
    null,
  );
  const filtered = useMemo(
    () =>
      categories.filter(
        (category) =>
          category.name.toLowerCase().includes(search.toLowerCase()) &&
          (status === "all" ||
            (status === "active" ? category.active : !category.active)),
      ),
    [search, status],
  );
  const summary = [
    ["Total Categories", "8", Tags, "bg-primary/10 text-primary"],
    ["Active", "7", CheckCircle2, "bg-success/10 text-success"],
    ["Inactive", "1", PauseCircle, "bg-destructive/10 text-destructive"],
    ["Menu Items", "48", Utensils, "bg-surface-high text-foreground"],
  ] as const;
  return (
    <div className="h-full overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Dashboard</span>
          <span>›</span>
          <span>Menu</span>
          <span>›</span>
          <span className="text-primary">Categories</span>
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="type-page-title">Categories</h1>
            <p className="mt-1 text-body-reg text-muted-foreground">
              Organize your restaurant menu into clear customer-facing
              categories.
            </p>
          </div>
          <Link
            href="/menu/categories/create"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-container"
          >
            <span className="text-xl leading-none">+</span>Add Category
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summary.map(([label, value, Icon, color]) => (
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
          <div className="flex flex-col gap-4 border-b p-4 sm:p-6 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-10 pl-10"
                placeholder="Search category name..."
              />
            </div>
            <div className="flex w-full gap-3 md:w-auto">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-10 flex-1 rounded-[var(--radius)] border bg-surface-low px-3 text-sm md:w-44"
                aria-label="Filter category status"
              >
                <option value="all">Status: All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                className="h-10 flex-1 rounded-[var(--radius)] border bg-surface-low px-3 text-sm md:w-44"
                aria-label="Sort categories"
              >
                <option>Sort: Display Order</option>
                <option>Name (A-Z)</option>
                <option>Item Count</option>
                <option>Recently Updated</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b bg-surface-low text-muted-foreground">
                <tr>
                  {[
                    "Category",
                    "Description",
                    "Items count",
                    "Status",
                    "Display Order",
                    "Updated date",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="type-table-header px-4 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((category) => {
                  const Icon = category.icon;
                  return (
                    <tr
                      key={category.name}
                      className="transition-colors hover:bg-surface-low"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-[var(--radius)]",
                              category.active
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive",
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <Link
                              href={`/menu/categories/${category.name.toLowerCase()}`}
                              className="font-semibold hover:text-primary hover:underline"
                            >
                              {category.name}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              {category.group}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="max-w-xs truncate px-4 py-4 text-body-sm text-muted-foreground">
                        {category.description}
                      </td>
                      <td className="px-4 py-4 text-body-sm font-semibold">
                        {category.items} items
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                            category.active
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive",
                          )}
                        >
                          {category.active ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-mono text-body-sm font-medium">
                        {category.order}
                      </td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {category.updated}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <RowActionsMenu
                          label={category.name}
                          actions={
                            category.active
                              ? [
                                  {
                                    label: "View",
                                    href: `/menu/categories/${category.name.toLowerCase()}`,
                                  },
                                  {
                                    label: "Edit",
                                    href: `/menu/categories/${category.name.toLowerCase()}/edit`,
                                  },
                                  {
                                    label: "Move Up",
                                    onSelect: () => undefined,
                                  },
                                  {
                                    label: "Move Down",
                                    onSelect: () => undefined,
                                  },
                                  {
                                    label: "Deactivate",
                                    onSelect: () => undefined,
                                  },
                                  {
                                    label: "Delete",
                                    destructive: true,
                                    dividerBefore: true,
                                    onSelect: () => setDeleteCategory(category),
                                  },
                                ]
                              : [
                                  {
                                    label: "View",
                                    href: `/menu/categories/${category.name.toLowerCase()}`,
                                  },
                                  {
                                    label: "Edit",
                                    href: `/menu/categories/${category.name.toLowerCase()}/edit`,
                                  },
                                  {
                                    label: "Activate",
                                    onSelect: () => undefined,
                                  },
                                  {
                                    label: "Delete",
                                    destructive: true,
                                    dividerBefore: true,
                                    onSelect: () => setDeleteCategory(category),
                                  },
                                ]
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            page={1}
            totalPages={2}
            totalItems={8}
            pageSize={4}
            itemLabel="categories"
          />
        </Card>
        {deleteCategory && (
          <DeleteCategoryDialog
            categoryName={deleteCategory.name}
            itemCount={deleteCategory.items}
            onClose={() => setDeleteCategory(null)}
          />
        )}
      </div>
    </div>
  );
}
