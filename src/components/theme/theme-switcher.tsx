"use client";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";
const options = [{ value: "light", label: "Light", icon: Sun }, { value: "dark", label: "Dark", icon: Moon }, { value: "system", label: "System", icon: Monitor }] as const;
export function ThemeSwitcher() { const { theme, setTheme } = useTheme(); return <div className="flex items-center gap-1 rounded-[var(--radius)] border bg-surface-low p-1" aria-label="Theme preference">{options.map(({ value, label, icon: Icon }) => <button key={value} type="button" onClick={() => setTheme(value)} aria-label={`${label} theme`} aria-pressed={theme === value} className={cn("rounded-[var(--radius)] p-1.5 text-muted-foreground hover:text-foreground", theme === value && "bg-surface-lowest text-primary") }><Icon className="h-4 w-4" /></button>)}</div>; }
