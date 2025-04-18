// "use client";

// import { useEffect, useState } from "react";
// import { Product } from "@/types";

// import {
//   getProducts,
//   createProduct,
//   deleteProduct,
//   getLowStock,
//   getAnalytics,
//   addCategory,
//   getCategories,
//   addSupplier,
//   getSuppliers,
// } from "./lib/actions/product-action";
// import Image from "next/image";

// // type Product = {
// //   id: string;
// //   name: string;
// //   sku: string;
// //   stock: number;
// //   lowStockThreshold: number;
// //   price: number;
// //   imageUrl: string | null;
// //   category: { id: string; name: string };
// //   supplier: { id: string; name: string; contact: string | null };
// // };

// type Category = { id: string; name: string };
// type Supplier = { id: string; name: string; contact?: string };
// type Analytics = {
//   totalProducts: number;
//   totalStock: number;
//   lowStockCount: number;
// };

// export default function Home() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [lowStock, setLowStock] = useState<Product[]>([]);
//   const [analytics, setAnalytics] = useState<Analytics | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [suppliers, setSuppliers] = useState<Supplier[]>([]);
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   // Fetch data on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setProducts(await getProducts());
//       setLowStock(await getLowStock());
//       setAnalytics(await getAnalytics());
//       setCategories(await getCategories());
//       setSuppliers(await getSuppliers());
//     };
//     fetchData();
//   }, []);

//   // Handle product form submission
//   const handleCreateProduct = async (formData: FormData) => {
//     const result = await createProduct(formData);
//     if (result.success) {
//       setProducts([...products, result.product]);
//       setError(null);
//     } else {
//       setError(result.error);
//     }
//   };

//   // Handle category form submission
//   const handleAddCategory = async (formData: FormData) => {
//     const result = await addCategory(formData);
//     if (result.success) {
//       setCategories([...categories, result.category]);
//       setError(null);
//     } else {
//       setError(result.error);
//     }
//   };

//   // Handle supplier form submission
//   const handleAddSupplier = async (formData: FormData) => {
//     const result = await addSupplier(formData);
//     if (result.success) {
//       setSuppliers([...suppliers, result.supplier]);
//       setError(null);
//     } else {
//       setError(result.error);
//     }
//   };

//   // Handle product deletion
//   const handleDeleteProduct = async (id: number) => {
//     const formData = new FormData();
//     formData.append("id", id.toString());
//     const result = await deleteProduct(formData);
//     if (result.success) {
//       setProducts(products.filter((p) => p.id !== id));
//       setError(null);
//     } else {
//       setError(result.error);
//     }
//   };

//   // Filter products by search term
//   const filteredProducts = products.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.sku.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Smart Inventory Manager</h1>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>
//       )}

//       {/* Analytics */}
//       {analytics && (
//         <div className="mb-8 p-4 bg-gray-100 rounded-lg">
//           <h2 className="text-xl font-semibold mb-2">Analytics</h2>
//           <p>Total Products: {analytics.totalProducts}</p>
//           <p>Total Stock: {analytics.totalStock}</p>
//           <p>Low Stock Items: {analytics.lowStockCount}</p>
//         </div>
//       )}

//       {/* Low Stock Alerts */}
//       {lowStock.length > 0 && (
//         <div className="mb-8 p-4 bg-red-100 rounded-lg">
//           <h2 className="text-xl font-semibold text-red-600 mb-2">
//             Low Stock Alerts
//           </h2>
//           <ul className="list-disc pl-5">
//             {lowStock.map((product) => (
//               <li key={product.id}>
//                 {product.name} (Stock: {product.stock}, Threshold:{" "}
//                 {product.lowStockThreshold})
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Forms */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         {/* Add Product Form */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2">Add Product</h2>
//           <form
//             action={handleCreateProduct}
//             className="space-y-2"
//             encType="multipart/form-data"
//           >
//             <input
//               name="name"
//               placeholder="Name"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <input
//               name="sku"
//               placeholder="SKU"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <input
//               name="stock"
//               type="number"
//               placeholder="Stock"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <input
//               name="lowStockThreshold"
//               type="number"
//               placeholder="Low Stock Threshold"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <input
//               name="price"
//               type="number"
//               step="0.01"
//               placeholder="Price"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <input
//               name="image"
//               type="file"
//               accept="image/*"
//               className="w-full p-2 border rounded"
//             />
//             <select
//               name="categoryId"
//               className="w-full p-2 border rounded"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="supplierId"
//               className="w-full p-2 border rounded"
//               required
//             >
//               <option value="">Select Supplier</option>
//               {suppliers.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//             <button
//               type="submit"
//               className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Add Product
//             </button>
//           </form>
//         </div>

//         {/* Add Category Form */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2">Add Category</h2>
//           <form action={handleAddCategory} className="space-y-2">
//             <input
//               name="name"
//               placeholder="Category Name"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Add Category
//             </button>
//           </form>
//         </div>

//         {/* Add Supplier Form */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2">Add Supplier</h2>
//           <form action={handleAddSupplier} className="space-y-2">
//             <input
//               name="name"
//               placeholder="Supplier Name"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <input
//               name="contact"
//               placeholder="Contact (optional)"
//               className="w-full p-2 border rounded"
//             />
//             <button
//               type="submit"
//               className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Add Supplier
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name or SKU..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {/* Inventory Table */}
//       <h2 className="text-xl font-semibold mb-4">Inventory</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse bg-white shadow-md rounded-lg">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-3 text-left">Image</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">SKU</th>
//               <th className="p-3 text-left">Stock</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Category</th>
//               <th className="p-3 text-left">Supplier</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((product) => (
//               <tr key={product.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">
//                   {product.imageUrl ? (
//                     <Image
//                       src={product.imageUrl}
//                       alt={product.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>
//                 <td className="p-3">{product.name}</td>
//                 <td className="p-3">{product.sku}</td>
//                 <td className="p-3">{product.stock}</td>
//                 <td className="p-3">${product.price.toFixed(2)}</td>
//                 <td className="p-3">{product.category.name}</td>
//                 <td className="p-3">{product.supplier.name}</td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => handleDeleteProduct(product.id)}
//                     className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
