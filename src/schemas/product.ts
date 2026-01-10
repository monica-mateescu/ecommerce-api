import { z } from "zod/v4";
import { Types } from "mongoose";

// 1️⃣ INPUT schema — what client sends (POST / PUT)
export const productInputSchema = z.strictObject({
  name: z.string({ error: "ProductName must be a string" }).min(1, { message: "Product name is required" }),
  description: z.string({ error: "Description must be a string" }).min(1, { message: "Description is required" }),
  price: z.number({ error: "Price must be a number" }).min(0, { message: "Price must be a positive number" }),
  stock: z.number({ error: "Stock must be a number" }).min(0, { message: "Stock must be >= 0" }),
  categoryId: z
    .string()
    .refine((id) => Types.ObjectId.isValid(id), {
      message: "Invalid categoryId",
    }),
});

// 2️⃣ DB / RESPONSE schema — what Mongo returns
export const productSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  categoryId: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number(),
});