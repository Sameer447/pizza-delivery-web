"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  CircleAlert,
  Clock3,
  Download,
  KeyRound,
  Lock,
  RefreshCw,
  Send,
  Shield,
  UserRoundX,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

const roles = [
  [
    "Platform System Role · Protected",
    "Super Admin",
    "Tier-0 Global Kernel",
    "Full global control across all restaurant tenants, fiscal settlements, platform roles, and billing. Cannot be altered or downgraded by store operators.",
    "2 users",
    "44/44 (100% Unrestricted)",
    "bg-primary",
  ],
  [
    "Operational Role · Standard",
    "Restaurant Admin",
    "Tier-1 Store Supervisor",
    "Comprehensive management of assigned store nodes: live orders, recipe modifiers, staff scheduling, local coupons, and daily sales closing reconciliation.",
    "8 users",
    "38/44 (86% Operational)",
    "bg-success",
  ],
  [
    "Operational Role · Restricted",
    "Restaurant Staff",
    "Tier-2 Line Operator",
    "Station-level operational execution: order acknowledgement, kitchen display (KDS), dispatch coordination, and 86'd item availability flagging.",
    "14 users",
    "18/44 (40% Constrained)",
    "bg-secondary",
  ],
];
const invites = [
  [
    "AB",
    "a.bilal@cloudkitchens.pk",
    "INV-TK-99214",
    "Restaurant Admin",
    "01 Sep 2024",
    "Expires in 5 days",
    "PENDING",
  ],
  [
    "UL",
    "usman.lead@pizzahouse.com",
    "INV-TK-88019",
    "Restaurant Staff",
    "20 Aug 2024",
    "Expired: 27 Aug",
    "EXPIRED",
  ],
  [
    "FO",
    "fatima.ops@pizzahouse.com",
    "INV-TK-91024",
    "Restaurant Staff",
    "28 Aug 2024",
    "Activated: 29 Aug",
    "ACCEPTED",
  ],
];

