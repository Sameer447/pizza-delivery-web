"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Check,
  ChevronDown,
  History,
  Lock,
  Mail,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  ToggleRight,
  UserRound,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type Status = "active" | "inactive" | "blocked";
const statusOptions: {
  value: Status;
  label: string;
  description: string;
  dot: string;
}[] = [
  {
    value: "active",
    label: "Active",
    description:
      "Patron can log in, place orders, receive promotional notifications",
    dot: "bg-success",
  },
  {
    value: "inactive",
    label: "Inactive",
    description: "Temporarily disabled by patron or admin",
    dot: "bg-muted-foreground",
  },
  {
    value: "blocked",
    label: "Blocked / Suspended",
    description: "Fraud protection, repeated failed delivery cancellations",
    dot: "bg-destructive",
  },
];

function Field({
  label,
  value,
  onChange,
  helper,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="space-y-1.5">
      <span className="block text-xs font-semibold">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <input
        value={value}
        type={type}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded bg-surface-lowest px-3 py-2 text-sm font-medium outline-none transition focus:ring-2 focus:ring-primary/30"
      />
      {helper && (
        <span className="block text-[11px] leading-relaxed text-muted-foreground">
          {helper}
        </span>
      )}
    </label>
  );
}
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-surface-highest",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export function EditCustomerScreen() {
  const [firstName, setFirstName] = useState("Ahmed");
  const [lastName, setLastName] = useState("Khan");
  const [email, setEmail] = useState("ahmed.khan@email.com");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [alternatePhone, setAlternatePhone] = useState("+92 321 0000000");
  const [status, setStatus] = useState<Status>("active");
  const [segment, setSegment] = useState("VIP");
  const [notes, setNotes] = useState(
    "High-priority customer; ensure crust is baked well-done as per recurring feedback.",
  );
  const [sms, setSms] = useState(true);
  const [whatsapp, setWhatsapp] = useState(true);
  const [invoices, setInvoices] = useState(true);
  const [language, setLanguage] = useState("en");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };
  const save = () => {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      notify("Customer profile saved successfully.");
    }, 650);
  };
  const channels: [string, string, boolean, (value: boolean) => void][] = [
    [
      "Order Status via SMS",
      "Real-time driver updates and ETA alerts",
      sms,
      setSms,
    ],
    [
      "Promotional WhatsApp & Offers",
      "Weekend discounts and festival promo codes",
      whatsapp,
      setWhatsapp,
    ],
    [
      "Email Invoices & Summaries",
      "Monthly VAT receipts and payment proof",
      invoices,
      setInvoices,
    ],
  ];
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <span>›</span>
            <Link href="/customers" className="hover:text-primary">
              Customers
            </Link>
            <span>›</span>
            <Link href="/customers/1048" className="hover:text-primary">
              Ahmed Khan
            </Link>
            <span>›</span>
            <span className="font-semibold text-primary">Edit Profile</span>
          </nav>
          <span className="rounded bg-surface-low px-2 py-1 font-mono text-[11px] text-muted-foreground">
            #CUST-1048
          </span>
        </div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="type-page-title">Edit Customer Profile</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Update contact details, operational flags, and communication
              preferences for Ahmed Khan.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/customers/1048"
              className="inline-flex items-center rounded bg-surface-high px-4 py-2 text-xs font-semibold hover:bg-surface-highest"
            >
              Cancel
            </Link>
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary-container disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
          className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12"
        >
          <div className="space-y-6 lg:col-span-7">
            <Card className="p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-surface-low text-primary">
                    <UserRound className="h-5 w-5" />
                  </span>
                  <h2 className="type-card-title">Basic Profile Information</h2>
                </div>
                <span className="type-label-caps rounded bg-surface-low px-2 py-0.5 text-muted-foreground">
                  Core Contact
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
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
                <Field
                  label="Email Address"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  helper="Used for order confirmations and digital receipts."
                />
                <label className="space-y-1.5">
                  <span className="block text-xs font-semibold">
                    Primary Phone <span className="text-primary">*</span>
                  </span>
                  <div className="flex rounded bg-surface-lowest">
                    <span className="flex items-center border-r px-2 text-xs">
                      🇵🇰 +92
                    </span>
                    <input
                      value={phone.replace("+92 ", "")}
                      onChange={(event) =>
                        setPhone(`+92 ${event.target.value}`)
                      }
                      className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-medium outline-none"
                    />
                  </div>
                  <span className="block text-[11px] text-muted-foreground">
                    Used for SMS dispatch updates and driver calls.
                  </span>
                </label>
                <Field
                  label="Alternate Phone"
                  value={alternatePhone}
                  onChange={setAlternatePhone}
                  helper="Optional backup contact number."
                />
                <div className="flex items-end">
                  <span className="inline-flex items-center gap-1 rounded bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">
                    <ShieldCheck className="h-3.5 w-3.5" /> Email and phone
                    verified
                  </span>
                </div>
              </div>
            </Card>
            <Card className="p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-surface-low text-primary">
                    <ToggleRight className="h-5 w-5" />
                  </span>
                  <h2 className="type-card-title">
                    Operational &amp; Account Status
                  </h2>
                </div>
                <span className="type-label-caps rounded bg-surface-low px-2 py-0.5 text-muted-foreground">
                  Access Tier
                </span>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold">
                    Account Status
                  </label>
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded p-3 transition",
                        status === option.value
                          ? "bg-surface-low ring-1 ring-primary/20"
                          : "hover:bg-surface-low",
                      )}
                    >
                      <input
                        type="radio"
                        name="status"
                        checked={status === option.value}
                        onChange={() => setStatus(option.value)}
                        className="mt-1 accent-primary"
                      />
                      <span className="flex-1">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          <span
                            className={cn("h-2 w-2 rounded-full", option.dot)}
                          />
                          {option.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                <label className="block space-y-1.5 text-xs font-semibold">
                  Customer Segment
                  <div className="relative">
                    <select
                      value={segment}
                      onChange={(event) => setSegment(event.target.value)}
                      className="w-full appearance-none rounded bg-surface-lowest px-3 py-2 pr-9 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="Standard">Standard Patron</option>
                      <option value="Frequent">Frequent Diner</option>
                      <option value="VIP">VIP Patron</option>
                      <option value="High Risk">High Risk</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </label>
                <label className="block space-y-1.5 text-xs font-semibold">
                  Internal Kitchen / Dispatch Notes{" "}
                  <span className="float-right inline-flex items-center gap-1 font-medium text-primary">
                    <Sparkles className="h-3 w-3" />
                    Visible on KDS
                  </span>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={3}
                    className="w-full resize-none rounded bg-surface-lowest px-3 py-2.5 text-sm font-medium leading-relaxed outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>
              </div>
            </Card>
            <div className="flex flex-col justify-between gap-4 rounded-lg bg-surface-high p-5 md:flex-row md:items-center">
              <div className="flex items-start gap-3">
                <Lock className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="type-label-caps text-foreground">
                    Authentication &amp; Security Protected
                  </h3>
                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
                    Password hashes, payment tokens, and login credentials
                    cannot be modified from the restaurant admin panel.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  notify("Password reset email queued for Ahmed Khan.")
                }
                className="inline-flex shrink-0 items-center gap-1.5 rounded bg-surface-lowest px-3.5 py-2 text-xs font-semibold shadow-sm hover:bg-white"
              >
                <Send className="h-4 w-4 text-primary" />
                Send Password Reset Email
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Card className="space-y-6 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-surface-low text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <h2 className="type-card-title">Preferences &amp; Alerts</h2>
                </div>
                <span className="type-label-caps rounded bg-surface-low px-2 py-0.5 text-muted-foreground">
                  Channels
                </span>
              </div>
              <div className="space-y-4">
                {channels.map(([title, description, checked, setter]) => (
                  <div
                    key={title}
                    className="flex items-center justify-between gap-4 py-1"
                  >
                    <div>
                      <span className="block text-sm font-medium">{title}</span>
                      <span className="block text-xs text-muted-foreground">
                        {description}
                      </span>
                    </div>
                    <Toggle checked={checked} onChange={setter} />
                  </div>
                ))}
                <label className="block space-y-1.5 border-t pt-4 text-xs font-semibold">
                  Preferred Language
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                      className="w-full appearance-none rounded bg-surface-lowest px-3 py-2 pr-9 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="en">English (US)</option>
                      <option value="ur">Urdu (اردو)</option>
                      <option value="ar">Arabic (العربية)</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </label>
              </div>
            </Card>
            <Card className="space-y-5 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-surface-low text-primary">
                    <History className="h-5 w-5" />
                  </span>
                  <h2 className="type-card-title">Profile Audit Metadata</h2>
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  System Log
                </span>
              </div>
              <div className="space-y-3 divide-y text-xs">
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Customer ID</span>
                  <b className="font-mono">CUST-1048</b>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Created Date</span>
                  <span className="text-right font-medium">
                    14 Jan 2025, 10:14 AM
                    <br />
                    <small className="text-muted-foreground">
                      by Self-Registration
                    </small>
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">
                    Last Profile Update
                  </span>
                  <span className="text-right font-medium">
                    02 Sep 2026, 14:20 PM
                    <br />
                    <small className="text-muted-foreground">
                      by Admin Marco
                    </small>
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Last Order ID</span>
                  <Link
                    href="/orders/10482"
                    className="font-semibold text-primary"
                  >
                    #10482 ↗
                  </Link>
                </div>
              </div>
              <div className="rounded bg-surface-low p-3">
                <div className="mb-2 flex justify-between text-[11px] font-medium">
                  <span>Order Frequency (Last 6 Months)</span>
                  <span className="font-bold text-success">+18% YoY</span>
                </div>
                <div className="flex h-12 items-end gap-1">
                  {["h-4", "h-8", "h-6", "h-10", "h-7", "h-12"].map(
                    (height, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex-1 rounded-t bg-primary",
                          height,
                          index < 5 && "opacity-60",
                        )}
                      />
                    ),
                  )}
                </div>
                <div className="mt-1.5 flex justify-between text-[9px] text-muted-foreground">
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded bg-surface-low p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  AK
                </div>
                <div className="flex-1">
                  <span className="block text-xs font-semibold">
                    Ahmed Khan
                  </span>
                  <span className="block text-[10px] text-muted-foreground">
                    Verified Patron • 42 Orders
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => notify("Full activity log opened.")}
                  className="pr-1 text-xs font-semibold text-primary hover:underline"
                >
                  View Full Log
                </button>
              </div>
            </Card>
          </div>
        </form>
        <div className="sticky bottom-4 z-30 flex flex-col items-center justify-between gap-4 rounded-lg bg-inverse-surface px-6 py-4 text-inverse-on-surface shadow-xl sm:flex-row">
          <div className="flex items-center gap-3 text-sm">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-success" />
            <span className="font-semibold">Ready to save changes</span>
            <span className="hidden text-xs text-inverse-on-surface/70 sm:inline">
              • Unsaved operational flags detected
            </span>
          </div>
          <div className="flex w-full justify-end gap-3 sm:w-auto">
            <Link
              href="/customers/1048"
              className="rounded px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              Discard Changes
            </Link>
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md disabled:opacity-60"
            >
              <Check className="h-4 w-4" />
              {saving ? "Saving…" : "Save Customer Profile"}
            </button>
          </div>
        </div>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed right-6 top-20 z-50 flex items-center gap-2 rounded-lg bg-surface-lowest px-4 py-3 text-xs font-semibold shadow-xl"
        >
          <Check className="h-4 w-4 text-success" />
          {notice}
        </div>
      )}
    </div>
  );
}
