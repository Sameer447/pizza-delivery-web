"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Forward,
  UsersRound,
  MoreVertical,
  Search,
  ShieldCheck,
  Shield,
  UserRoundCheck,
  UserRoundPlus,
  UserX,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type StaffStatus = "ACTIVE" | "INVITED · Expires 5d" | "DEACTIVATED";
type Staff = {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: string;
  subrole: string;
  access: string[];
  status: StaffStatus;
  lastActive: string;
  device?: string;
  created: string;
  tone: string;
};

const staff: Staff[] = [
  {
    id: "STF-00104",
    initials: "MR",
    name: "Marco Rossi",
    email: "marco.rossi@prokitchen.io",
    role: "Restaurant Admin",
    subrole: "Head Chef / Fleet Exec",
    access: ["Pizza House #402", "Gulberg #108", "+1 more"],
    status: "ACTIVE",
    lastActive: "3 mins ago",
    device: "Web POS · Chrome",
    created: "14 Jan 2025",
    tone: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    id: "STF-00218",
    initials: "SJ",
    name: "Sarah Jenkins",
    email: "sarah.j@pizzahouse.com",
    role: "Restaurant Staff",
    subrole: "Shift Lead",
    access: ["Pizza House #402"],
    status: "ACTIVE",
    lastActive: "42 mins ago",
    device: "Kitchen KDS · Station A",
    created: "02 Feb 2025",
    tone: "bg-secondary-container text-on-secondary-container",
  },
  {
    id: "STF-00341",
    initials: "TM",
    name: "Tariq Mehmood",
    email: "tariq.courier@pizzahouse.com",
    role: "Restaurant Staff",
    subrole: "Fleet & Expo Driver",
    access: ["Pizza House #402"],
    status: "ACTIVE",
    lastActive: "Today, 11:20 AM",
    device: "Courier Mobile App",
    created: "15 Mar 2025",
    tone: "bg-surface-high text-foreground",
  },
  {
    id: "STF-00412",
    initials: "AB",
    name: "Ayesha Bilal",
    email: "a.bilal@cloudkitchens.pk",
    role: "Restaurant Admin",
    subrole: "General Manager Candidate",
    access: ["Bahria Town #204"],
    status: "INVITED · Expires 5d",
    lastActive: "Never",
    created: "01 Sep 2026",
    tone: "bg-surface text-muted-foreground",
  },
  {
    id: "STF-00088",
    initials: "ZO",
    name: "Zayd Omer",
    email: "zayd.omer@pizzahouse.com",
    role: "Restaurant Staff",
    subrole: "Line Cook (Terminated)",
    access: ["Pizza House #402"],
    status: "DEACTIVATED",
    lastActive: "14 Aug 2026",
    device: "Revoked by STF-00104",
    created: "10 Jan 2025",
    tone: "bg-error/15 text-destructive",
  },
];

const filters = [
  "All (24)",
  "Restaurant Admins (8)",
  "Restaurant Staff (13)",
  "Pending Invites (3)",
  "Suspended (2)",
];

