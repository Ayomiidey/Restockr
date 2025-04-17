"use server";

import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
import { productSchema } from "../validation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      category: true,
      supplier: true,
    },
  });
}

export async function getProductbyId(id: string) {
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
      quantity: Number(formData.get("quantity")),
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
        quantity: validatedData.quantity,
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
      quantity: Number(formData.get("quantity")),
      price: Number(formData.get("price")),
      lowStockThreshold: Number(formData.get("lowStockThreshold") || 10),
      categoryId: formData.get("categoryId") as string,
      supplierId: formData.get("supplierId") as string,
    };

    const result = productSchema.omit({ sku: true }).safeParse(data);

    if (!result.success) {
      return { success: false, errors: result.error.format() };
    }

    const validated = result.data;

    await prisma.product.update({
      where: { id: id },
      data: {
        name: validated.name,
        quantity: validated.quantity,
        price: validated.price,
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

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id: id },
  });

  redirect("/products");
}
