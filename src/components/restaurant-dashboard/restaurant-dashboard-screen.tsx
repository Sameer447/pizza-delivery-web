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
  X,
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
      title={edit ? "Restaurant Profile & Preferences" : "Pizza House"}
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
          <CardTitle>
            {edit ? "Branding & Identity" : "Contact Information"}
          </CardTitle>
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
              <div className="rounded border border-dashed bg-surface-low p-5 sm:col-span-2">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-2xl font-bold text-primary">
                    PH
                  </div>
                  <p className="text-sm font-semibold">Restaurant Logo</p>
                  <p className="text-xs text-muted-foreground">
                    Drag and drop or click to upload · PNG, JPG or SVG up to 2MB
                  </p>
                  <Button
                    type="button"
                    className="h-9 bg-surface-high text-foreground hover:bg-surface-highest"
                  >
                    Upload new logo
                  </Button>
                </div>
              </div>
              <div className="border-b pb-2 sm:col-span-2">
                <h3 className="font-semibold">General Information</h3>
                <p className="text-xs text-muted-foreground">
                  Basic identifiers and contact numbers.
                </p>
              </div>
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
              <Field label="Postal code">
                <Input defaultValue="54000" />
              </Field>
              <Field label="Cuisine type">
                <Input defaultValue="Pizza & Italian" />
              </Field>
              <div className="border-b pb-2 sm:col-span-2">
                <h3 className="font-semibold">Location & Address</h3>
                <p className="text-xs text-muted-foreground">
                  Physical storefront location for delivery and pickup.
                </p>
              </div>
              <Field label="Full address">
                <Input defaultValue="Shop 4, Commercial Plaza, Block C, Gulberg III" />
              </Field>
              <Field label="Country">
                <select className="h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm">
                  <option>Pakistan</option>
                  <option>United States</option>
                  <option>Canada</option>
                </select>
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

function DeliverySettingsContent() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="p-5">
        <h3 className="font-semibold">Delivery System</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Master toggle for online customer delivery.
        </p>
        <div className="mt-5">
          <Toggle label="Enable delivery" />
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="font-semibold">Pricing & Minimum Order</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Configure baseline shipping costs and order eligibility.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Delivery fee">
            <Input defaultValue="200" type="number" />
          </Field>
          <Field label="Minimum order value">
            <Input defaultValue="500" type="number" />
          </Field>
        </div>
      </Card>
      <Card className="p-5 lg:col-span-2">
        <h3 className="font-semibold">Radius & Time Estimation</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Set operational boundaries and dispatch estimates.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Field label="Maximum radius (km)">
            <Input defaultValue="8" type="number" />
          </Field>
          <Field label="Minimum time (mins)">
            <Input defaultValue="30" type="number" />
          </Field>
          <Field label="Maximum time (mins)">
            <Input defaultValue="45" type="number" />
          </Field>
        </div>
      </Card>
      <Card className="border-destructive/30 bg-destructive/10 p-5 lg:col-span-2">
        <h3 className="font-semibold text-destructive">Emergency Pause</h3>
        <p className="mt-1 text-body-sm text-destructive/80">
          Temporarily halt new delivery orders during operational incidents.
        </p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-body-sm font-medium">
            Pause delivery immediately
          </span>
          <Toggle label="" checked={false} />
        </div>
      </Card>
    </div>
  );
}

function PickupSettingsContent() {
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Customer Pickup Status</h3>
            <p className="mt-1 text-body-sm text-muted-foreground">
              Enable or temporarily disable customer pickup.
            </p>
          </div>
          <Toggle label="" />
        </div>
        <div className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-2">
          <Field label="Minimum preparation time (mins)">
            <Input defaultValue="15" type="number" />
          </Field>
          <Field label="Maximum preparation time (mins)">
            <Input defaultValue="20" type="number" />
          </Field>
          <Field label="Surge buffer">
            <select className="h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm">
              <option>Auto-adjust based on active orders (+5m)</option>
              <option>Conservative (+10m)</option>
              <option>Fixed range only (No buffer)</option>
            </select>
          </Field>
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="font-semibold">Pickup Instructions</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Provide clear directions for customers arriving at the restaurant.
        </p>
        <textarea
          className="mt-4 min-h-28 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          defaultValue="Please head straight to Counter #2 upon arrival. Show your confirmation code to our team member. Parking is available in the rear alley for 15 minutes max."
        />
      </Card>
      <Card className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Allow Scheduled Pickups</h3>
            <p className="mt-1 text-body-sm text-muted-foreground">
              Let customers place pickup orders ahead of time.
            </p>
          </div>
          <Toggle label="" />
        </div>
        <div className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-2">
          <Field label="Maximum days in advance">
            <Input defaultValue="7" type="number" />
          </Field>
          <Field label="Slot interval">
            <select className="h-10 w-full rounded-[var(--radius)] border bg-surface-lowest px-3 text-sm">
              <option>15 mins</option>
              <option>30 mins</option>
              <option>60 mins</option>
            </select>
          </Field>
        </div>
      </Card>
    </div>
  );
}

