import { PlatformRestaurantDetails } from "@/components/platform/platform-screens";

export default async function RestaurantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PlatformRestaurantDetails id={id} />;
}