export function SecurityGovernanceScreen() {
  const [reason, setReason] = useState("Kitchen Staff Turnover / Resignation");
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };
  return (
    <div className="relative min-h-full overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 rounded-full bg-success/5 blur-3xl" />
      <div className="relative mx-auto max-w-[1600px] space-y-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="type-label-caps flex items-center gap-2 text-muted-foreground">
              <span>Dashboard</span>
              <span>/</span>
              <span>Staff &amp; Permissions</span>
              <span>/</span>
              <span className="text-primary">Security Governance</span>
            </div>
            <h1 className="type-page-title mt-1 lg:text-3xl">
              Access Governance, Invitation Lifecycle &amp; Security Exceptions
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Enforce multi-tenant role compartmentalization, review operational
              credential lifecycles, and audit active authorization boundary
              exceptions across platform nodes.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start">
            <span className="inline-flex items-center gap-2 rounded bg-surface-low px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              SIEM Daemon Active
            </span>
            <button
              onClick={() => notify("Audit ledger export prepared.")}
              className="inline-flex items-center gap-2 rounded bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wider text-background"
            >
              <Download className="h-4 w-4" />
              Export Audit Ledger
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Configured Roles", "3", "Tiers", "Tier 0 Protected", Shield],
            [
              "Active Credentials",
              "24",
              "Staff",
              "3 pending activation",
              BadgeCheck,
            ],
            ["Tenant Violations", "01", "Today", "SEC-AUTH-403", CircleAlert],
            [
              "Avg Token Lifespan",
              "7.0",
              "Days",
              "Strict 168h timeout",
              Clock3,
            ],
          ].map(([title, value, suffix, detail, Icon], index) => (
            <Card
              key={title as string}
              className="flex items-center justify-between p-5 shadow-sm"
            >
              <div>
                <span className="type-label-caps text-muted-foreground">
                  {title as string}
                </span>
                <div
                  className={cn(
                    "mt-1 text-2xl font-bold",
                    index === 2 && "text-destructive",
                  )}
                >
                  {value as string}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    {suffix as string}
                  </span>
                </div>
                <span
                  className={cn(
                    "mt-1 flex items-center gap-1 text-xs font-medium",
                    index === 2 ? "text-destructive" : "text-success",
                  )}
                >
                  {detail as string}
                </span>
              </div>
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded bg-surface-low",
                  index === 2
                    ? "text-destructive"
                    : index === 1
                      ? "text-success"
                      : "text-primary",
                )}
              >
                <Icon className="h-6 w-6" />
              </span>
            </Card>
          ))}
        </div>
        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <span className="type-label-caps text-primary">
                Section 1 · Access Control Matrices
              </span>
              <h2 className="type-section-title">
                System Roles &amp; Tier Definitions (STAFF-08, STAFF-09)
              </h2>
            </div>
            <span className="rounded bg-surface-low px-3 py-1 text-xs font-mono text-muted-foreground">
              Permission Schema v4.2.0 • Realtime Propagated
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {roles.map(
              ([label, title, tier, description, members, scope], index) => (
                <Card
                  key={title}
                  className="relative flex flex-col justify-between gap-5 overflow-hidden p-6 shadow-sm"
                >
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-1",
                      roles[index][6] as string,
                    )}
                  />
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="rounded bg-surface-high px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                        {label}
                      </span>
                      <span className="rounded bg-surface-low px-2 py-0.5 text-[10px] font-bold tracking-wider text-muted-foreground">
                        {index === 0 ? "IMMUTABLE" : "ACTIVE"}
                      </span>
                    </div>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded bg-surface-high text-primary">
                        <Shield className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="type-card-title">{title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {tier}
                        </span>
                      </div>
                    </div>
                    <p className="mb-6 text-xs leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                    <div className="space-y-2.5 rounded bg-surface-low p-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Assigned Members:
                        </span>
                        <b>{members}</b>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Privilege Scope:
                        </span>
                        <b className={index === 0 ? "text-success" : ""}>
                          {scope}
                        </b>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-high">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            index === 0
                              ? "w-full bg-success"
                              : index === 1
                                ? "w-[86%] bg-primary"
                                : "w-[40%] bg-secondary",
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => notify(`${title} permission matrix opened.`)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-surface-high py-2.5 text-xs font-semibold"
                  >
                    <KeyRound className="h-4 w-4" />
                    {index === 0
                      ? "View Permission Matrix"
                      : index === 1
                        ? "Edit / Duplicate Role"
                        : "Edit / Duplicate Role"}
                  </button>
                </Card>
              ),
            )}
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <span className="type-label-caps text-primary">
                Section 2 · Critical Authorization Intercepts
              </span>
              <h2 className="type-section-title">
                Security Confirmation &amp; Lifecycle Dialogs (STAFF-11,
                STAFF-12)
              </h2>
            </div>
            <span className="rounded bg-surface-low px-2 py-1 text-xs font-mono text-muted-foreground">
              STATUS: ACTIVE_INTERCEPT_MODES
            </span>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card className="space-y-5 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded bg-destructive/10 text-destructive">
                    <UserRoundX className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="type-label-caps text-destructive">
                      STAFF-11 · High Risk Action
                    </span>
                    <h3 className="type-card-title">
                      Deactivate Staff Account — Zayd Omer
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      UID: #STF-0912 · Station Lead
                    </span>
                  </div>
                </div>
                <span className="rounded bg-destructive/10 px-2 py-1 text-[10px] font-bold uppercase text-destructive">
                  Auth Purge
                </span>
              </div>
              <div className="flex items-start gap-3 rounded bg-destructive/10 p-3.5">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <b className="text-xs text-destructive">
                    Immediate Platform Authentication Revocation
                  </b>
                  <p className="mt-0.5 text-xs leading-relaxed">
                    Deactivating this account immediately revokes user session
                    tokens across all 3 assigned restaurants. Historical kitchen
                    activity and audit logs remain preserved.
                  </p>
                </div>
              </div>
              <label className="block space-y-2">
                <span className="type-label-caps text-muted-foreground">
                  Mandatory Audit Reason
                </span>
                <select
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="w-full rounded bg-surface-low px-3 py-2.5 text-xs font-medium outline-none"
                >
                  <option>Kitchen Staff Turnover / Resignation</option>
                  <option>
                    Security Policy Breach / Unauthorized Shift Access
                  </option>
                  <option>Temporary Suspension (Investigation Pending)</option>
                  <option>Transfer to Non-Integrated Franchise Partner</option>
                </select>
                <span className="text-[11px] text-muted-foreground">
                  Appended to permanent compliance log ID:{" "}
                  <b className="font-mono text-foreground">
                    EVT-2024-8841-DEACT
                  </b>
                </span>
              </label>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => notify("Deactivation cancelled.")}
                  className="rounded px-4 py-2.5 text-xs font-semibold text-muted-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    notify(
                      `Zayd Omer deactivation queued with reason: ${reason}`,
                    )
                  }
                  className="inline-flex items-center gap-2 rounded bg-destructive px-5 py-2.5 text-xs font-semibold uppercase text-white"
                >
                  <UserRoundX className="h-4 w-4" />
                  Deactivate Account
                </button>
              </div>
            </Card>
            <Card className="space-y-5 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded bg-surface-high text-primary">
                    <Lock className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="type-label-caps text-primary">
                      STAFF-12 · Tenant Boundary Guard
                    </span>
                    <h3 className="type-card-title">
                      Access Restricted: Unauthorized Restaurant Scope
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      Scope Constraint: TENANT_ISOLATION_ACTIVE
                    </span>
                  </div>
                </div>
                <span className="rounded bg-surface-high px-2 py-1 text-[10px] font-bold text-primary">
                  HTTP 403
                </span>
              </div>
              <div className="space-y-2 rounded bg-surface-low p-4 text-xs leading-relaxed">
                You do not have administrative authority to manage staff or
                modify roles for{" "}
                <b className="text-primary">Bahria Town Sector C (#204)</b>.
                Your administrative scope is currently restricted to{" "}
                <b>Pizza House — DHA Phase 5 (#402)</b>.
                <div className="mt-1 space-y-1 rounded bg-surface-high/50 px-3 py-2 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Technical Audit Code:
                    </span>
                    <b className="text-primary">SEC-AUTH-403</b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Telemetry Ingestion:
                    </span>
                    <span className="text-success">
                      Logged to Security SIEM
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between rounded bg-surface-low p-3 text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Current Node: DHA #402
                </span>
                <X className="h-4 w-4 text-muted-foreground" />
                <span className="flex items-center gap-2 opacity-60">
                  <span className="h-2 w-2 rounded-full bg-destructive" />
                  Target Node: Bahria #204
                </span>
              </div>
              <div className="flex justify-end gap-3">
                <Link
                  href="/staff"
                  className="rounded bg-surface-high px-4 py-2.5 text-xs font-semibold"
                >
                  Return to Staff Directory
                </Link>
                <button
                  onClick={() =>
                    notify("Elevated scope request logged to security SIEM.")
                  }
                  className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-xs font-semibold uppercase text-white"
                >
                  <KeyRound className="h-4 w-4" />
                  Request Elevated Scope
                </button>
              </div>
            </Card>
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <span className="type-label-caps text-primary">
                Section 3 · In-Flight Onboarding Tokens
              </span>
              <h2 className="type-section-title">
                Invitation Lifecycle Management (STAFF-10)
              </h2>
            </div>
            <Link
              href="/administrations/invite"
              className="inline-flex items-center gap-2 self-start rounded bg-primary px-3.5 py-2 text-xs font-semibold uppercase text-white"
            >
              <Send className="h-4 w-4" />
              Issue New Invitation
            </Link>
          </div>
          <Card className="overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-xs">
                <thead className="bg-surface-low text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    {[
                      "Recipient Identity / Node",
                      "Provisioned Role",
                      "Dispatch Timestamp",
                      "Validity / Expiry State",
                      "Token Status",
                      "Operational Actions",
                    ].map((heading) => (
                      <th key={heading} className="px-6 py-3 font-semibold">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-high">
                  {invites.map(
                    ([initials, email, id, role, date, validity, status]) => (
                      <tr
                        key={id}
                        className={cn(
                          "hover:bg-surface-low/50",
                          status === "EXPIRED" && "bg-destructive/5",
                        )}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-high font-bold">
                              {initials}
                            </span>
                            <div>
                              <b>{email}</b>
                              <span className="block font-mono text-[11px] text-muted-foreground">
                                ID: {id}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded bg-surface-high px-2 py-0.5 font-medium">
                            {role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {date}
                          <span className="block text-[11px]">
                            10:14 AM (PKT)
                          </span>
                        </td>
                        <td
                          className={cn(
                            "px-6 py-4 font-medium",
                            status === "EXPIRED"
                              ? "text-destructive"
                              : "text-success",
                          )}
                        >
                          {validity}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={cn(
                              "rounded px-2.5 py-1 text-[10px] font-bold tracking-wider",
                              status === "EXPIRED"
                                ? "bg-destructive/10 text-destructive"
                                : status === "ACCEPTED"
                                  ? "bg-success/10 text-success"
                                  : "bg-surface-high text-muted-foreground",
                            )}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {status === "PENDING" && (
                              <>
                                <button
                                  onClick={() =>
                                    notify(`Invitation resent to ${email}.`)
                                  }
                                  className="inline-flex items-center gap-1 rounded bg-surface-high px-3 py-1.5 font-semibold"
                                >
                                  <RefreshCw className="h-3.5 w-3.5" />
                                  Resend
                                </button>
                                <button
                                  onClick={() => notify(`Token ${id} revoked.`)}
                                  className="rounded px-3 py-1.5 font-semibold text-destructive"
                                >
                                  Revoke
                                </button>
                              </>
                            )}
                            {status === "EXPIRED" && (
                              <>
                                <button
                                  onClick={() =>
                                    notify(`Invitation renewed for ${email}.`)
                                  }
                                  className="inline-flex items-center gap-1 rounded bg-primary px-3 py-1.5 font-semibold text-white"
                                >
                                  <RefreshCw className="h-3.5 w-3.5" />
                                  Renew &amp; Resend
                                </button>
                                <button
                                  onClick={() =>
                                    notify(`Inactive record ${id} deleted.`)
                                  }
                                  className="rounded px-3 py-1.5 font-semibold text-muted-foreground"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                            {status === "ACCEPTED" && (
                              <button
                                onClick={() =>
                                  notify(`Active profile for ${email} opened.`)
                                }
                                className="rounded bg-surface-high px-3 py-1.5 font-semibold"
                              >
                                View Active Profile
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col justify-between gap-2 bg-surface-low px-6 py-3 text-xs text-muted-foreground sm:flex-row">
              <span className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4 text-success" />
                Invitation links leverage 256-bit cryptographically salt-hashed
                single-use nonces.
              </span>
              <span>
                Showing 3 of 3 records ·{" "}
                <button
                  onClick={() =>
                    notify("Inactive records purge requires confirmation.")
                  }
                  className="font-semibold text-primary hover:underline"
                >
                  Purge Inactive Records
                </button>
              </span>
            </div>
          </Card>
        </section>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 rounded-lg bg-inverse-surface px-4 py-3 text-xs font-medium text-white shadow-xl"
        >
          {notice}
        </div>
      )}
    </div>
  );
}