function OrderSettingsContent() {
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <h3 className="font-semibold">Volume & Financial Thresholds</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Set hard boundaries for incoming orders.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Minimum order value">
            <Input defaultValue="500" type="number" />
          </Field>
          <Field label="Maximum active orders">
            <Input defaultValue="50" type="number" />
          </Field>
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="font-semibold">Automation & Timeouts</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Manage order lifecycle automation and timeouts.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Auto-cancel unpaid orders (mins)">
            <Input defaultValue="10" type="number" />
          </Field>
          <Toggle label="Automatically accept normal orders" />
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="font-semibold">Customer Permissions & Modifiers</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Control what instructions and changes customers can make.
        </p>
        <div className="mt-5 space-y-4">
          <Toggle label="Allow order notes" />
          <Toggle label="Allow customer cancellation" />
        </div>
      </Card>
      <Card className="bg-primary p-5 text-primary-foreground">
        <h3 className="text-lg font-bold">Active Rules Enforced</h3>
        <p className="mt-1 text-body-sm opacity-80">
          These parameters apply immediately to all POS and online orders.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded bg-white/10 p-3 text-sm">
            Min order <b className="block text-lg">Rs. 500</b>
          </div>
          <div className="rounded bg-white/10 p-3 text-sm">
            Max active <b className="block text-lg">50 orders</b>
          </div>
          <div className="rounded bg-white/10 p-3 text-sm">
            Auto-cancel <b className="block text-lg">10 mins</b>
          </div>
        </div>
      </Card>
    </div>
  );
}

function OperatingHoursContent() {
  const days = [
    ["Monday", "11:00", "23:00"],
    ["Tuesday", "11:00", "23:00"],
    ["Wednesday", "11:00", "23:00"],
    ["Thursday", "11:00", "00:00"],
    ["Friday", "12:00", "01:00"],
    ["Saturday", "12:00", "01:00"],
    ["Sunday", "12:00", "23:00"],
  ];
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <h3 className="font-semibold">Weekly Operating Schedule</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Configure your restaurant&apos;s weekly availability and split shifts.
        </p>
        <div className="mt-5 space-y-3">
          {days.map(([day, open, close]) => (
            <div
              key={day}
              className="grid items-center gap-3 border-b pb-3 sm:grid-cols-[120px_auto_1fr]"
            >
              <span className="text-body-sm font-semibold">{day}</span>
              <Toggle label="Open" />
              <div className="flex gap-2">
                <Input
                  type="time"
                  defaultValue={open}
                  aria-label={`${day} opening time`}
                />
                <Input
                  type="time"
                  defaultValue={close}
                  aria-label={`${day} closing time`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold">Special Closures</h3>
            <p className="mt-1 text-body-sm text-muted-foreground">
              Set specific dates when the restaurant will be closed.
            </p>
          </div>
          <Button className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            Add Closure
          </Button>
        </div>
        <div className="mt-5 space-y-3">
          {[
            ["Independence Day", "14 Aug 2026"],
            ["Staff Training", "22 Aug 2026"],
            ["Annual Maintenance", "01 Sep 2026"],
          ].map(([title, date]) => (
            <div
              key={title}
              className="flex items-center justify-between rounded border bg-surface-low p-3"
            >
              <div>
                <p className="text-body-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">
                  {date} · All day
                </p>
              </div>
              <button
                className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                aria-label={`Remove ${title}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-warning/30 bg-warning/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Immediate Override</h3>
            <p className="mt-1 text-body-sm text-muted-foreground">
              Close the kitchen immediately due to an operational incident.
            </p>
          </div>
          <Toggle label="Close now" checked={false} />
        </div>
      </Card>
    </div>
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
            <OperatingHoursContent />
          ) : kind === "delivery" ? (
            <DeliverySettingsContent />
          ) : kind === "pickup" ? (
            <PickupSettingsContent />
          ) : kind === "orders" ? (
            <OrderSettingsContent />
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
                  kind === "availability"
                    ? "Pause duration (mins)"
                    : "Notification channel"
                }
              >
                <Input
                  defaultValue={
                    kind === "availability" ? "30" : "Email + in-app"
                  }
                  type="text"
                />
              </Field>
              <Field
                label={
                  kind === "availability"
                    ? "Customer message"
                    : "Dispatch contact"
                }
              >
                <Input
                  defaultValue={
                    kind === "availability"
                      ? "We will be back shortly."
                      : "orders@pizzahouse.pk"
                  }
                  type="text"
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
