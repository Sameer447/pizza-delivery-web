"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Flame,
  Grid2X2,
  Maximize,
  Play,
  RotateCw,
  ShoppingBag,
  Soup,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type Station =
  | "All Stations"
  | "Station A: Dough & Oven"
  | "Station B: Cold Prep & Toppings"
  | "Station C: Fryer & Sides";
type Ticket = {
  id: string;
  customer: string;
  type: "Delivery" | "Pickup";
  amount?: string;
  age: string;
  items: { qty: number; name: string; detail?: string }[];
  note?: string;
  route?: string;
  progress?: number;
  overdue?: boolean;
  status: string;
};

const columns: { title: string; color: string; tickets: Ticket[] }[] = [
  {
    title: "1. Pending",
    color: "bg-primary-fixed-dim",
    tickets: [
      {
        id: "#10486",
        customer: "Ahmed Khan",
        type: "Delivery",
        amount: "Rs. 2,948",
        age: "1m ago",
        status: "pending",
        items: [
          {
            qty: 2,
            name: "Chicken Tikka (Large)",
            detail: "Cheese Burst Crust, Jalapenos, Extra Sauce",
          },
          {
            qty: 1,
            name: "Garlic Bread with Mozzarella",
            detail: "Garlic dip included",
          },
        ],
        note: "Please cut in 8 slices and make crust crispy.",
      },
      {
        id: "#10487",
        customer: "Zohra B.",
        type: "Pickup",
        amount: "Rs. 1,450",
        age: "3m ago",
        status: "pending",
        items: [
          {
            qty: 1,
            name: "Pepperoni Special (Medium)",
            detail: "Classic Thin Crust, Extra Pepperoni",
          },
        ],
      },
    ],
  },
  {
    title: "2. Confirmed",
    color: "bg-secondary",
    tickets: [
      {
        id: "#10485",
        customer: "Sara Ali",
        type: "Pickup",
        amount: "Rs. 2,150",
        age: "6m ago",
        status: "confirmed",
        route: "Cold Line A → Fryer",
        items: [
          { qty: 1, name: "Pepperoni Supreme (Med)" },
          {
            qty: 2,
            name: "Truffle Parmesan Fries",
            detail: "Station C: Fryer Queue",
          },
        ],
      },
      {
        id: "#10488",
        customer: "Kashif R.",
        type: "Delivery",
        amount: "Rs. 3,100",
        age: "7m ago",
        status: "confirmed",
        route: "Dough → Make Table B",
        items: [
          {
            qty: 2,
            name: "BBQ Chicken Pizza (Lrg)",
            detail: "Smoked BBQ drizzle, Red onion, Bell peppers",
          },
        ],
      },
    ],
  },
  {
    title: "3. Preparing",
    color: "bg-primary-container",
    tickets: [
      {
        id: "#10484",
        customer: "Ahmed Khan",
        type: "Delivery",
        age: "12m ago",
        status: "preparing",
        progress: 65,
        route: "LINE B: COLD PREP",
        items: [
          {
            qty: 1,
            name: "Chicken Tikka (Lrg)",
            detail: "Mozzarella+, Black Olives",
          },
          {
            qty: 1,
            name: "Molten Lava Cake",
            detail: "Station C (Dessert Warmer)",
          },
        ],
      },
      {
        id: "#10489",
        customer: "Daniyal M.",
        type: "Pickup",
        age: "14m ago",
        status: "preparing",
        progress: 88,
        route: "STATION A: TOPPINGS",
        items: [
          {
            qty: 1,
            name: "Veg Supreme (Lrg)",
            detail: "Special: Vegan Cheese Only",
          },
        ],
      },
    ],
  },
  {
    title: "4. Baking",
    color: "bg-primary",
    tickets: [
      {
        id: "#10483",
        customer: "Usman Tariq",
        type: "Delivery",
        age: "18m ago",
        status: "baking",
        progress: 75,
        items: [
          {
            qty: 2,
            name: "Classic Margherita",
            detail: "Fresh Basil • Extra Olive Oil",
          },
          { qty: 1, name: "Spicy Wings", detail: "Fryer Done" },
        ],
      },
      {
        id: "#10490",
        customer: "Tariq J.",
        type: "Delivery",
        age: "22m ago",
        status: "baking",
        progress: 100,
        overdue: true,
        items: [
          {
            qty: 1,
            name: "Chicken Fajita (Lrg)",
            detail: "Onions, Jalapenos, Mexican Seasoning",
          },
        ],
      },
    ],
  },
  {
    title: "5. Ready & Packing",
    color: "bg-success",
    tickets: [
      {
        id: "#10482",
        customer: "Bilal Sheikh",
        type: "Pickup",
        age: "24m ago",
        status: "ready",
        items: [
          {
            qty: 1,
            name: "BBQ Chicken Feast",
            detail: "Dip: Ranch (1x), Quality Seal: Verified",
          },
        ],
      },
      {
        id: "#10481",
        customer: "Fatima Noor",
        type: "Delivery",
        age: "28m ago",
        status: "ready",
        items: [
          { qty: 1, name: "Veggie Lovers (Med)", detail: "BAGGED" },
          { qty: 1, name: "Cheesy Bread (8 pcs)", detail: "SEALED" },
        ],
      },
    ],
  },
];

