"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Edit3,
  Eye,
  MoreVertical,
  Pause,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

export type RowAction = {
  label: string;
  href?: string;
  onSelect?: () => void;
  destructive?: boolean;
  disabled?: boolean;
  dividerBefore?: boolean;
};

const icons: Record<string, ReactNode> = {
  View: <Eye className="h-[18px] w-[18px]" />,
  Edit: <Edit3 className="h-[18px] w-[18px]" />,
  "Move Up": <ArrowUp className="h-[18px] w-[18px]" />,
  "Move Down": <ArrowDown className="h-[18px] w-[18px]" />,
  Activate: <Check className="h-[18px] w-[18px]" />,
  Deactivate: <Pause className="h-[18px] w-[18px]" />,
  Delete: <Trash2 className="h-[18px] w-[18px]" />,
};

export function RowActionsMenu({
  label,
  actions,
}: {
  label: string;
  actions: RowAction[];
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="rounded p-2 text-muted-foreground transition-colors hover:bg-surface-high hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`Actions for ${label}`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <MoreVertical className="h-5 w-5" />
      </button>
      {open && (
        <div
          className="absolute right-0 z-50 mt-2 w-48 rounded-[var(--radius-lg)] border border-outline-variant/30 bg-white py-1 shadow-lg"
          role="menu"
          aria-label={`${label} actions`}
        >
          {actions.map((action) => {
            const content = (
              <span
                className={cn(
                  "flex w-full items-center gap-3 rounded px-4 py-2 text-sm transition-colors",
                  action.disabled
                    ? "cursor-not-allowed text-muted-foreground opacity-50"
                    : action.destructive
                      ? "text-destructive hover:bg-destructive/10"
                      : "text-foreground hover:bg-surface-low",
                )}
              >
                {icons[action.label]}
                {action.label}
              </span>
            );
            const props = {
              role: "menuitem",
              "aria-disabled": action.disabled || undefined,
              onClick: () => {
                if (!action.disabled) {
                  action.onSelect?.();
                  close();
                }
              },
            };
            return (
              <div
                key={action.label}
                className={cn(
                  action.dividerBefore &&
                    "mt-1 border-t border-outline-variant/20 pt-1",
                )}
              >
                {action.href && !action.disabled ? (
                  <Link href={action.href} {...props}>
                    {content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="w-full text-left"
                    disabled={action.disabled}
                    {...props}
                  >
                    {content}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
