import { z } from "zod/v4";
import { Types } from "mongoose";

export const categoryInputSchema = z.strictObject({
  name: z.string({ error: "name must be a string" }).min(2, {
    message: "name is required and must be at least 2 characters long",
  }),
});

export const categorySchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...categoryInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number(),
});