const actionText: Record<string, string> = {
  pending: "Accept Order",
  confirmed: "Start Prep (Assign Line)",
  preparing: "Send to Oven / Mark Baking",
  baking: "Pull & Mark Ready",
  ready: "Complete Pickup",
};

function TicketCard({
  ticket,
  onAction,
}: {
  ticket: Ticket;
  onAction: (ticket: Ticket) => void;
}) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-3 border-0 p-3.5 shadow-md",
        ticket.overdue &&
          "bg-gradient-to-b from-destructive/10 to-surface-lowest",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "font-mono text-lg font-black",
                ticket.overdue && "text-destructive",
              )}
            >
              {ticket.id}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase",
                ticket.type === "Delivery"
                  ? "bg-primary/10 text-primary"
                  : "bg-surface-high text-muted-foreground",
              )}
            >
              {ticket.type}
            </span>
          </div>
          <div className="mt-0.5 text-xs font-semibold text-muted-foreground">
            {ticket.customer}
            {ticket.amount && (
              <>
                {" "}
                •{" "}
                <span className="font-mono font-bold text-primary">
                  {ticket.amount}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="text-right">
          <span
            className={cn(
              "block rounded px-2 py-0.5 font-mono text-[11px] font-bold",
              ticket.overdue
                ? "bg-destructive text-white"
                : "bg-surface-high text-primary",
            )}
          >
            {ticket.overdue ? "OVERDUE +2m" : ticket.age}
          </span>
          {ticket.status === "pending" && (
            <span className="text-[10px] text-muted-foreground">
              Auto-slip: 00:59
            </span>
          )}
        </div>
      </div>
      {ticket.route && ticket.status === "confirmed" && (
        <div className="rounded bg-secondary/10 px-2 py-1 text-[11px] font-semibold">
          ↔ Station: {ticket.route}
        </div>
      )}
      {ticket.status === "preparing" && (
        <div>
          <div className="mb-1 flex justify-between font-mono text-[10px] font-bold text-muted-foreground">
            <span>{ticket.route}</span>
            <span>STEP {ticket.progress === 88 ? "3/3" : "2/3"}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-high">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${ticket.progress}%` }}
            />
          </div>
        </div>
      )}
      {ticket.status === "baking" && (
        <div
          className={cn(
            "rounded px-2 py-1.5 text-xs",
            ticket.overdue
              ? "bg-destructive/10 text-destructive"
              : "bg-surface-low",
          )}
        >
          <div className="flex justify-between font-bold">
            <span>
              ⌁ Oven Deck #{ticket.overdue ? "1 (390°C)" : "2 (380°C)"}
            </span>
            <span>{ticket.overdue ? "9m in Oven" : "6 / 8 min"}</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-high">
            <div
              className={cn(
                "h-full rounded-full",
                ticket.overdue ? "bg-destructive animate-pulse" : "bg-primary",
              )}
              style={{ width: `${ticket.progress}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[10px] font-mono">
            <span>
              {ticket.overdue ? "Exceeded Target Time" : "75% Completed"}
            </span>
            <span>{ticket.overdue ? "PULL IMMEDIATELY" : "~2m Remaining"}</span>
          </div>
        </div>
      )}
      {ticket.status === "ready" && (
        <div className="rounded bg-success/10 p-2 text-xs">
          <div className="flex items-center justify-between font-bold">
            <span>
              <CheckCircle2 className="mr-1 inline h-4 w-4 text-success" />
              {ticket.items[0].qty}x {ticket.items[0].name}
            </span>
            <span className="font-mono text-[10px] text-success">
              {ticket.type === "Pickup" ? "BOXED" : "BAGGED"}
            </span>
          </div>
          <div className="pl-6 text-[11px] text-muted-foreground">
            {ticket.items[0].detail}
          </div>
        </div>
      )}
      {ticket.status !== "baking" && ticket.status !== "ready" && (
        <div className="space-y-1.5 rounded bg-surface-low p-2.5">
          {ticket.items.map((item) => (
            <div key={item.name} className="flex items-start gap-2">
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] font-black",
                  ticket.status === "pending"
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary",
                )}
              >
                {item.qty}
              </span>
              <div className="text-xs">
                <div className="font-bold">{item.name}</div>
                {item.detail && (
                  <div className="text-[11px] text-muted-foreground">
                    {item.detail}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {ticket.status === "baking" && (
        <div className="space-y-1.5">
          {ticket.items.map((item) => (
            <div key={item.name} className="flex items-start gap-2 text-xs">
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded text-[10px] font-black",
                  ticket.overdue
                    ? "bg-destructive text-white"
                    : "bg-primary/10 text-primary",
                )}
              >
                {item.qty}
              </span>
              <div>
                <b>{item.name}</b>
                <div className="text-[11px] text-muted-foreground">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {ticket.note && (
        <div className="flex items-start gap-1.5 rounded bg-surface-highest px-2.5 py-1.5 text-[11px] italic text-muted-foreground">
          <Bell className="h-3.5 w-3.5 shrink-0 text-primary" />“{ticket.note}”
        </div>
      )}
      {ticket.status === "pending" ? (
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onAction(ticket)}
            className="col-span-2 inline-flex items-center justify-center gap-1 rounded bg-success py-2 text-xs font-bold text-white"
          >
            <Check className="h-4 w-4" />
            Accept Order
          </button>
          <button
            type="button"
            onClick={() => onAction(ticket)}
            className="rounded bg-surface-high py-2 text-xs font-semibold"
          >
            Reject
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onAction(ticket)}
          className={cn(
            "inline-flex w-full items-center justify-center gap-1.5 rounded py-2 text-xs font-bold text-white shadow-sm",
            ticket.overdue
              ? "bg-destructive"
              : ticket.status === "ready"
                ? "bg-success"
                : "bg-primary",
          )}
        >
          {ticket.status === "preparing" ? (
            <Flame className="h-4 w-4" />
          ) : ticket.status === "ready" ? (
            <ShoppingBag className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {ticket.overdue
            ? "Pull & Mark Ready (Urgent)"
            : actionText[ticket.status]}
        </button>
      )}
    </Card>
  );
}

export function KitchenCommandsScreen() {
  const [station, setStation] = useState<Station>("All Stations");
  const [filter, setFilter] = useState("All");
  const [muted, setMuted] = useState(false);
  const [notice, setNotice] = useState("");
  const [hiddenTickets, setHiddenTickets] = useState<string[]>([]);
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const tickets = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        tickets: column.tickets.filter(
          (ticket) =>
            !hiddenTickets.includes(ticket.id) &&
            (filter === "All" || ticket.type === filter),
        ),
      })),
    [filter, hiddenTickets],
  );
  const action = (ticket: Ticket) => {
    if (ticket.status === "pending")
      setHiddenTickets((ids) => [...ids, ticket.id]);
    notify(`${ticket.id} moved to the next kitchen stage.`);
  };
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        ["input", "textarea"].includes(
          (document.activeElement?.tagName || "").toLowerCase(),
        )
      )
        return;
      if (event.key.toLowerCase() === "f")
        document.documentElement.requestFullscreen?.();
      if (event.key === " ") {
        event.preventDefault();
        const next = tickets[0]?.tickets[0];
        if (next) action(next);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
  return (
    <div className="min-h-full bg-background">
      <div className="border-b bg-surface-low p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Dashboard</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>Orders</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-primary">Live Kitchen</span>
              <span className="rounded-full bg-surface-high px-2 py-0.5 text-[10px] text-primary">
                Pizza House #402
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                Live Kitchen Board
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                KDS Engine Active
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Real-time kitchen order dispatch, prep station allocation, and
              cooking progress.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Card className="flex items-center gap-3 px-3.5 py-2 shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ClockIcon />
              </div>
              <div>
                <p className="type-label-caps text-muted-foreground">
                  Avg Prep Time
                </p>
                <b className="font-mono">
                  14.2m{" "}
                  <span className="text-[11px] text-success">Target: 15m</span>
                </b>
              </div>
            </Card>
            <Card className="flex items-center gap-3 px-3.5 py-2 shadow-sm">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-4 border-surface-high border-t-primary text-[9px] font-bold">
                78%
              </div>
              <div>
                <p className="type-label-caps text-muted-foreground">
                  Load: Moderate Peak
                </p>
                <b className="text-xs text-primary">19 Active Tickets</b>
              </div>
            </Card>
            <div className="flex items-center gap-1 rounded bg-surface-lowest p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setMuted((value) => !value)}
                className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:bg-surface-high"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="h-4 w-4 text-primary" />
                )}
                {muted ? "Sound OFF" : "Sound ON"}
              </button>
              <button
                type="button"
                onClick={() => document.documentElement.requestFullscreen?.()}
                className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:bg-surface-high"
              >
                <Maximize className="h-4 w-4" />
                <span className="hidden sm:inline">Fullscreen</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-between gap-3 pt-3 md:flex-row md:items-center">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {(
              [
                ["All Stations", Grid2X2, 19],
                ["Station A: Dough & Oven", Flame, 8],
                ["Station B: Cold Prep & Toppings", Soup, 6],
                ["Station C: Fryer & Sides", Soup, 5],
              ] as const
            ).map(([label, Icon, count]) => (
              <button
                key={label}
                type="button"
                onClick={() => setStation(label)}
                className={cn(
                  "inline-flex items-center gap-1.5 whitespace-nowrap rounded px-3 py-1.5 text-xs font-semibold",
                  station === label
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:bg-surface-high",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                <span className="rounded-full bg-black/10 px-1.5 py-0.5 text-[10px]">
                  {count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded bg-surface-high p-1 text-xs">
            <span className="px-2 font-semibold uppercase tracking-wider text-muted-foreground">
              Type:
            </span>
            {["All", "Delivery", "Pickup"].map((value) => (
              <button
                type="button"
                key={value}
                onClick={() => setFilter(value)}
                className={cn(
                  "rounded px-2.5 py-1 font-semibold",
                  filter === value
                    ? "bg-surface-lowest shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                {value}
                {value === "All"
                  ? " (19)"
                  : value === "Delivery"
                    ? " (13)"
                    : " (6)"}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="rounded px-2.5 py-1 font-semibold text-destructive"
            >
              <CircleDot className="mr-1 inline h-3 w-3" />
              Overdue (2)
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-6 overflow-x-auto bg-surface-lowest px-6 py-2 text-xs text-muted-foreground shadow-sm">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span>
            <i className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
            <b className="text-foreground">Oven Deck #1:</b> 390°C (At Temp)
          </span>
          <span>
            <i className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
            <b className="text-foreground">Oven Deck #2:</b> 380°C (Capacity
            85%)
          </span>
          <span>
            <i className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-success" />
            <b className="text-foreground">Fryer Line 1 & 2:</b> 175°C (Ready)
          </span>
          <span>
            <i className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-success" />
            <b className="text-foreground">Make-Table Chiller:</b> 3.2°C
            (Optimal)
          </span>
        </div>
        <span className="hidden items-center gap-1 whitespace-nowrap font-mono text-[11px] xl:flex">
          <RotateCw className="h-3.5 w-3.5 text-success" />
          Sync latency: 24ms
        </span>
      </div>
      <div className="overflow-x-auto p-4 sm:p-6">
        <div className="grid min-w-[1700px] grid-flow-col auto-cols-[330px] items-start gap-4 pb-8 lg:auto-cols-[350px]">
          {tickets.map((column) => (
            <div
              key={column.title}
              className="min-h-[680px] rounded-lg bg-surface-low/70 p-3 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between rounded bg-surface-high px-2 py-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn("h-2.5 w-2.5 rounded-full", column.color)}
                  />
                  <h2 className="text-sm font-bold uppercase tracking-tight">
                    {column.title}
                  </h2>
                </div>
                <span className="rounded-full bg-surface-highest px-2 py-0.5 font-mono text-xs font-bold text-primary">
                  {column.tickets.length} Orders
                </span>
              </div>
              <div className="space-y-3">
                {column.tickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onAction={action}
                  />
                ))}
                {column.tickets.length === 0 && (
                  <div className="rounded bg-surface-lowest p-5 text-center text-xs text-muted-foreground">
                    No tickets in this view
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 z-30 flex flex-col justify-between gap-3 border-t bg-surface/95 px-6 py-2.5 shadow-xl backdrop-blur-md md:flex-row md:items-center">
        <div className="flex items-center gap-4 text-xs">
          <span>
            <i className="mr-2 inline-block h-2 w-2 rounded-full bg-success" />
            WebSocket: Connected (kds-live-stream-04)
          </span>
          <span className="hidden text-muted-foreground sm:inline">•</span>
          <span className="text-muted-foreground">
            Auto-refresh: <b className="font-mono text-primary">Every 5s</b>
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="hidden uppercase tracking-wider lg:inline">
            Shortcuts:
          </span>
          <span>
            <kbd className="rounded bg-surface-high px-1.5 py-0.5 font-mono text-[10px] font-bold">
              Space
            </kbd>{" "}
            Accept Next
          </span>
          <span>
            <kbd className="rounded bg-surface-high px-1.5 py-0.5 font-mono text-[10px] font-bold">
              B
            </kbd>{" "}
            Pull Oven Deck
          </span>
          <span>
            <kbd className="rounded bg-surface-high px-1.5 py-0.5 font-mono text-[10px] font-bold">
              F
            </kbd>{" "}
            Fullscreen
          </span>
        </div>
      </div>
      {notice && (
        <div className="fixed bottom-16 right-6 z-50 rounded-lg bg-inverse-surface px-4 py-3 text-xs font-semibold text-white shadow-xl">
          {notice}
        </div>
      )}
    </div>
  );
}

function ClockIcon() {
  return <span className="font-mono text-xs">◷</span>;
}
