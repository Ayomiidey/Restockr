"use client";
import { addCategory } from "@/app/lib/actions/product-action";
import { Category } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader } from "lucide-react";

const CategoryForm = ({
  categories,
  setCategories,
}: {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) => {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    startTransition(async () => {
      try {
        const res = await addCategory(formData);
        if (res.success) {
          toast.success("Category added");
          setCategories([...categories, res.category]);
          setName("");
        } else {
          toast.error(res.error || "Failed to add category");
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    });
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
        className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto ${
          isPending ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader className="animate-spin h-4 w-4" />
            <span>Processing...</span>
          </>
        ) : (
          "Add Category"
        )}
      </button>
    </form>
  );
};

export default CategoryForm;
