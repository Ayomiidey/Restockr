import {
  getProductbyId,
  getCategories,
  getSuppliers,
} from "@/app/lib/actions/product-action";
import EditProductForm from "./editForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, categories, suppliers] = await Promise.all([
    getProductbyId(params.id),
    getCategories(),
    getSuppliers(),
  ]);

  if (!product) {
    return notFound();
  }

  return (
    <EditProductForm
      product={product}
      categories={categories}
      suppliers={suppliers}
    />
  );
}
