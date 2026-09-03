import { MenuCatalogDetails } from "@/components/menus/menu-catalog-screens";

export default async function MenuDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MenuCatalogDetails id={id} />;
}
