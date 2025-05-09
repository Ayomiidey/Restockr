"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import {
  getAnalytics,
  getCategories,
  getLowStock,
  getProducts,
  getSuppliers,
} from "../../lib/actions/product-action";
import { signOut } from "next-auth/react";
import { toast, Toaster } from "sonner";
import { Product, Category, Supplier, Analytics } from "@/types";
import ProductPage from "../../../components/products/page";
import CategoriesPage from "../../../components/categories/page";
import SupplierPage from "../../../components/Supplier/page";

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
  // const router = useRouter();

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
            onClick={() => signOut({ callbackUrl: "/" })}
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
          <CategoriesPage
            categories={categories}
            setCategories={setCategories}
          />
        )}

        {activeTab === "suppliers" && (
          <SupplierPage suppliers={suppliers} setSuppliers={setSuppliers} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
