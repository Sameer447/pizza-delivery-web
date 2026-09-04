import { ToppingDetails } from "@/components/toppings/topping-screens";

export default async function ToppingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ToppingDetails id={id} />;
}
