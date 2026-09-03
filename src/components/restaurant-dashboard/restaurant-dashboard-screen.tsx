"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  Check,
  ChevronRight,
  Clock3,
  Plus,
  Save,
  Store,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

export type RestaurantDashboardVariant =
  | "dashboard"
  | "closed"
  | "profile"
  | "edit-profile"
  | "settings"
  | "operating-hours"
  | "delivery"
  | "pickup"
  | "orders"
  | "notifications"
  | "availability"
  | "alerts"
  | "empty"
  | "loading"
  | "save-state"
  | "unsaved";

const settingsLinks = [
  ["General", "/restaurant-dashboard/settings"],
  ["Operations", "/restaurant-dashboard/settings/operating-hours"],
  ["Delivery", "/restaurant-dashboard/settings/delivery"],
  ["Pickup", "/restaurant-dashboard/settings/pickup"],
  ["Orders", "/restaurant-dashboard/settings/orders"],
  ["Availability", "/restaurant-dashboard/settings/availability"],
  ["Notifications", "/restaurant-dashboard/settings/notifications"],
] as const;

function PageFrame({
  title,
  description,
  children,
  actions,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="type-label-caps text-primary">
              Pizza House · Restaurant operations
            </p>
            <h1 className="type-page-title mt-2">{title}</h1>
            {description && (
              <p className="mt-1 text-body-reg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-1.5">
      <span className="type-label-caps block text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
function Toggle({
  label,
  checked = true,
}: {
  label: string;
  checked?: boolean;
}) {
  const [enabled, setEnabled] = useState(checked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
      className="flex items-center justify-between gap-4 text-left"
    >
      <span className="text-body-sm font-medium">{label}</span>
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          enabled ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
            enabled ? "translate-x-6" : "translate-x-1",
          )}
        />
      </span>
    </button>
  );
}
function SaveBar() {
  return (
    <div className="flex justify-end gap-3 border-t pt-5">
      <Button
        type="button"
        className="bg-surface-high text-foreground hover:bg-surface-highest"
      >
        Discard Changes
      </Button>
      <Button type="button">
        <Save className="mr-2 h-4 w-4" />
        Save Changes
      </Button>
    </div>
  );
}
function SettingsNav({ active }: { active: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b pb-2">
      {settingsLinks.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "shrink-0 rounded-[var(--radius)] px-3 py-2 text-sm font-semibold",
            active === label
              ? "bg-primary text-white"
              : "bg-surface-low text-muted-foreground hover:bg-surface-high hover:text-foreground",
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

function Dashboard({ closed = false }: { closed?: boolean }) {
  return (
    <PageFrame
      title={
        closed ? "Restaurant currently closed" : "Good morning, Pizza House"
      }
      description={
        closed
          ? "Orders are paused until the restaurant is opened."
          : "Your operational overview for today."
      }
      actions={
        <>
          <Button className="bg-surface-high text-foreground hover:bg-surface-highest">
            <Clock3 className="mr-2 h-4 w-4" />
            Operating hours
          </Button>
          <Button>
            <Truck className="mr-2 h-4 w-4" />
            View live orders
          </Button>
        </>
      }
    >
      {closed && (
        <Card className="border-warning/30 bg-warning/10">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-warning">
                Online ordering is paused
              </p>
              <p className="mt-1 text-body-sm text-muted-foreground">
                Open the restaurant from Availability when your kitchen is
                ready.
              </p>
            </div>
            <Link
              href="/restaurant-dashboard/settings/availability"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Manage availability <ChevronRight className="inline h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Orders today", closed ? "0" : "126", "↑ 12.4%"],
          ["Revenue today", closed ? "Rs. 0" : "Rs. 186,450", "↑ 8.6%"],
          ["Average order", "Rs. 1,479", "↑ 3.2%"],
          ["Active customers", "48", "↑ 6.1%"],
        ].map(([label, value, change]) => (
          <Card key={label} className="p-5">
            <p className="type-label-caps text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
            <p className="mt-1 text-body-sm text-success">
              {change} from yesterday
            </p>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {closed
                ? "Kitchen Flow (Inactive State)"
                : "Orders Requiring Attention"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {closed ? (
              <div className="rounded border border-dashed p-8 text-center text-body-sm text-muted-foreground">
                Kitchen flow will become active when the restaurant opens.
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  "#ORD-1042 · 3 items · Rs. 2,450",
                  "#ORD-1041 · 5 items · Rs. 3,180",
                  "#ORD-1039 · 2 items · Rs. 1,290",
                ].map((order) => (
                  <div
                    key={order}
                    className="flex items-center justify-between gap-3 rounded border bg-surface-low p-3"
                  >
                    <span className="text-body-sm font-medium">{order}</span>
                    <Button className="h-8 px-3 text-xs">Process</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              {closed ? "Opening Checklist" : "Recent Orders"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "Staff attendance confirmed",
                "Kitchen stations checked",
                "Menu availability reviewed",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b pb-3 last:border-0"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-body-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageFrame>
  );
}

function Profile({ edit = false }: { edit?: boolean }) {
  return (
    <PageFrame
      title={edit ? "Restaurant Profile & Preferences" : "Restaurant Profile"}
      description={
        edit
          ? "Update the information customers and staff use to identify this location."
          : "View your restaurant identity, contact details, and operational status."
      }
      actions={
        edit ? (
          <>
            <Link
              href="/restaurant-dashboard/profile"
              className="inline-flex h-10 items-center rounded-[var(--radius)] border px-4 text-sm font-semibold hover:bg-muted"
            >
              Cancel
            </Link>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </>
        ) : (
          <Link
            href="/restaurant-dashboard/profile/edit"
            className="inline-flex h-10 items-center rounded-[var(--radius)] bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-container"
          >
            Edit Profile
          </Link>
        )
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Restaurant identity</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-4 sm:col-span-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-2xl font-bold text-primary">
              PH
            </div>
            <div>
              <h2 className="text-xl font-bold">Pizza House</h2>
              <p className="text-body-sm text-muted-foreground">
                @pizza-house · Pizza & Italian
              </p>
            </div>
          </div>
          {edit ? (
            <>
              <Field label="Restaurant name">
                <Input defaultValue="Pizza House" />
              </Field>
              <Field label="Public handle">
                <Input defaultValue="pizza-house" />
              </Field>
              <Field label="Business email">
                <Input defaultValue="orders@pizzahouse.pk" />
              </Field>
              <Field label="Primary phone">
                <Input defaultValue="+92 42 35879011" />
              </Field>
              <Field label="Street address">
                <Input defaultValue="Shop 4, Commercial Plaza, Block C" />
              </Field>
              <Field label="City / region">
                <Input defaultValue="Lahore, Punjab, Pakistan" />
              </Field>
            </>
          ) : (
            <>
              <Info
                label="Contact Information"
                value="orders@pizzahouse.pk · +92 42 35879011"
              />
              <Info
                label="Location & Address"
                value="Shop 4, Commercial Plaza, Block C, Gulberg III, Lahore"
              />
              <Info
                label="Operating status"
                value="Active · 10:00 AM - 11:00 PM daily"
              />
              <Info
                label="System metadata"
                value="Created 12 Jan 2024 · Asia/Karachi (UTC+5)"
              />
            </>
          )}
        </CardContent>
      </Card>
      {edit && <SaveBar />}
    </PageFrame>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="type-label-caps text-muted-foreground">{label}</p>
      <p className="mt-1 text-body-sm font-medium">{value}</p>
    </div>
  );
}

function SettingsOverview() {
  const cards = [
    [
      "Restaurant Profile",
      "Identity, contact, location, and public details.",
      "/restaurant-dashboard/profile/edit",
    ],
    [
      "Availability Status",
      "Temporarily pause or reopen online ordering.",
      "/restaurant-dashboard/settings/availability",
    ],
    [
      "Operating Hours",
      "Manage your weekly schedule and closures.",
      "/restaurant-dashboard/settings/operating-hours",
    ],
    [
      "Delivery Settings",
      "Radius, fees, and delivery operating rules.",
      "/restaurant-dashboard/settings/delivery",
    ],
    [
      "Pickup Settings",
      "Customer pickup status and instructions.",
      "/restaurant-dashboard/settings/pickup",
    ],
    [
      "Order Rules",
      "Automation, thresholds, and customer modifiers.",
      "/restaurant-dashboard/settings/orders",
    ],
    [
      "Notifications",
      "Operational events and dispatch channels.",
      "/restaurant-dashboard/settings/notifications",
    ],
  ];
  return (
    <PageFrame
      title="Restaurant Settings"
      description="Configure how Pizza House operates across channels."
      actions={
        <>
          <Button className="bg-surface-high text-foreground hover:bg-surface-highest">
            Discard Changes
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </>
      }
    >
      <SettingsNav active="General" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(([title, text, href]) => (
          <Link href={href} key={href}>
            <Card className="h-full p-5 transition-colors hover:border-primary/50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-2 text-body-sm text-muted-foreground">
                    {text}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}

function SettingsForm({
  kind,
}: {
  kind:
    | "operating-hours"
    | "delivery"
    | "pickup"
    | "orders"
    | "notifications"
    | "availability"
    | "alerts";
}) {
  const labels = {
    "operating-hours": ["Operating Hours", "Weekly Operating Schedule"],
    delivery: ["Delivery & Radius Settings", "Delivery System"],
    pickup: ["Pickup Settings", "Customer Pickup Status"],
    orders: ["Order Settings", "Volume & Financial Thresholds"],
    notifications: ["Notification Settings", "Operational Events"],
    availability: ["Restaurant Availability", "Temporary Pause Controls"],
    alerts: ["Operational Alerts", "Kitchen Station Load"],
  } as const;
  const [title, section] = labels[kind];
  return (
    <PageFrame
      title={title}
      description="Changes apply to this restaurant after they are saved."
      actions={
        <>
          <Button className="bg-surface-high text-foreground hover:bg-surface-highest">
            Discard Changes
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </>
      }
    >
      <SettingsNav
        active={
          kind === "operating-hours"
            ? "Operations"
            : kind === "availability"
              ? "Availability"
              : kind === "notifications"
                ? "Notifications"
                : kind[0].toUpperCase() + kind.slice(1)
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>{section}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {kind === "operating-hours" ? (
            <div className="space-y-3">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div
                  key={day}
                  className="grid items-center gap-3 border-b pb-3 sm:grid-cols-[120px_1fr_auto]"
                >
                  <span className="text-body-sm font-semibold">{day}</span>
                  <div className="flex gap-2">
                    <Input type="time" defaultValue="10:00" />
                    <Input type="time" defaultValue="23:00" />
                  </div>
                  <Toggle label="Open" />
                </div>
              ))}
            </div>
          ) : kind === "alerts" ? (
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Delayed orders", "3"],
                ["Kitchen load", "72%"],
                ["Open alerts", "5"],
              ].map(([label, value]) => (
                <Card key={label} className="p-4">
                  <p className="type-label-caps text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{value}</p>
                  <p className="mt-1 text-body-sm text-muted-foreground">
                    Requires operational review
                  </p>
                </Card>
              ))}
              <div className="space-y-3 md:col-span-3">
                {[
                  "Order #ORD-1042 is overdue",
                  "Baking station is above target load",
                  "Low stock alert: mozzarella",
                ].map((alert) => (
                  <div
                    key={alert}
                    className="flex items-center justify-between rounded border p-4"
                  >
                    <span className="text-body-sm font-medium">{alert}</span>
                    <Button className="h-8 bg-surface-high px-3 text-xs text-foreground hover:bg-surface-highest">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label={
                  kind === "delivery"
                    ? "Delivery radius (km)"
                    : "Minimum order value"
                }
              >
                <Input
                  defaultValue={kind === "delivery" ? "8" : "500"}
                  type="number"
                />
              </Field>
              <Field
                label={
                  kind === "delivery"
                    ? "Delivery fee"
                    : "Estimated preparation time"
                }
              >
                <Input
                  defaultValue={kind === "delivery" ? "150" : "30"}
                  type="number"
                />
              </Field>
              <div className="space-y-4 md:col-span-2">
                {[
                  "Enable customer-facing service",
                  "Automatically accept normal orders",
                  "Send operational notifications",
                  "Allow scheduled orders",
                ]
                  .slice(0, kind === "availability" ? 1 : 4)
                  .map((label) => (
                    <Toggle key={label} label={label} />
                  ))}
              </div>
              <Field label="Instructions / notes">
                <textarea
                  className="min-h-28 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  defaultValue="Keep customers informed about current operational timings."
                />
              </Field>
            </div>
          )}
          <SaveBar />
        </CardContent>
      </Card>
    </PageFrame>
  );
}

function StateScreen({
  kind,
}: {
  kind: "empty" | "loading" | "save-state" | "unsaved";
}) {
  if (kind === "loading")
    return (
      <PageFrame title="Restaurant Dashboard">
        <Card className="space-y-5 p-8">
          <div className="h-8 w-56 animate-pulse rounded bg-muted" />
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-28 animate-pulse rounded bg-muted" />
            <div className="h-28 animate-pulse rounded bg-muted" />
            <div className="h-28 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-52 animate-pulse rounded bg-muted" />
        </Card>
      </PageFrame>
    );
  if (kind === "empty")
    return (
      <PageFrame title="Restaurant Dashboard">
        <Card className="flex min-h-[480px] flex-col items-center justify-center p-8 text-center">
          <Store className="mb-5 h-16 w-16 text-primary/30" />
          <h2 className="type-section-title">
            Welcome to your restaurant workspace
          </h2>
          <p className="mt-2 max-w-md text-body-reg text-muted-foreground">
            Complete your restaurant setup to start receiving orders and
            monitoring kitchen operations.
          </p>
          <Link
            href="/restaurant-dashboard/profile/edit"
            className="mt-6 inline-flex h-10 items-center rounded-[var(--radius)] bg-primary px-5 text-sm font-semibold text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Complete setup
          </Link>
        </Card>
      </PageFrame>
    );
  if (kind === "unsaved")
    return (
      <PageFrame title="Kitchen Operational Settings">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-warning" />
            <div>
              <h2 className="font-semibold">Unsaved changes</h2>
              <p className="text-body-sm text-muted-foreground">
                You have changes that have not been saved yet.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button className="bg-surface-high text-foreground hover:bg-surface-highest">
              Keep editing
            </Button>
            <Button>Discard changes</Button>
          </div>
        </Card>
      </PageFrame>
    );
  return (
    <PageFrame title="Kitchen Operational Settings">
      <div className="space-y-3">
        <div className="rounded border border-success/30 bg-success/10 p-4 text-sm text-success">
          Changes saved successfully.
        </div>
        <div className="rounded border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Unable to save changes. Review the highlighted fields and try again.
        </div>
      </div>
      <SettingsForm kind="delivery" />
    </PageFrame>
  );
}

export function RestaurantDashboardScreen({
  variant,
}: {
  variant: RestaurantDashboardVariant;
}) {
  if (variant === "dashboard") return <Dashboard />;
  if (variant === "closed") return <Dashboard closed />;
  if (variant === "profile") return <Profile />;
  if (variant === "edit-profile") return <Profile edit />;
  if (variant === "settings") return <SettingsOverview />;
  if (
    [
      "operating-hours",
      "delivery",
      "pickup",
      "orders",
      "notifications",
      "availability",
      "alerts",
    ].includes(variant)
  )
    return (
      <SettingsForm
        kind={
          variant as
            | "operating-hours"
            | "delivery"
            | "pickup"
            | "orders"
            | "notifications"
            | "availability"
            | "alerts"
        }
      />
    );
  return (
    <StateScreen
      kind={variant as "empty" | "loading" | "save-state" | "unsaved"}
    />
  );
}
