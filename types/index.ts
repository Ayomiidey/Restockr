import { z } from "zod";
import {
  productSchema,
  categorySchema,
  supplierSchema,
} from "@/app/lib/validation";

export type Product = z.infer<typeof productSchema> & {
  id: string;
};
