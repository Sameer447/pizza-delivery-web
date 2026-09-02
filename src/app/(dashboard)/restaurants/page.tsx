import Link from "next/link";
import { Plus } from "lucide-react";
import { RestaurantSummary, RestaurantTable } from "@/components/restaurants/restaurant-table";

export default function RestaurantsPage() { return <div className="h-full overflow-y-auto p-4 sm:p-6"><div className="mx-auto max-w-[1440px] space-y-6"><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="type-page-title">Restaurants</h1><p className="mt-1 text-body-reg text-muted-foreground">Manage and monitor restaurants across the platform.</p></div><Link href="/restaurants/empty" className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-container"><Plus className="h-4 w-4" />Add Restaurant</Link></div><RestaurantSummary /><RestaurantTable /></div></div>; }
