import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RestaurantDetailsView } from "@/components/restaurants/restaurant-details-view";
export default function RestaurantDetailsPage() { return <div className="h-full overflow-y-auto p-4 sm:p-6"><div className="mx-auto max-w-[1440px] space-y-5"><Link href="/restaurants" className="inline-flex items-center gap-1 text-body-sm font-semibold text-primary hover:underline"><ArrowLeft className="h-4 w-4" />Back to Restaurants</Link><RestaurantDetailsView /></div></div>; }
