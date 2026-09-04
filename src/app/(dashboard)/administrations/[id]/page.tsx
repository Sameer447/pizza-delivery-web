import { PlatformAdministrationDetails } from "@/components/platform/platform-screens";

export default async function AdministrationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PlatformAdministrationDetails id={id} />;
}
