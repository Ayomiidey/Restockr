"use client";

import { useState, useEffect, SetStateAction } from "react";
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
import { Menu, ChevronLeft } from "lucide-react";

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
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle tab selection
  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

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
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      <Toaster position="top-right" richColors />

      <div className="bg-white p-4 shadow-md flex justify-between items-center md:hidden z-10">
        <h1 className="text-xl font-bold text-gray-800">Smart Inventory</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed md:relative top-0 left-0 h-screen bg-white shadow-xl z-30 md:z-0 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:w-64 w-3/4 pt-4`}
      >
        {sidebarOpen && (
          <button
            className="absolute -right-12 top-4 bg-white p-2 rounded-r-lg shadow-md md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Smart Inventory</h1>
        </div>

        <nav className="mt-4">
          {["dashboard", "products", "categories", "suppliers"].map((tab) => (
            <button
              key={tab}
              className={`w-full text-left p-4 hover:bg-gray-100 transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-blue-50 border-l-4 border-blue-500 font-semibold"
                  : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          <button
            className="w-full text-left p-4 hover:bg-red-50 text-red-600 transition-colors duration-200"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main content area - adjusts based on sidebar state */}
      <div
        className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-0" : "ml-0"
        } mt-16 md:mt-0 p-4 md:p-6`}
      >
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Products</h3>
                <p className="text-xl md:text-2xl">
                  {analytics?.totalProducts ?? 0}
                </p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Stock</h3>
                <p className="text-xl md:text-2xl">
                  {analytics?.totalStock ?? 0}
                </p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Low Stock Items</h3>
                <p className="text-xl md:text-2xl">
                  {analytics?.lowStockCount ?? 0}
                </p>
              </div>
            </div>
            <button
              className="bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded hover:bg-blue-700 mb-4 md:mb-6 w-full md:w-auto transition-colors duration-200"
              onClick={handleExportAnalytics}
              disabled={!analytics}
            >
              Export Analytics
            </button>
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
              Low Stock Alerts
            </h3>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 md:p-4 text-left">Name</th>
                    <th className="p-3 md:p-4 text-left">SKU</th>
                    <th className="p-3 md:p-4 text-left">Stock</th>
                    <th className="p-3 md:p-4 text-left">Category</th>
                    <th className="p-3 md:p-4 text-left">Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="p-3 md:p-4">{product.name}</td>
                      <td className="p-3 md:p-4">{product.sku}</td>
                      <td className="p-3 md:p-4 text-red-600">
                        {product.stock}
                      </td>
                      <td className="p-3 md:p-4">{product.category.name}</td>
                      <td className="p-3 md:p-4">{product.supplier.name}</td>
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
