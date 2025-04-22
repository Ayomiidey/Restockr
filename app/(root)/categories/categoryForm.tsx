"use client";
import { addCategory } from "@/app/lib/actions/product-action";
import { Category } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

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

export default CategoryForm;
