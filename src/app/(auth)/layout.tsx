import type { ReactNode } from "react";
export default function AuthLayout({ children }: { children: ReactNode }) { return <div className="min-h-dvh overflow-hidden bg-muted/30">{children}</div>; }
