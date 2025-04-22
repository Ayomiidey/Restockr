// import {
//   categorySchema,
//   productSchema,
//   supplierSchema,
// } from "@/app/lib/validation";
// import { z } from "zod";

// export type Product = z.infer<typeof productSchema> & {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
//   category: Category;
//   supplier: Supplier;
// };

// export type Category = z.infer<typeof categorySchema> & { id: string };
// export type Supplier = z.infer<typeof supplierSchema> & { id: string };

// export type Analytics = {
//   totalProducts: number;
//   totalStock: number;
//   lowStockCount: number;
//   categoryCount: number;
//   supplierCount: number;
// };

import {
  Product as PrismaProduct,
  Category as PrismaCategory,
  Supplier as PrismaSupplier,
} from "@prisma/client";

export type Product = PrismaProduct & {
  category: PrismaCategory;
  supplier: PrismaSupplier;
};

export type Category = PrismaCategory;

export type Supplier = PrismaSupplier;

export interface Analytics {
  totalProducts: number;
  totalStock: number;
  lowStockCount: number;
  categoryCount: number;
  supplierCount: number;
}
