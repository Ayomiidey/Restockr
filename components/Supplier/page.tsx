import { Supplier } from "@/types";
import SupplierForm from "./supplierForm";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { deleteSupplier } from "@/app/lib/actions/product-action";

const SupplierPage = ({
  suppliers,
  setSuppliers,
}: {
  suppliers: Supplier[];
  setSuppliers: Dispatch<SetStateAction<Supplier[]>>;
}) => {
  return (
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
  );
};

export default SupplierPage;
