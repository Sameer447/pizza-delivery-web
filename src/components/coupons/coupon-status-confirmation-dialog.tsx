"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Lock,
  PauseCircle,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

const reasons = [
  "Campaign budget limit reached early",
  "High kitchen load / inventory protection",
  "Promotional period concluded ahead of time",
  "Suspected promo abuse or code leakage",
  "Other operational reason",
];

export function CouponStatusConfirmationDialog({
  onClose,
  onDeactivated,
}: {
  onClose: () => void;
  onDeactivated: () => void;
}) {
  const [reason, setReason] = useState(reasons[0]);
  const [other, setOther] = useState("");
  const [grace, setGrace] = useState(true);
  const [deletePreview, setDeletePreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const confirm = () => {
    if (reason === reasons[4] && !other.trim()) return;
    setBusy(true);
    window.setTimeout(onDeactivated, 550);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div className="my-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between rounded-xl bg-surface-lowest px-5 py-3.5 shadow-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div>
              <p className="text-sm font-semibold">
                <b className="text-primary">PIZZA10</b> deactivated across
                online storefronts &amp; POS terminals.
              </p>
              <p className="text-xs text-muted-foreground">
                Sync latency: <b className="font-mono text-success">118ms</b> •
                KDS Sync: 4 kitchen screens acknowledged
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        {!deletePreview ? (
          <div className="overflow-hidden rounded-xl bg-surface-lowest shadow-2xl">
            <div className="flex items-start justify-between bg-surface-low px-7 py-5">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                  <PauseCircle className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">
                    Deactivate Coupon — PIZZA10?
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Campaign: Summer Sizzler 10% Off • Initial Pool: 2,000
                    Redemptions
                  </p>
                </div>
              </div>
              <button onClick={onClose} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-6 p-7">
              <div className="flex items-start gap-3.5 rounded-lg bg-surface-high p-4">
                <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed">
                  Deactivating immediately prevents new redemptions across Web,
                  iOS, Android, and POS. Existing receipts and in-flight kitchen
                  tickets will not be modified.
                </p>
              </div>
              <div>
                <span className="type-label-caps mb-2.5 block text-muted-foreground">
                  Current Channel Impact
                </span>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg bg-surface-low p-3.5">
                    <span className="text-xs text-muted-foreground">
                      Available Balance
                    </span>
                    <b className="mt-2 block text-xl">
                      580{" "}
                      <small className="text-xs font-normal">
                        remaining claims
                      </small>
                    </b>
                    <div className="mt-2 h-1.5 rounded-full bg-surface-high">
                      <div className="h-full w-[58%] rounded-full bg-success" />
                    </div>
                  </div>
                  <div className="rounded-lg bg-surface-low p-3.5">
                    <span className="text-xs text-muted-foreground">
                      Active Carts
                    </span>
                    <b className="mt-2 block text-xl text-primary">
                      14{" "}
                      <small className="text-xs font-normal text-muted-foreground">
                        sessions
                      </small>
                    </b>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      Lock at checkout refresh
                    </p>
                  </div>
                  <div className="rounded-lg bg-surface-low p-3.5">
                    <span className="text-xs text-muted-foreground">
                      Kitchen Line (KDS)
                    </span>
                    <div className="mt-2 flex gap-1.5 font-mono text-xs font-bold">
                      <span className="rounded bg-surface-high px-1.5 py-0.5">
                        #10482
                      </span>
                      <span className="rounded bg-surface-high px-1.5 py-0.5">
                        #10486
                      </span>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-success">
                      <Lock className="h-3.5 w-3.5" />
                      Preserved
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="type-label-caps">
                  Deactivation Reason <span className="text-primary">*</span>
                </label>
                <div className="grid gap-2 md:grid-cols-2">
                  {reasons.slice(0, 4).map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 rounded-lg bg-surface-low p-3 text-xs"
                    >
                      <input
                        type="radio"
                        name="reason"
                        checked={reason === item}
                        onChange={() => setReason(item)}
                        className="accent-primary"
                      />
                      {item}
                    </label>
                  ))}
                </div>
                <label className="flex items-center gap-3 rounded-lg bg-surface-low p-3 text-xs">
                  <input
                    type="radio"
                    name="reason"
                    checked={reason === reasons[4]}
                    onChange={() => setReason(reasons[4])}
                    className="accent-primary"
                  />
                  Other operational reason
                </label>
                {reason === reasons[4] && (
                  <input
                    value={other}
                    onChange={(event) => setOther(event.target.value)}
                    placeholder="Specify operational reason..."
                    className="w-full rounded bg-surface-low px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary"
                  />
                )}
              </div>
              <label className="flex items-start gap-3 rounded-lg bg-secondary/10 p-3 text-xs">
                <input
                  type="checkbox"
                  checked={grace}
                  onChange={(event) => setGrace(event.target.checked)}
                  className="mt-0.5 accent-primary"
                />
                <span>
                  <b>
                    Allow existing in-flight checkouts to finalize within the
                    next 15 minutes
                  </b>
                  <span className="mt-0.5 block text-muted-foreground">
                    New cart additions are rejected immediately.
                  </span>
                </span>
              </label>
            </div>
            <div className="flex flex-col justify-between gap-3 bg-surface-low px-7 py-4 sm:flex-row sm:items-center">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-success" />
                Authenticated as Head Kitchen: Marco (ID #804)
              </span>
              <div className="flex gap-2.5">
                <button
                  onClick={onClose}
                  className="rounded-lg bg-surface-high px-4 py-2.5 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirm}
                  disabled={busy || (reason === reasons[4] && !other.trim())}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white disabled:opacity-50"
                >
                  <PauseCircle className="h-4 w-4" />
                  {busy ? "Deactivating…" : "Deactivate Coupon"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-surface-lowest p-5 shadow-xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive text-white">
                  <Trash2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="type-label-caps text-destructive">
                    Destructive Action Dialog Preview
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Permanent purge; archived analytics, ledger tickets, and tax
                    reporting remain preserved for fiscal compliance.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeletePreview(false)}
                  className="rounded bg-surface-high px-3 py-1.5 text-xs"
                >
                  Dismiss
                </button>
                <button
                  onClick={() =>
                    window.alert(
                      "Permanent purge requires separate audited authorization.",
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded bg-destructive px-3.5 py-1.5 text-xs font-bold text-white"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Purge Forever
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setDeletePreview(true)}
          className="self-end text-xs font-semibold text-white hover:underline"
        >
          Preview permanent deletion safeguard
        </button>
      </div>
    </div>
  );
}
