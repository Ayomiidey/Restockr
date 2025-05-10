"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { updateProduct } from "@/app/lib/actions/product-action";
import { Category, Supplier, Product } from "@/types";
import { productSchema } from "@/app/lib/validation";
import { z } from "zod";

interface EditProductFormProps {
  product: Product;
  categories: Category[];
  suppliers: Supplier[];
}

export default function EditProductForm({
  product,
  categories,
  suppliers,
}: EditProductFormProps) {
  const [name, setName] = useState(product.name);
  const [sku, setSku] = useState(product.sku);
  const [stock, setStock] = useState(product.stock.toString());
  const [price, setPrice] = useState(product.price.toString());
  const [lowStockThreshold, setLowStockThreshold] = useState(
    product.lowStockThreshold.toString()
  );
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [supplierId, setSupplierId] = useState(product.supplierId);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    try {
      productSchema.parse({
        name,
        sku,
        stock: parseInt(stock),
        price: parseFloat(price),
        lowStockThreshold: parseInt(lowStockThreshold),
        categoryId,
        supplierId,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          errorMap[path] = err.message;
        });
        setErrors(errorMap);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("lowStockThreshold", lowStockThreshold);
    formData.append("categoryId", categoryId);
    formData.append("supplierId", supplierId);
    if (image) formData.append("image", image);

    const res = await updateProduct(formData);
    setIsSubmitting(false);
    if (res.success) {
      toast.success("Product updated");
      router.push("/dashboard");
    } else {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" richColors />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : ""
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className={`w-full p-2 border rounded ${
                errors.sku ? "border-red-500" : ""
              }`}
              required
            />
            {errors.sku && (
              <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className={`w-full p-2 border rounded ${
                errors.stock ? "border-red-500" : ""
              }`}
              required
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full p-2 border rounded ${
                errors.price ? "border-red-500" : ""
              }`}
              required
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Low Stock Threshold
            </label>
            <input
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              className={`w-full p-2 border rounded ${
                errors.lowStockThreshold ? "border-red-500" : ""
              }`}
              required
            />
            {errors.lowStockThreshold && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lowStockThreshold}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={`w-full p-2 border rounded ${
                errors.categoryId ? "border-red-500" : ""
              }`}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Supplier</label>
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className={`w-full p-2 border rounded ${
                errors.supplierId ? "border-red-500" : ""
              }`}
              required
            >
              <option value="">Select a supplier</option>
              {suppliers.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name}
                </option>
              ))}
            </select>
            {errors.supplierId && (
              <p className="text-red-500 text-sm mt-1">{errors.supplierId}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
            <Link
              href="/dashboard"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
