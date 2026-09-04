"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronRight,
  Info,
  KeyRound,
  Mail,
  Phone,
  Send,
  Shield,
  Store,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const branches = [
  [
    "PH-402",
    "Pizza House — DHA Phase 5",
    "Store #402 • DHA Ring Road, Lahore",
    "Primary Flagship",
  ],
  [
    "PH-108",
    "Gulberg Galleria Hub",
    "Store #108 • Main Boulevard, Gulberg",
    "Express Hub",
  ],
  [
    "PH-204",
    "Bahria Town Sector C",
    "Store #204 • Commercial Zone",
    "Unassigned",
  ],
  ["PH-009", "Mall Road Express", "Store #009 • Heritage Arcade", "Unassigned"],
];

export function InviteStaffModalScreen() {
  const [firstName, setFirstName] = useState("Kamran");
  const [lastName, setLastName] = useState("Akram");
  const [email, setEmail] = useState("kamran.akram@pizzahouse.pk");
  const [phone, setPhone] = useState("+92 321 9876543");
  const [role, setRole] = useState("admin");
  const [selectedBranches, setSelectedBranches] = useState([
    "PH-402",
    "PH-108",
  ]);
  const [expanded, setExpanded] = useState(true);
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };
  const toggleBranch = (id: string) =>
    setSelectedBranches((current) =>
      current.includes(id)
        ? current.filter((branch) => branch !== id)
        : [...current, id],
    );
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    notify(`Secure invitation link dispatched to ${email}`);
  };
  return (
    <div className="relative min-h-full bg-background">
      <div className="mx-auto max-w-[1440px] p-6 opacity-30 blur-[2px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="type-page-title">
              Staff Members &amp; Access Control
            </h1>
            <p className="text-sm text-muted-foreground">
              Active kitchen supervisors, branch managers, and station
              operators.
            </p>
          </div>
          <div className="h-10 w-44 rounded bg-primary" />
        </div>
        <div className="mt-6 h-72 rounded-lg bg-surface-lowest shadow-sm" />
      </div>
      <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-inverse-surface/35 p-4 backdrop-blur-[3px]">
        <div className="my-auto flex max-h-[92vh] w-full max-w-[680px] flex-col overflow-hidden rounded-lg bg-surface-lowest shadow-2xl">
          <div className="bg-surface-low px-7 pb-5 pt-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  <Shield className="h-3.5 w-3.5" />
                  Security &amp; Access Governance
                </div>
                <h2 className="type-page-title mt-2">Invite Staff Member</h2>
                <p className="text-xs text-muted-foreground">
                  Issue an operational invitation link and assign restaurant
                  tenant boundaries.
                </p>
              </div>
              <Link
                href="/staff"
                aria-label="Close dialog"
                className="rounded-full p-2 text-muted-foreground hover:bg-surface-high"
              >
                <X className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {["01 Identity", "02 Role", "03 Scope", "04 Review"].map(
                (step, index) => (
                  <div key={step} className="space-y-1.5">
                    <div
                      className={cn(
                        "h-1.5 w-full rounded-full",
                        index < 3 ? "bg-primary" : "bg-surface-high",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[11px] tracking-tight",
                        index < 3
                          ? "font-bold text-primary"
                          : "font-medium text-muted-foreground",
                      )}
                    >
                      {step}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
          <form
            onSubmit={submit}
            className="max-h-[calc(92vh-210px)] space-y-6 overflow-y-auto px-7 py-6"
          >
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="type-label-caps flex items-center gap-1.5 text-muted-foreground">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  Personal Identification
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  * Mandatory credentials
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                  required
                />
                <Field
                  label="Last Name"
                  value={lastName}
                  onChange={setLastName}
                  required
                />
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded bg-surface-low py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <p className="flex items-center gap-1 pt-0.5 text-[11px] text-muted-foreground">
                    <BadgeCheck className="h-3.5 w-3.5 text-success" />
                    An invitation with secure single-use token will be sent to
                    this address.
                  </p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <div className="flex justify-between">
                    <label className="text-xs font-semibold">
                      Contact Phone
                    </label>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Optional SMS Backup
                    </span>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="w-full rounded bg-surface-low py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="space-y-3">
              <h3 className="type-label-caps flex items-center gap-1.5 text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                System Role &amp; Access Hierarchy
              </h3>
              {[
                [
                  "admin",
                  "Restaurant Admin",
                  "Tier 2 Manager",
                  "Full operational access to assigned restaurants. Can manage menu availability, dispatch orders, review staff, and manage local coupons.",
                ],
                [
                  "staff",
                  "Restaurant Staff",
                  "Tier 3 Kitchen Operations",
                  "Restricted day-to-day operational access. Dedicated to Live Kitchen KDS, order status updates, and courier dispatch.",
                ],
              ].map(([value, title, tier, description]) => (
                <label
                  key={value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3.5 rounded-lg p-3.5 shadow-sm transition-colors",
                    role === value
                      ? "bg-surface-lowest ring-1 ring-primary/20"
                      : "bg-surface-low/50 hover:bg-surface-low",
                  )}
                >
                  <input
                    type="radio"
                    name="role"
                    value={value}
                    checked={role === value}
                    onChange={() => setRole(value)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold">{title}</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        {tier}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  {role === value && <Check className="h-5 w-5 text-primary" />}
                </label>
              ))}
            </section>
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="type-label-caps flex items-center gap-1.5 text-muted-foreground">
                  <Store className="h-4 w-4 text-primary" />
                  Assign Restaurant Tenants
                </h3>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                  {selectedBranches.length} Branch
                  {selectedBranches.length === 1 ? "" : "es"} Selected
                </span>
              </div>
              <div className="space-y-2.5 rounded-lg bg-surface-low/70 p-3 shadow-inner">
                {branches.map(([id, name, location, tag]) => (
                  <label
                    key={id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded bg-surface-lowest p-2.5 shadow-sm",
                      tag === "Unassigned" && "opacity-70 hover:opacity-100",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedBranches.includes(id)}
                        onChange={() => toggleBranch(id)}
                        className="h-4 w-4 accent-primary"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold">{name}</span>
                          {tag !== "Unassigned" && (
                            <span className="rounded bg-success px-1.5 py-0.5 text-[10px] font-semibold text-white">
                              {tag}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {location}
                        </span>
                      </div>
                    </div>
                    {selectedBranches.includes(id) ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <span className="text-[11px] text-muted-foreground">
                        Unassigned
                      </span>
                    )}
                  </label>
                ))}
              </div>
              <div className="flex items-start gap-2 px-1 text-[11px] text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  <b className="text-foreground">Super Admin authority:</b> You
                  can assign multiple branches. Users will only view and process
                  orders matching their assigned store scopes.
                </p>
              </div>
            </section>
            <section className="overflow-hidden rounded-lg bg-surface-low">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                  <KeyRound className="h-4 w-4 text-primary" />
                  Permissions Preview{" "}
                  <span className="rounded bg-surface-lowest px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    28 capabilities configured
                  </span>
                </span>
                {expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expanded && (
                <div className="grid grid-cols-1 gap-2 px-4 pb-4 text-xs sm:grid-cols-2">
                  {[
                    ["Live Orders & Dispatch", "Full Access"],
                    ["Menu & 86'd Availability", "Full Access"],
                    ["Local Store Analytics", "View & Export"],
                    ["Platform Global Settings", "No Access"],
                  ].map(([name, access]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded bg-surface-lowest p-2"
                    >
                      <span className="font-medium">{name}</span>
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase",
                          access === "No Access"
                            ? "text-destructive"
                            : "text-success",
                        )}
                      >
                        {access}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <div className="flex items-start gap-2.5 rounded-lg bg-surface-high p-3 text-[11px] text-muted-foreground">
              <LockIcon />
              <p>
                Invitation links expire automatically in{" "}
                <b className="text-foreground">7 days</b>. Public
                self-registration is permanently disabled for platform network
                integrity.
              </p>
            </div>
          </form>
          <div className="flex items-center justify-between bg-surface-low px-7 py-4">
            <button
              type="button"
              onClick={() => notify("Invitation discarded.")}
              className="rounded px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-surface-high"
            >
              Discard / Cancel
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => notify("Invitation saved as draft.")}
                className="rounded bg-secondary px-4 py-2 text-xs font-semibold text-white"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector<HTMLFormElement>("form")
                    ?.requestSubmit()
                }
                className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2 text-xs font-bold text-white shadow-md"
              >
                <Send className="h-4 w-4" />
                Send Invitation ({selectedBranches.length} Branch
                {selectedBranches.length === 1 ? "" : "es"})
              </button>
            </div>
          </div>
        </div>
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

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="space-y-1 text-xs font-semibold">
      {label}
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded bg-surface-low py-2 px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
function LockIcon() {
  return (
    <span className="mt-0.5 shrink-0 text-primary">
      <Shield className="h-4 w-4" />
    </span>
  );
}
