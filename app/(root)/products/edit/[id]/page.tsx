// import {
//   getProductbyId,
//   getCategories,
//   getSuppliers,
// } from "@/app/lib/actions/product-action";
// import EditProductForm from "./editForm";
// import { notFound } from "next/navigation";

// export default async function EditProductPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const [product, categories, suppliers] = await Promise.all([
//     getProductbyId(params.id),
//     getCategories(),
//     getSuppliers(),
//   ]);

//   if (!product) {
//     return notFound();
//   }

//   return (
//     <EditProductForm
//       product={product}
//       categories={categories}
//       suppliers={suppliers}
//     />
//   );
// }

import {
  getProductbyId,
  getCategories,
  getSuppliers,
} from "@/app/lib/actions/product-action";
import EditProductForm from "./editForm";
import { notFound } from "next/navigation";

// Correct type for Next.js App Router dynamic route parameters
interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const [product, categories, suppliers] = await Promise.all([
    getProductbyId(params.id),
    getCategories(),
    getSuppliers(),
  ]);

  if (!product) return notFound();

  return (
    <EditProductForm
      product={product}
      categories={categories}
      suppliers={suppliers}
    />
  );
}
