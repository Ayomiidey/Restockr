import { deleteProduct } from "@/app/lib/actions/product-action";
import { Category, Product, Supplier } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

const ProductPage = ({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  categories,
  products,
  setProducts,
  supplierFilter,
  setSupplierFilter,
  suppliers,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: Dispatch<SetStateAction<string>>;
  categories: Category[];
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  supplierFilter: string;
  setSupplierFilter: Dispatch<SetStateAction<string>>;
  suppliers: Supplier[];
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 border rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
          >
            <option value="">All Suppliers</option>
            {suppliers.map((sup) => (
              <option key={sup.id} value={sup.id}>
                {sup.name}
              </option>
            ))}
          </select>
        </div>
        <Link
          href="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">SKU</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Supplier</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4">
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.sku}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">${product.price.toFixed(2)}</td>
                <td className="p-4">{product.category.name}</td>
                <td className="p-4">{product.supplier.name}</td>
                <td className="p-4">
                  <Link
                    href={`/products/edit/${product.id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      const formData = new FormData();
                      formData.append("id", product.id);
                      const res = await deleteProduct(formData);
                      if (res.success) {
                        toast.success("Product deleted");
                        setProducts(
                          products.filter((p) => p.id !== product.id)
                        );
                      } else {
                        toast.error(res.error);
                      }
                    }}
                    className="inline"
                  >
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPage;
