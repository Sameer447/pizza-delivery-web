"use client";

import { useEffect, useState } from "react";
import { restaurantDashboardApi } from "@/lib/api/restaurant-dashboard";
import { ApiError } from "@/lib/api/client";
import { useRestaurant } from "@/providers/restaurant-provider";
import { useAuthorization } from "@/hooks/use-authorization";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ErrorState, PageLoading } from "@/components/shared/states";
import type { AvailabilitySettings, UpdateAvailabilityRequest } from "@/types/restaurant-dashboard";

export function LiveRestaurantAvailability() {
  const { selectedRestaurantId } = useRestaurant();
  const { can } = useAuthorization();
  const [settings, setSettings] = useState<AvailabilitySettings | null>(null);
  const [form, setForm] = useState<UpdateAvailabilityRequest>({ status: "ACTIVE", pauseReason: "", pausedUntil: null, customerMessage: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedRestaurantId) return;
    void restaurantDashboardApi.getAvailability(selectedRestaurantId)
      .then((value) => { setSettings(value); setForm({ status: value.status === "SUSPENDED" ? "INACTIVE" : value.status, pauseReason: value.pauseReason ?? "", pausedUntil: value.pausedUntil, customerMessage: value.customerMessage ?? "" }); })
      .catch((reason: unknown) => setError(reason instanceof ApiError ? reason.code : "Unable to load availability"));
  }, [selectedRestaurantId]);

  if (!selectedRestaurantId) return <ErrorState message="No restaurant is selected." />;
  if (!settings && !error) return <PageLoading />;
  if (error) return <ErrorState message={`Unable to load availability (${error}).`} />;
  const allowed = can("restaurant.availability.update");
  const save = async () => {
    setSaving(true);
    setError(null);
    try { const value = await restaurantDashboardApi.updateAvailability(selectedRestaurantId, form); setSettings(value); }
    catch (reason: unknown) { setError(reason instanceof ApiError ? reason.code : "Unable to save availability"); }
    finally { setSaving(false); }
  };
  return <div className="h-full overflow-y-auto p-4 sm:p-6"><div className="mx-auto max-w-[900px] space-y-6"><div><p className="type-label-caps text-primary">Restaurant operations</p><h1 className="type-page-title mt-2">Availability</h1><p className="mt-1 text-sm text-muted-foreground">Pause or reopen ordering for this restaurant. Access is validated by the backend membership and permission policy.</p></div><Card><CardHeader><CardTitle>Customer availability</CardTitle></CardHeader><CardContent className="space-y-4"><label className="grid gap-2 text-sm font-medium">Status<select className="h-10 rounded-[var(--radius)] border bg-surface-lowest px-3" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as UpdateAvailabilityRequest["status"] })} disabled={!allowed}><option value="ACTIVE">Active</option><option value="INACTIVE">Paused</option></select></label><label className="grid gap-2 text-sm font-medium">Pause reason<Input value={form.pauseReason ?? ""} onChange={(event) => setForm({ ...form, pauseReason: event.target.value })} disabled={!allowed} /></label><label className="grid gap-2 text-sm font-medium">Resume at (optional)<Input type="datetime-local" value={form.pausedUntil ? form.pausedUntil.slice(0, 16) : ""} onChange={(event) => setForm({ ...form, pausedUntil: event.target.value ? new Date(event.target.value).toISOString() : null })} disabled={!allowed} /></label><label className="grid gap-2 text-sm font-medium">Customer message<Input value={form.customerMessage ?? ""} onChange={(event) => setForm({ ...form, customerMessage: event.target.value })} disabled={!allowed} /></label><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Current state: <strong>{settings?.status}</strong></p><Button type="button" onClick={() => void save()} disabled={!allowed || saving}>{saving ? "Saving…" : "Save availability"}</Button></div></CardContent></Card></div></div>;
}
