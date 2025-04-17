"use server";

import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
import { productSchema } from "../validation";

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
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  const price = parseFloat(formData.get("price") as string);
  const lowStockThreshold = parseInt(
    (formData.get("lowStockThreshold") as string) || "10"
  );
  const categoryId = formData.get("categoryId") as string;
  const supplierId = formData.get("supplierId") as string;

  const result = productSchema.safeParse({
    name,
    sku,
    quantity,
    price,
    lowStockThreshold,
    categoryId,
    supplierId,
  });
  if (!result.success) {
    const errors = result.error.format();
    return { errors };
  }
  await prisma.product.create({
    data: {
      name: result.data.name,
      sku: result.data.sku,
      quantity: result.data.quantity,
      price: result.data.price,
      lowStockThreshold: result.data.lowStockThreshold,
      category: { connect: { id: result.data.categoryId } }, // Use relation syntax
      supplier: { connect: { id: result.data.supplierId } }, // Use relation syntax
      imageUrl: result.data.imageUrl,
    },
  });
  redirect("/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  const price = parseFloat(formData.get("price") as string);
  const lowStockThreshold = parseInt(
    (formData.get("lowStockThreshold") as string) || "10"
  );
  const categoryId = formData.get("categoryId") as string;
  const supplierId = formData.get("supplierId") as string;

  const result = productSchema.omit({ sku: true }).safeParse({
    name,
    quantity,
    price,
    lowStockThreshold,
    categoryId,
    supplierId,
  });

  if (!result.success) {
    const errors = result.error.format();
    return { errors };
  }
  await prisma.product.update({
    where: { id },
    data: result.data,
  });

  redirect("/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id: id },
  });

  redirect("/products");
}