export function StaffListScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [selected, setSelected] = useState<string[]>([
    staff[0].id,
    staff[1].id,
  ]);
  const [menu, setMenu] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const visibleStaff = useMemo(
    () =>
      staff.filter((member) => {
        const searchable =
          `${member.name} ${member.email} ${member.role}`.toLowerCase();
        if (query && !searchable.includes(query.toLowerCase())) return false;
        if (activeFilter.includes("Restaurant Admins"))
          return member.role === "Restaurant Admin";
        if (activeFilter.includes("Restaurant Staff"))
          return member.role === "Restaurant Staff";
        if (activeFilter.includes("Pending"))
          return member.status.startsWith("INVITED");
        if (activeFilter.includes("Suspended"))
          return member.status === "DEACTIVATED";
        return true;
      }),
    [activeFilter, query],
  );
  const allVisibleSelected =
    visibleStaff.length > 0 &&
    visibleStaff.every((member) => selected.includes(member.id));
  const toggleSelected = (id: string) =>
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const toggleAll = () =>
    setSelected(
      allVisibleSelected
        ? selected.filter(
            (id) => !visibleStaff.some((member) => member.id === id),
          )
        : [
            ...new Set([
              ...selected,
              ...visibleStaff.map((member) => member.id),
            ]),
          ],
    );

  return (
    <div className="min-h-full bg-background px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1">
            <div className="type-label-caps flex items-center gap-2 text-muted-foreground">
              <span>Dashboard</span>
              <span>›</span>
              <span className="text-primary">Staff &amp; Permissions</span>
            </div>
            <h1 className="type-page-title">Staff &amp; Permissions</h1>
            <p className="max-w-2xl text-xs text-muted-foreground sm:text-sm">
              Manage administrators, staff access, roles, and restaurant
              membership across authorized locations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => notify("Directory synchronized just now.")}
              className="inline-flex items-center gap-2 rounded bg-surface-high px-3 py-2 text-xs font-semibold"
            >
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              Sync Directory
            </button>
            <button
              onClick={() => notify("Staff CSV export prepared.")}
              className="inline-flex items-center gap-2 rounded bg-surface-high px-3 py-2 text-xs font-semibold"
            >
              <Download className="h-4 w-4 text-muted-foreground" />
              Export CSV
            </button>
            <Link
              href="/administrations/invite"
              className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-xs font-semibold text-white"
            >
              <UserRoundPlus className="h-4 w-4" />+ Invite Staff
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Total Staff",
              "24",
              "+2 this month",
              "Across 3 active restaurant nodes",
              UsersRound,
            ],
            [
              "Active Members",
              "19",
              "91% auth rate",
              "Authenticated on POS & KDS fleet",
              UserRoundCheck,
            ],
            [
              "Pending Invites",
              "3",
              "Expiring ≤ 48h",
              "Action required: onboarding pending",
              Forward,
            ],
            [
              "Suspended / Inactive",
              "2",
              "Access revoked",
              "Archived credentials logged in audit",
              UserX,
            ],
          ].map(([title, value, badge, detail, Icon], index) => (
            <Card key={title as string} className="space-y-2 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="type-label-caps text-muted-foreground">
                  {title as string}
                </span>
                <span className="rounded bg-surface-high p-1 text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <b className="text-2xl tracking-tight">{value as string}</b>
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-[11px] font-semibold",
                    index === 3
                      ? "bg-destructive/10 text-destructive"
                      : "bg-success/10 text-success",
                  )}
                >
                  {badge as string}
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground">
                {detail as string}
              </div>
            </Card>
          ))}
        </div>
        <div className="space-y-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs font-medium">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "whitespace-nowrap rounded px-3 py-1.5",
                  activeFilter === filter
                    ? "bg-primary font-semibold text-white shadow-sm"
                    : "bg-surface-lowest text-muted-foreground hover:bg-surface-high",
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          <Card className="flex flex-col justify-between gap-2.5 p-3 shadow-sm lg:flex-row lg:items-center">
            <div className="relative min-w-[240px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded bg-surface-low py-2 pl-9 pr-4 text-xs outline-none placeholder:text-muted-foreground focus:bg-surface-high"
                placeholder="Search staff by name, email, or role..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <FilterButton label="Role: All" />
              <FilterButton label="Branch: All Locations" />
              <FilterButton label="Status: All" />
              <FilterButton
                label="Sort: Last Active"
                icon={<ArrowDownUp className="h-3.5 w-3.5" />}
              />
            </div>
          </Card>
        </div>
        <Card className="flex flex-wrap items-center justify-between gap-3 bg-surface-highest px-4 py-2.5 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-semibold text-primary">
              {selected.length} staff members selected
            </span>
            <span className="hidden text-muted-foreground sm:inline">
              | Bulk commands applied to selected identities
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => notify("Invitations resent to selected staff.")}
              className="rounded bg-surface-lowest px-2.5 py-1 text-[11px] font-semibold text-primary"
            >
              Resend Invitations
            </button>
            <button
              onClick={() =>
                notify("Selected staff access has been deactivated.")
              }
              className="rounded bg-destructive px-2.5 py-1 text-[11px] font-semibold text-white"
            >
              Deactivate Selected
            </button>
            <button
              onClick={() => setSelected([])}
              className="px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              Clear Selection
            </button>
          </div>
        </Card>
        <Card className="overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-xs">
              <thead className="bg-surface-low text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleAll}
                      aria-label="Select all visible staff"
                      className="accent-primary"
                    />
                  </th>
                  {[
                    "Staff Member",
                    "Email",
                    "Assigned Role",
                    "Restaurant Access",
                    "Status",
                    "Last Active",
                    "Created",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={cn(
                        "px-4 py-3 font-semibold",
                        heading === "Actions" && "text-right",
                      )}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-high/60">
                {visibleStaff.map((member) => (
                  <tr
                    key={member.id}
                    className={cn(
                      "transition-colors hover:bg-surface-low/60",
                      member.status === "DEACTIVATED" && "opacity-80",
                    )}
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={selected.includes(member.id)}
                        onChange={() => toggleSelected(member.id)}
                        aria-label={`Select ${member.name}`}
                        className="accent-primary"
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                            member.tone,
                          )}
                        >
                          {member.initials}
                          <span
                            className={cn(
                              "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white",
                              member.status === "DEACTIVATED"
                                ? "bg-destructive"
                                : member.status.startsWith("INVITED")
                                  ? "bg-muted-foreground"
                                  : "bg-success",
                            )}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={cn(
                                "truncate font-semibold",
                                member.status === "DEACTIVATED" &&
                                  "line-through decoration-destructive/50",
                              )}
                            >
                              {member.name}
                            </span>
                            {member.name === "Marco Rossi" && (
                              <span className="rounded bg-surface-high px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary">
                                Super Admin
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-muted-foreground">
                            ID: {member.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-muted-foreground">
                      {member.email}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-medium">{member.role}</span>
                      <span className="block text-[11px] text-muted-foreground">
                        {member.subrole}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {member.access.map((item) => (
                          <span
                            key={item}
                            className="rounded bg-surface-high px-2 py-0.5 text-[11px] font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                          member.status === "ACTIVE"
                            ? "bg-success/15 text-success"
                            : member.status === "DEACTIVATED"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-surface-high text-muted-foreground",
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {member.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5">
                      <span className="font-medium">{member.lastActive}</span>
                      {member.device && (
                        <span
                          className={cn(
                            "block text-[10px] font-mono",
                            member.status === "DEACTIVATED"
                              ? "text-destructive"
                              : "text-muted-foreground",
                          )}
                        >
                          {member.device}
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-[11px] text-muted-foreground">
                      {member.created}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() =>
                            notify(`${member.name} access management opened.`)
                          }
                          className="rounded bg-surface-high px-2.5 py-1 text-xs font-semibold hover:bg-surface-highest"
                        >
                          {member.status.startsWith("INVITED")
                            ? "Resend Invite"
                            : member.status === "DEACTIVATED"
                              ? "Reactivate"
                              : "Manage Access"}
                        </button>
                        <div className="relative">
                          <button
                            onClick={() =>
                              setMenu(menu === member.id ? null : member.id)
                            }
                            aria-label={`More actions for ${member.name}`}
                            className="rounded p-1 text-muted-foreground hover:bg-surface-high"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {menu === member.id && (
                            <div className="absolute right-0 z-20 mt-1 w-36 rounded-lg border bg-white p-1 text-left shadow-xl">
                              <button
                                onClick={() =>
                                  notify(
                                    `Audit history for ${member.name} opened.`,
                                  )
                                }
                                className="w-full rounded px-2 py-1.5 text-xs hover:bg-surface-low"
                              >
                                View audit log
                              </button>
                              <button
                                onClick={() =>
                                  notify(`Invite for ${member.name} copied.`)
                                }
                                className="w-full rounded px-2 py-1.5 text-xs hover:bg-surface-low"
                              >
                                Copy invite link
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 bg-surface-low px-4 py-3 text-xs text-muted-foreground sm:flex-row">
            <div>
              Showing <b className="text-foreground">1</b> -{" "}
              <b className="text-foreground">{visibleStaff.length}</b> of{" "}
              <b className="text-foreground">24</b> staff records
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="rounded bg-surface-high px-2 py-1 opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => notify(`Staff page ${page} selected.`)}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded",
                    page === 1
                      ? "bg-primary font-semibold text-white"
                      : "bg-surface-high hover:bg-surface-highest",
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => notify("Next staff page selected.")}
                className="rounded bg-surface-high px-2 py-1"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>
        <Card className="flex flex-col justify-between gap-4 p-4 shadow-sm md:flex-row md:items-center">
          <div className="flex items-start gap-3.5">
            <div className="rounded bg-surface-high p-2 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="type-label-caps">
                Security &amp; Granular RBAC Framework
              </div>
              <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted-foreground">
                <strong>Access Control Architecture:</strong> User Role governs
                system capability; Restaurant Membership strictly restricts
                tenant boundary; Permissions define operational actions.
                Passwords, session tokens, and PIN authentications are
                cryptographically protected under multi-tenant isolation.
              </p>
            </div>
          </div>
          <Link
            href="/audit-logs"
            className="shrink-0 text-xs font-semibold text-primary hover:underline"
          >
            View Security Audit Logs →
          </Link>
        </Card>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed right-6 top-20 z-50 flex items-center gap-2 rounded-lg bg-surface-lowest px-4 py-3 text-xs font-semibold shadow-xl"
        >
          <FileText className="h-4 w-4 text-success" />
          {notice}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  label,
  icon,
}: {
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button className="inline-flex items-center gap-1.5 whitespace-nowrap rounded bg-surface-high px-2.5 py-2 text-xs font-medium hover:bg-surface-highest">
      {label}
      {icon ?? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
    </button>
  );
}
