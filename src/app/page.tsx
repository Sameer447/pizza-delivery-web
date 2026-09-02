"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => router.replace("/login"), 2000);
    return () => window.clearTimeout(redirectTimer);
  }, [router]);

  return (
    <main className="splash-grid relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-8 text-center text-foreground">
      <div className="absolute left-8 top-8 flex gap-2" aria-hidden="true">
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary/20" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary/40 [animation-delay:75ms]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary/60 [animation-delay:150ms]" />
      </div>
      <div className="absolute right-8 top-8 font-mono text-xs text-muted-foreground/60">SYS.REQ // 0x8F2A</div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <div className="group relative mb-8">
          <div className="absolute inset-0 scale-150 rounded-full bg-primary/5 blur-xl transition-transform duration-700 group-hover:scale-125" />
          <Image src="/assets/logo.png" alt="Pro-Kitchen Admin Logo" width={96} height={96} priority className="relative z-10 h-24 w-24 object-contain drop-shadow-sm" />
        </div>
        <h1 className="mb-2 text-[24px] font-semibold tracking-[-0.01em]">PRO-KITCHEN ADMIN</h1>
        <p className="mb-12 text-[14px] leading-5 text-muted-foreground">Restaurant Operations Platform</p>

        <div className="flex w-full flex-col items-center gap-4">
          <span className="type-label-caps text-primary">Initializing kitchen operations...</span>
          <div className="h-1 w-full max-w-[240px] overflow-hidden rounded-full bg-surface-high" role="progressbar" aria-label="Initializing kitchen operations" aria-valuemin={0} aria-valuemax={100} aria-valuenow={78}>
            <div className="splash-progress h-full w-[60px] rounded-full bg-primary" />
          </div>
          <div className="mt-2 flex w-full max-w-[240px] justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
            <span>Modules Loading</span>
            <span className="animate-pulse">78%</span>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-8 left-0 w-full text-[12px] font-medium tracking-wide text-muted-foreground/80">v1.0 · Admin</footer>
    </main>
  );
}
