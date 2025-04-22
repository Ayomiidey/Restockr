"use server";

import { prisma } from "@/db/prisma";
import {
  categorySchema,
  deleteSchema,
  productSchema,
  supplierSchema,
} from "../validation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { Analytics, Category, Product, Supplier } from "@/types";

// export async function getProducts() {
//   return await prisma.product.findMany({
//     include: {
//       category: true,
//       supplier: true,
//     },
//   });
// }

export async function getProducts(
  search?: string,
  categoryId?: string,
  supplierId?: string
): Promise<Product[]> {
  return await prisma.product.findMany({
    where: {
      AND: [
        search ? { name: { contains: search, mode: "insensitive" } } : {},
        categoryId ? { categoryId } : {},
        supplierId ? { supplierId } : {},
      ],
    },
    include: {
      category: true,
      supplier: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductbyId(id: string): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: { id: id },
    include: {
      category: true,
      supplier: true,
    },
  });
}

export async function createProduct(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      sku: formData.get("sku") as string,
      stock: Number(formData.get("stock")),
      price: Number(formData.get("price")),
      lowStockThreshold: Number(formData.get("lowStockThreshold") || 10),
      categoryId: formData.get("categoryId") as string,
      supplierId: formData.get("supplierId") as string,
      imageUrl: undefined as string | undefined,
    };

    // Handle image upload
    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      const { url } = await put(image.name, image, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      data.imageUrl = url;
    }

    const result = productSchema.safeParse(data);
    if (!result.success) {
      return { success: false, errors: result.error.format() };
    }

    const validatedData = result.data;

    await prisma.product.create({
      data: {
        name: validatedData.name,
        sku: validatedData.sku,
        stock: validatedData.stock,
        price: validatedData.price,
        lowStockThreshold: validatedData.lowStockThreshold,
        category: { connect: { id: validatedData.categoryId } },
        supplier: { connect: { id: validatedData.supplierId } },
        imageUrl: validatedData.imageUrl,
      },
    });
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Something went wrong." };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      stock: Number(formData.get("stock")),
      price: Number(formData.get("price")),
      lowStockThreshold: Number(formData.get("lowStockThreshold") || 10),
      categoryId: formData.get("categoryId") as string,
      supplierId: formData.get("supplierId") as string,
      imageUrl: undefined as string | undefined,
    };

    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      const { url } = await put(image.name, image, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      data.imageUrl = url;
    }

    const result = productSchema.omit({ sku: true }).safeParse(data);

    if (!result.success) {
      return { success: false, errors: result.error.format() };
    }

    const validated = result.data;

    await prisma.product.update({
      where: { id: id },
      data: {
        name: validated.name,
        stock: validated.stock,
        price: validated.price,
        imageUrl: validated.imageUrl,
        lowStockThreshold: validated.lowStockThreshold,
        category: { connect: { id: validated.categoryId } },
        supplier: { connect: { id: validated.supplierId } },
      },
    });

    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Something went wrong." };
  }
}

export async function deleteProduct(formData: FormData) {
  try {
    const { id } = deleteSchema.parse({ id: formData.get("id") as string });
    await prisma.product.delete({ where: { id: id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function getLowStock(): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { stock: { lte: prisma.product.fields.lowStockThreshold } },
    include: { category: true, supplier: true },
    orderBy: { stock: "asc" },
  });
}

export async function getAnalytics(): Promise<Analytics> {
  const totalProducts = await prisma.product.count();
  const totalStock = await prisma.product.aggregate({ _sum: { stock: true } });
  const lowStockCount = await prisma.product.count({
    where: { stock: { lte: prisma.product.fields.lowStockThreshold } },
  });
  const categoryCount = await prisma.category.count();
  const supplierCount = await prisma.supplier.count();
  return {
    totalProducts,
    totalStock: totalStock._sum.stock || 0,
    lowStockCount,
    categoryCount,
    supplierCount,
  };
}

export async function addCategory(
  formData: FormData
): Promise<
  { success: true; category: Category } | { success: false; error: string }
> {
  try {
    const data = { name: formData.get("name") as string };
    const validatedData = categorySchema.parse(data);
    const category = await prisma.category.create({ data: validatedData });
    revalidatePath("/");
    return { success: true, category };
  } catch (error) {
    console.error(error);
    return { success: false, error: "invalid data" };
  }
}

export async function deleteCategory(formData: FormData) {
  try {
    const { id } = deleteSchema.parse({ id: formData.get("id") as string });
    await prisma.category.delete({ where: { id: id } });
    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to delete category" };
  }
}

export async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany();
}

export async function addSupplier(
  formData: FormData
): Promise<
  { success: true; supplier: Supplier } | { success: false; error: string }
> {
  try {
    const data = {
      name: formData.get("name") as string,
      contact: formData.get("contact") as string | undefined,
    };
    const validatedData = supplierSchema.parse(data);
    const supplier = await prisma.supplier.create({ data: validatedData });
    revalidatePath("/");
    return { success: true, supplier };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Invalid data" };
  }
}

export async function deleteSupplier(formData: FormData) {
  try {
    const { id } = deleteSchema.parse({ id: formData.get("id") as string });
    await prisma.supplier.delete({ where: { id } });
    revalidatePath("/suppliers");
    return { success: true };
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete supplier",
    };
  }
}

export async function getSuppliers(): Promise<Supplier[]> {
  return await prisma.supplier.findMany();
}
