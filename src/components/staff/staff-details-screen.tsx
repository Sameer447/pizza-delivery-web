"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Download,
  Edit3,
  Laptop,
  Lock,
  Mail,
  Phone,
  Plus,
  Shield,
  Store,
  Tablet,
  UserRoundX,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

const memberships = [
  [
    "Pizza House - DHA Phase 5",
    "Store #402",
    "Flagship Hub",
    "Lead Head Admin",
    "14 Jan 2025",
    "Active (Primary)",
  ],
  [
    "Gulberg Galleria",
    "Store #108",
    "Express Hub",
    "Operations Supervisor",
    "18 Mar 2025",
    "Active",
  ],
  [
    "Bahria Town Sector C",
    "Store #204",
    "Dine-in & Cloud",
    "Backup Admin",
    "02 Aug 2026",
    "Active",
  ],
];
const permissionGroups = [
  {
    title: "Orders & Live Kitchen",
    icon: Activity,
    items: [
      [
        "View Orders",
        "Can monitor all incoming, active, and historical kitchen orders",
        "Inherited from Role",
        true,
      ],
      [
        "Accept & Reject Orders",
        "Can acknowledge or decline customer orders with automated notifications",
        "Inherited from Role",
        true,
      ],
      [
        "Live Kitchen KDS Dispatch",
        "Can advance ticket stages: Preparing, In-Oven Baking, Ready for Dispatch",
        "Inherited from Role",
        true,
      ],
      [
        "Cancel Active Order",
        "Requires mandatory operational reason log and automatically prompts refund pipeline",
        "Explicitly Granted",
        true,
      ],
    ],
  },
  {
    title: "Menu, Pricing & Customization",
    icon: Store,
    items: [
      [
        "View Menu Catalog",
        "Can browse pizzas, crust types, specialty sauces, and modifiers across stores",
        "Inherited from Role",
        true,
      ],
      [
        "Edit Pizza & Modifiers",
        "Can update recipe ingredient allowances, portion rules, and local branch pricing",
        "Inherited from Role",
        true,
      ],
      [
        "86'd Kitchen Inventory Toggle",
        "Can instantly mark ingredients or whole items out-of-stock on live customer apps",
        "Inherited from Role",
        true,
      ],
      [
        "Delete Menu Category / Pizza",
        "Permanent schema destruction. Requires Super Admin cryptographic authorization",
        "Restricted Policy",
        false,
      ],
    ],
  },
  {
    title: "Coupons, Customers & Reports",
    icon: Shield,
    items: [
      [
        "Customer Profile & Orders",
        "Can view order history, delivery driver notes, and direct contact details",
        "Inherited from Role",
        true,
      ],
      [
        "Create & Manage Coupons",
        "Within assigned restaurant marketing budgets (Max cap 20% discount per code)",
        "Inherited from Role",
        true,
      ],
      [
        "Financial Reports & Settlements",
        "Can generate daily store revenue summaries, cash reconciliation, and export CSV",
        "Inherited from Role",
        true,
      ],
      [
        "Platform Security & Global Settings",
        "Super Admin authority only. Multi-brand configuration and Stripe API key access",
        "Restricted Policy",
        false,
      ],
    ],
  },
];

