import { CategoryApiDetails } from "@/components/categories/category-api-list";

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CategoryApiDetails id={id} />;
}
