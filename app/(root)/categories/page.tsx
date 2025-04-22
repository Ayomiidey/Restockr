import { Dispatch, SetStateAction } from "react";
import CategoryForm from "./categoryForm";
import { deleteCategory } from "@/app/lib/actions/product-action";
import { toast } from "sonner";
import { Category } from "@/types";

const CategoriesPage = ({
  categories,
  setCategories,
}: {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Categories</h2>
      <CategoryForm categories={categories} setCategories={setCategories} />
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
  );
};

export default CategoriesPage;
