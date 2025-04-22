"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAnalytics,
  getCategories,
  getLowStock,
  getProducts,
  getSuppliers,
  addCategory,
  deleteCategory,
  addSupplier,
  deleteSupplier,
} from "../lib/actions/product-action";
import { signOut } from "next-auth/react";
import { toast, Toaster } from "sonner";
import { Product, Category, Supplier, Analytics } from "@/types";
import ProductPage from "./products/page";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [supplierFilter, setSupplierFilter] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          productsData,
          categoriesData,
          suppliersData,
          lowStockData,
          analyticsData,
        ] = await Promise.all([
          getProducts(search, categoryFilter, supplierFilter),
          getCategories(),
          getSuppliers(),
          getLowStock(),
          getAnalytics(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setSuppliers(suppliersData);
        setLowStock(lowStockData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, [search, categoryFilter, supplierFilter]);

  const handleExportAnalytics = () => {
    if (!analytics) return;
    const csv = [
      "Metric,Value",
      `Total Products,${analytics.totalProducts}`,
      `Total Stock,${analytics.totalStock}`,
      `Low Stock Items,${analytics.lowStockCount}`,
      `Categories,${analytics.categoryCount}`,
      `Suppliers,${analytics.supplierCount}`,
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory_analytics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" richColors />
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Smart Inventory</h1>
        </div>
        <nav className="mt-4">
          {["dashboard", "products", "categories", "suppliers"].map((tab) => (
            <button
              key={tab}
              className={`w-full text-left p-4 hover:bg-gray-100 ${
                activeTab === tab ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          <button
            className="w-full text-left p-4 hover:bg-gray-100 text-red-600"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </button>
        </nav>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Products</h3>
                <p className="text-2xl">{analytics?.totalProducts ?? 0}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Stock</h3>
                <p className="text-2xl">{analytics?.totalStock ?? 0}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Low Stock Items</h3>
                <p className="text-2xl">{analytics?.lowStockCount ?? 0}</p>
              </div>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
              onClick={handleExportAnalytics}
              disabled={!analytics}
            >
              Export Analytics
            </button>
            <h3 className="text-xl font-semibold mb-4">Low Stock Alerts</h3>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">SKU</th>
                    <th className="p-4 text-left">Stock</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">{product.sku}</td>
                      <td className="p-4 text-red-600">{product.stock}</td>
                      <td className="p-4">{product.category.name}</td>
                      <td className="p-4">{product.supplier.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <ProductPage
            search={search}
            setSearch={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
            products={products}
            setProducts={setProducts}
            supplierFilter={supplierFilter}
            setSupplierFilter={setSupplierFilter}
            suppliers={suppliers}
          />
        )}

        {activeTab === "categories" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Categories</h2>
            <CategoryForm
              categories={categories}
              setCategories={setCategories}
            />
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="border-t">
                      <td className="p-4">{category.name}</td>
                      <td className="p-4">
                        <form
                          action={async () => {
                            const formData = new FormData();
                            formData.append("id", category.id);
                            const res = await deleteCategory(formData);
                            if (res.success) {
                              toast.success("Category deleted");
                              setCategories(
                                categories.filter((c) => c.id !== category.id)
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
        )}

        {activeTab === "suppliers" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Suppliers</h2>
            <SupplierForm suppliers={suppliers} setSuppliers={setSuppliers} />
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Contact</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-t">
                      <td className="p-4">{supplier.name}</td>
                      <td className="p-4">{supplier.contact || "-"}</td>
                      <td className="p-4">
                        <form
                          action={async () => {
                            const formData = new FormData();
                            formData.append("id", supplier.id);
                            const res = await deleteSupplier(formData);
                            if (res.success) {
                              toast.success("Supplier deleted");
                              setSuppliers(
                                suppliers.filter((s) => s.id !== supplier.id)
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
        )}
      </div>
    </div>
  );
};

const CategoryForm = ({
  categories,
  setCategories,
}: {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    const res = await addCategory(formData);
    if (res.success) {
      toast.success("Category added");
      setCategories([...categories, res.category]);
      setName("");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white p-6 rounded-lg shadow"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Category
      </button>
    </form>
  );
};

const SupplierForm = ({
  suppliers,
  setSuppliers,
}: {
  suppliers: Supplier[];
  setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
}) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (contact) formData.append("contact", contact);
    const res = await addSupplier(formData);
    if (res.success) {
      toast.success("Supplier added");
      setSuppliers([...suppliers, res.supplier]);
      setName("");
      setContact("");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white p-6 rounded-lg shadow"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Supplier Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Contact (Optional)
        </label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Supplier
      </button>
    </form>
  );
};

export default Dashboard;
