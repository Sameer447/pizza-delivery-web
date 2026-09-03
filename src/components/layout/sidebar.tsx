"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  HelpCircle,
  Info,
  LayoutDashboard,
  Plus,
  Settings,
  Shield,
  ShoppingBag,
  Store,
  Ticket,
  UserCog,
  Users,
  Utensils,
  X,
} from "lucide-react";

import { canAny, hasRole } from "@/lib/permissions";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/providers/auth-provider";

const items = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN"] as const,
  },
  {
    label: "Restaurant Dashboard",
    href: "/restaurant-dashboard",
    icon: Store,
    permissions: ["restaurant.dashboard.read"],
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"] as const,
  },
  {
    label: "Restaurants",
    href: "/restaurants",
    icon: Store,
    roles: ["SUPER_ADMIN"] as const,
    permissions: ["restaurants.read"],
  },
  {
    label: "Administrators",
    href: "/administrations",
    icon: Users,
    roles: ["SUPER_ADMIN"] as const,
    permissions: ["administrations.read"],
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingBag,
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"] as const,
    permissions: ["orders.read"],
  },
  {
    label: "Menu",
    href: "/menu",
    icon: Utensils,
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"] as const,
    permissions: ["menu.read"],
  },
  {
    label: "Categories",
    href: "/categories",
    icon: Utensils,
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"] as const,
    permissions: ["categories.read"],
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN"] as const,
    permissions: ["customers.read"],
  },
  {
    label: "Coupons",
    href: "/coupons",
    icon: Ticket,
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN"] as const,
    permissions: ["coupons.read"],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN"] as const,
    permissions: ["reports.read"],
  },
  {
    label: "Staff",
    href: "/staff",
    icon: UserCog,
    roles: ["RESTAURANT_ADMIN"] as const,
    permissions: ["staff.read"],
  },
  {
    label: "Audit Logs",
    href: "/audit-logs",
    icon: Shield,
    roles: ["SUPER_ADMIN"] as const,
    permissions: ["audit-logs.read"],
  },
  {
    label: "Settings",
    href: "/restaurant-dashboard/settings",
    icon: Settings,
    roles: ["SUPER_ADMIN", "RESTAURANT_ADMIN", "RESTAURANT_STAFF"] as const,
    permissions: ["restaurant.settings.read", "settings.read"],
  },
];

type SidebarProps = { open?: boolean; onClose?: () => void };

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const visibleItems = items.filter(
    (item) =>
      (!item.roles || item.roles.some((role) => hasRole(user, role))) &&
      (!item.permissions ||
        !user?.permissionsLoaded ||
        canAny(user, item.permissions)),
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "admin-sidebar fixed inset-y-0 left-0 z-40 flex w-[260px] shrink-0 -translate-x-full flex-col transition-transform duration-200 lg:static lg:translate-x-0",
          open && "translate-x-0",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-zinc-700 px-4">
          <Image
            src="/assets/logo.png"
            alt="Pro-Kitchen Admin"
            width={52}
            height={52}
            className="h-12 w-12 object-contain"
            priority
          />
          <span className="text-lg font-semibold">Pizza Admin</span>
          <button
            className="ml-auto rounded p-1 text-zinc-400 hover:bg-zinc-800 lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <button className="mx-4 mb-4 mt-5 flex h-10 items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-container">
          <Plus className="h-4 w-4" /> New Order
        </button>
        <nav className="flex-1 space-y-1 px-4" aria-label="Main navigation">
          {visibleItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "nav-link flex items-center gap-3 px-3 py-2 text-sm",
                  active && "active",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4" /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-zinc-700 p-4">
          <a
            className="nav-link flex items-center gap-3 px-3 py-2 text-sm"
            href="mailto:support@prokitchen.com"
          >
            <HelpCircle className="h-4 w-4" /> Support
          </a>
          <span className="flex items-center gap-3 px-3 py-2 text-xs text-zinc-500">
            <Info className="h-4 w-4" /> Version 1.0
          </span>
        </div>
      </aside>
    </>
  );
}
