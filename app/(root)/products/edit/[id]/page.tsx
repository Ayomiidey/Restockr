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

// Define the expected shape of params
interface Params {
  id: string;
}

// Update the props type to handle params as a Promise
export default async function EditProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  // Await the params to resolve the id
  const { id } = await params;

  const [product, categories, suppliers] = await Promise.all([
    getProductbyId(id),
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
