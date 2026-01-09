import { z } from "zod/v4";
import { Types } from "mongoose";

// 1️⃣ Input schema — for POST/PUT req
export const productInputSchema = z.strictObject({
  name: z.string({ error: "ProductName must be a string" }).min(1, {message: "Product name is required"}),
  description: z.string({ error: "Description must be a string" }).min(1, {message: "Description is required"}),
  price: z.number({ error: "Price must be a number" }).min(0, {message: "Price must be a positive number"}),
  categoryId: z.instanceof(Types.ObjectId)
  // categoryId: z.string().min(1, {message: "CategoryId is required"}),
});

// 2️⃣ Full schema — for DB data
export const productSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...productInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number(),
});

