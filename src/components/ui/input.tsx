import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn("flex h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 py-2 text-sm outline-none placeholder:text-muted-foreground hover:border-outline focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />; }
