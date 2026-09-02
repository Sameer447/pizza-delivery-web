import Image from "next/image";
import type { ReactNode } from "react";

export function AuthBrandPanel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <section className={`relative hidden overflow-hidden p-12 lg:flex lg:w-1/2 lg:flex-col lg:justify-between ${dark ? "bg-zinc-900" : "border-r bg-surface-lowest"}`}>
    <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
    <div className="relative z-10 flex items-center gap-3"><Image src="/assets/logo.png" alt="" width={52} height={52} className="h-12 w-12 object-contain" priority /><span className={`text-page-title font-bold tracking-tight ${dark ? "text-white" : "text-primary"}`}>Pro-Kitchen Admin</span></div>
    <div className="relative z-10 max-w-lg">{children}</div>
    <p className={`relative z-10 text-body-sm ${dark ? "text-zinc-400" : "text-muted-foreground"}`}>© 2024 Pro-Kitchen Admin.</p>
  </section>;
}

export function MobileBrand({ dark = false }: { dark?: boolean }) { return <div className={`flex items-center justify-center gap-3 lg:hidden ${dark ? "text-white" : "text-primary"}`}><Image src="/assets/logo.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" priority /><span className="text-section-title font-bold tracking-tight">Pro-Kitchen Admin</span></div>; }
