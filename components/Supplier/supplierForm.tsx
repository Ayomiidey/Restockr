import { addSupplier } from "@/app/lib/actions/product-action";
import { Supplier } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

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

export default SupplierForm;