export function StaffDetailsScreen() {
  const [permissionQuery, setPermissionQuery] = useState("");
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const action = (message: string) => () => notify(message);
  return (
    <div className="min-h-full bg-background px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1440px] space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <nav className="type-label-caps flex items-center gap-2 text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <span>/</span>
            <Link href="/staff" className="hover:text-primary">
              Staff &amp; Permissions
            </Link>
            <span>/</span>
            <span className="text-foreground">Marco Rossi</span>
          </nav>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success px-2.5 py-1 font-medium text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              KDS Cluster Sync: Realtime
            </span>
            <span className="hidden text-muted-foreground sm:inline">
              Node: LHE-PK-EDGE-01
            </span>
          </div>
        </div>
        <Card className="relative flex flex-col justify-between gap-6 overflow-hidden p-6 shadow-sm sm:p-8 xl:flex-row xl:items-center">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container text-2xl font-bold text-white shadow-md">
                MR
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 rounded-full bg-success p-1 text-white shadow-sm">
                <BadgeCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="type-page-title sm:text-3xl">Marco Rossi</h1>
                <span className="rounded-full bg-surface-high px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Restaurant Admin (Head Chef)
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Active (Token Verified)
                </span>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  #STF-0842
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  marco.rossi@prokitchen.io
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  +92 300 8472910
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  Joined 14 Jan 2025
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  Last active: Today, 12:44 PM (Lahore)
                </span>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap gap-2.5">
            <button
              onClick={action("Profile editing opened.")}
              className="inline-flex items-center gap-1.5 rounded bg-surface-high px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
            <button
              onClick={action("Access manager opened.")}
              className="inline-flex items-center gap-1.5 rounded bg-surface-highest px-4 py-2 text-xs font-semibold uppercase tracking-wider"
            >
              <Store className="h-4 w-4" />
              Manage Access
            </button>
            <button
              onClick={action("Deactivation requires confirmation.")}
              className="inline-flex items-center gap-1.5 rounded bg-destructive/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-destructive"
            >
              <UserRoundX className="h-4 w-4" />
              Deactivate Account
            </button>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Assigned Restaurants",
              "3",
              "Branches",
              "DHA #402 Flagship, Gulberg #108, Bahria #204",
              Store,
            ],
            [
              "Operational Role",
              "Restaurant Admin",
              "",
              "System Tier 2 (Multi-Store Cluster)",
              BadgeCheck,
            ],
            ["Granted Permissions", "38", "/ 44", "86% Effective", Shield],
            [
              "Security & Session",
              "2FA Enforced",
              "",
              "YubiKey 5C NFC + TOTP Google Auth",
              Lock,
            ],
          ].map(([title, value, suffix, detail, Icon]) => (
            <Card key={title as string} className="space-y-3 p-5 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="type-label-caps">{title as string}</span>
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-baseline gap-2">
                <b
                  className={cn(
                    "tracking-tight",
                    (value as string).length > 5 ? "text-xl" : "text-3xl",
                  )}
                >
                  {value as string}
                </b>
                <span className="text-xs text-muted-foreground">
                  {suffix as string}
                </span>
              </div>
              {title === "Granted Permissions" && (
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-high">
                  <div className="h-full w-[86.3%] rounded-full bg-primary" />
                </div>
              )}
              <p className="truncate text-xs text-muted-foreground">
                {detail as string}
              </p>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <Card className="overflow-hidden shadow-sm">
              <div className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center sm:p-6">
                <div>
                  <h2 className="type-section-title">
                    Restaurant Membership &amp; Scoping
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Locations where this staff member has delegated
                    administrative control.
                  </p>
                </div>
                <button
                  onClick={action("Branch access assignment opened.")}
                  className="inline-flex items-center gap-1.5 self-start rounded bg-primary px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Plus className="h-4 w-4" />
                  Assign Additional Access
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-xs">
                  <thead className="bg-surface-low text-[11px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      {[
                        "Restaurant",
                        "Scope & Tier",
                        "Role in Store",
                        "Assigned Date",
                        "Status",
                        "Action",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-3 font-semibold first:pl-5 last:pr-5"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-high">
                    {memberships.map(
                      ([name, store, scope, role, date, status], index) => (
                        <tr key={name} className="hover:bg-surface-low/50">
                          <td className="px-5 py-3.5">
                            <b>{name}</b>
                            <span className="block font-mono text-[11px] text-muted-foreground">
                              {store}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 font-medium">{scope}</td>
                          <td
                            className={cn(
                              "px-4 py-3.5",
                              index === 0 && "font-semibold text-primary",
                            )}
                          >
                            {role}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">
                            {date}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
                              {status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-5 py-3.5 text-right">
                            <button
                              onClick={action(
                                `${index === 0 ? "Role change" : "Access removal"} opened for ${name}.`,
                              )}
                              className={cn(
                                "text-xs font-semibold hover:underline",
                                index === 0
                                  ? "text-muted-foreground"
                                  : "text-destructive",
                              )}
                            >
                              {index === 0 ? "Change Role" : "Remove Access"}
                            </button>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between bg-surface-low/60 px-5 py-3.5 text-xs text-muted-foreground">
                <span>Showing 3 of 3 branch assignments</span>
                <span className="type-label-caps">Multi-Tenancy Active</span>
              </div>
            </Card>
            <Card className="space-y-6 p-6 shadow-sm sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="type-section-title">
                      Effective Permissions Matrix
                    </h2>
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary">
                      STAFF-07
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Resolved capabilities combining global role inheritance and
                    manual store overrides.
                  </p>
                </div>
                <input
                  value={permissionQuery}
                  onChange={(event) => setPermissionQuery(event.target.value)}
                  className="w-48 rounded bg-surface-low py-1.5 px-3 text-xs outline-none focus:bg-surface-high"
                  placeholder="Filter capability..."
                />
              </div>
              {permissionGroups.map(({ title, icon: Icon, items }) => {
                const filtered = items.filter(
                  ([name]) =>
                    !permissionQuery ||
                    (name as string)
                      .toLowerCase()
                      .includes(permissionQuery.toLowerCase()),
                );
                return filtered.length ? (
                  <div key={title} className="space-y-3">
                    <div className="flex items-center gap-2 py-1">
                      <Icon className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider">
                        {title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        (4 capabilities)
                      </span>
                    </div>
                    <div className="space-y-2 rounded-lg bg-surface-low p-3">
                      {filtered.map(([name, description, source, allowed]) => (
                        <div
                          key={name as string}
                          className={cn(
                            "flex flex-col justify-between gap-3 rounded bg-surface-lowest p-3.5 sm:flex-row sm:items-center",
                            !allowed && "opacity-80",
                          )}
                        >
                          <div>
                            <div className="text-xs font-semibold">
                              {name as string}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {description as string}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <span
                              className={cn(
                                "rounded px-2 py-0.5 font-mono text-[11px]",
                                allowed
                                  ? "bg-surface-high text-muted-foreground"
                                  : "bg-destructive/10 text-destructive",
                              )}
                            >
                              {source as string}
                            </span>
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                                allowed
                                  ? "bg-success/10 text-success"
                                  : "bg-surface-high text-muted-foreground",
                              )}
                            >
                              {allowed ? (
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              ) : (
                                <Lock className="h-3.5 w-3.5" />
                              )}
                              {allowed ? "Allowed" : "Denied"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;
              })}
            </Card>
          </div>
          <div className="space-y-6 lg:col-span-4">
            <Card className="space-y-5 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 text-primary" />
                  <h3 className="type-card-title">Security &amp; Audit Log</h3>
                </div>
                <span className="type-label-caps rounded bg-surface-high px-2 py-0.5">
                  STAFF-13
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Immutable tamper-proof operational trail for Marco Rossi.
              </p>
              <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-0.5 before:bg-surface-high">
                {[
                  [
                    "Today · 12:44 PM",
                    "Authenticated Session",
                    "Logged in via Chrome 128 / macOS. Hardware 2FA challenge verified successfully.",
                    "success",
                  ],
                  [
                    "Yesterday · 18:20 PM",
                    "Emergency Item 86'd",
                    "Toggled Fire-Roasted Jalapeños to Unavailable at DHA #402 due to fresh supplier shortage.",
                    "primary",
                  ],
                  [
                    "01 Sep 2026 · 14:15 PM",
                    "Kitchen Dispatch Signed",
                    "Order #10482 handed over to internal courier #12 (Tariq M.).",
                    "muted",
                  ],
                  [
                    "28 Aug 2026 · 10:11 AM",
                    "Store Assignment Added",
                    "Granted Backup Admin rights on Bahria Town #204 by Super Admin Marco.",
                    "muted",
                  ],
                  [
                    "14 Jan 2025 · 09:00 AM",
                    "Account Initialized",
                    "Invitation accepted, RSA key registered, credentials established.",
                    "muted",
                  ],
                ].map(([date, title, body, tone]) => (
                  <div key={title} className="relative">
                    <span
                      className={cn(
                        "absolute -left-6 top-1 h-2.5 w-2.5 rounded-full",
                        tone === "success"
                          ? "bg-success"
                          : tone === "primary"
                            ? "bg-primary"
                            : "bg-surface-highest",
                      )}
                    />
                    <div className="space-y-1">
                      <div
                        className={cn(
                          "font-mono text-[11px] font-semibold",
                          tone === "success"
                            ? "text-success"
                            : "text-muted-foreground",
                        )}
                      >
                        {date}
                      </div>
                      <div className="text-xs font-semibold">{title}</div>
                      <div className="text-xs text-muted-foreground">
                        {body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={action("Cryptographic audit export prepared.")}
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-surface-high py-2 text-xs font-semibold text-primary"
              >
                <Download className="h-4 w-4" />
                Export Cryptographic Log (JSON / CSV)
              </button>
            </Card>
            <Card className="space-y-3 bg-surface-high p-5">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h4 className="type-label-caps">Access Governance Policy</h4>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                There is a strict operational distinction between{" "}
                <b className="text-foreground">Account Status</b> and{" "}
                <b className="text-foreground">Restaurant Membership</b>.
              </p>
              <div className="space-y-2 rounded bg-surface-lowest p-3 text-[11px] text-muted-foreground">
                <div className="flex gap-1.5">
                  <CircleAlert className="h-4 w-4 shrink-0 text-destructive" />
                  <span>
                    <b className="text-foreground">Deactivating Marco:</b>{" "}
                    Immediately terminates all valid web tokens and active KDS
                    tablet sessions across all 3 stores.
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                  <span>
                    <b className="text-foreground">Removing Single Store:</b>{" "}
                    Revokes access to that location while keeping Marco active
                    in remaining branch registries.
                  </span>
                </div>
              </div>
            </Card>
            <Card className="space-y-3 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="type-label-caps text-muted-foreground">
                  Active Devices
                </span>
                <span className="text-xs font-bold text-success">2 Live</span>
              </div>
              {[
                [Laptop, 'MacBook Pro 16"', "DHA Phase 5 Admin Office"],
                [
                  Tablet,
                  "Kitchen Display iPad (Line 1)",
                  "Pizza Prep Station #1",
                ],
              ].map(([Icon, name, location]) => (
                <div
                  key={name as string}
                  className="flex items-center justify-between rounded bg-surface-low p-2.5 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <b>{name as string}</b>
                      <span className="block font-mono text-[10px] text-muted-foreground">
                        {location as string}
                      </span>
                    </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-success" />
                </div>
              ))}
              <button
                onClick={action(
                  "All active sessions require confirmation before revocation.",
                )}
                className="w-full rounded py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
              >
                Revoke All Active Sessions
              </button>
            </Card>
          </div>
        </div>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed right-6 top-20 z-50 rounded-lg bg-surface-lowest px-4 py-3 text-xs font-semibold shadow-xl"
        >
          {notice}
        </div>
      )}
    </div>
  );
}
