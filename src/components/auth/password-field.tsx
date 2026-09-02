"use client";
import { Eye, EyeOff, Lock, LockKeyhole } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
type Props = { id: string; label: string; placeholder?: string; autoComplete?: string; className?: string; registration?: UseFormRegisterReturn };
export function PasswordField({ id, label, placeholder = "••••••••", autoComplete, className, registration }: Props) { const [visible, setVisible] = useState(false); return <div className={cn("space-y-1", className)}><label htmlFor={id} className="block text-body-sm font-medium">{label}</label><div className="relative"><Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input id={id} name={id} type={visible ? "text" : "password"} placeholder={placeholder} autoComplete={autoComplete} required className="pl-10 pr-10" {...registration} /><button type="button" onClick={() => setVisible((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={visible ? `Hide ${label}` : `Show ${label}`}>{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>; }
export function PasswordRequirement({ children, valid }: { children: React.ReactNode; valid?: boolean }) { return <li className={cn("flex items-center gap-2 text-body-sm", valid ? "text-success" : "text-muted-foreground")}><LockKeyhole className="h-3.5 w-3.5" />{children}</li>; }
