"use client";

import { Info, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type DeleteCategoryDialogProps = {
  onClose: () => void;
  onDelete?: () => void;
  categoryName: string;
  itemCount: number;
};

export function DeleteCategoryDialog({
  onClose,
  onDelete,
  categoryName,
  itemCount,
}: DeleteCategoryDialogProps) {
  const affectedItems = [
    ["Margherita Extra", "$14.50 · 450 orders this week"],
    ["Pepperoni Supreme", "$16.00 · 380 orders this week"],
    ["Truffle Funghi", "$18.50 · 210 orders this week"],
  ];
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-category-title"
        className="flex max-h-[90vh] w-full max-w-[520px] flex-col gap-6 overflow-y-auto rounded-[var(--radius-lg)] border bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-destructive/10 text-destructive">
            <Trash2 className="h-6 w-6" />
          </div>
          <div>
            <h2 id="delete-category-title" className="type-section-title">
              Delete category?
            </h2>
            <p className="mt-1 text-body-sm text-muted-foreground">
              &quot;{categoryName}&quot; contains{" "}
              <strong className="text-foreground">
                {itemCount} menu items
              </strong>
              .
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
        <div className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-surface-low p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <p className="text-body-sm leading-relaxed text-muted-foreground">
            You cannot delete this category until its menu items are moved to
            another category or removed entirely from the active catalog.
          </p>
        </div>
        <div className="space-y-2">
          <span className="type-label-caps text-muted-foreground">
            Sample Affected Items
          </span>
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {affectedItems.map(([name, detail]) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-[var(--radius-lg)] bg-surface p-2.5"
              >
                <div>
                  <p className="text-body-sm font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">{detail}</p>
                </div>
                <span className="rounded bg-surface-high px-2 py-1 text-xs text-muted-foreground">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-3 border-t border-surface-container pt-4">
          <Button
            type="button"
            className="bg-surface-container text-foreground hover:bg-surface-container-high"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="button">
            <span className="mr-2">↗</span>Move Items
          </Button>
          <Button
            type="button"
            disabled={itemCount > 0}
            onClick={onDelete}
            className="bg-surface-high text-muted-foreground"
            title="Cannot delete category while items are assigned"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </section>
    </div>
  );
}
