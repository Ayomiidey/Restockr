import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  quantity: z.number().int().min(0, "Stock cannot be negative"),
  price: z.number().positive("Price must be positive"),
  imageUrl: z.string().url("Must be valid URL").optional(),
  lowStockThreshold: z.number().int().min(1, "Threshold must be at least 1"),
  categoryId: z.string().uuid("Category ID must be a valid UUID"),
  supplierId: z.string().uuid("Supplier ID must be a valid UUID"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const supplierSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contact: z.string().optional(),
});

export const deleteSchema = z.object({
  id: z.number().int().positive("ID is required"),
});
