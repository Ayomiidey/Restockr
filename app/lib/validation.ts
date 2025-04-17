import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  quantity: z.number().int().min(0, "Stock cannot be negative"),
  price: z.number().positive("Price must be positive"),
  imageUrl: z.string().url("Must be valid URL").optional(),
  lowStockThreshold: z.number().int().min(1, "Threshold must be at least 1"),
  categoryId: z.number().int().positive("Category ID is required"),
  supplierId: z.number().int().positive("Supplier ID is required"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const supplierSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contact: z.string().optional(),
});
