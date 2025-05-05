"use client";
import { addCategory } from "@/app/lib/actions/product-action";
import { Category } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { useTransition } from "react";
import SubmitButton from "../button";

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

      <SubmitButton isPending={isPending} text="Add Category" />
    </form>
  );
};

export default CategoryForm;
