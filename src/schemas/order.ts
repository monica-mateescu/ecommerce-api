import { z } from 'zod/v4';
import { isValidObjectId, Types } from 'mongoose';

export const orderInputSchema = z.strictObject({
  userId: z
    .string()
    .refine(val => isValidObjectId(val), { error: 'Not a valid ObjectId' })
    .transform(val => new Types.ObjectId(val)),
  products: z.array(
    z.object({
      productId: z
        .string()
        .refine(val => isValidObjectId(val), {
          error: 'Not a valid ObjectId'
        })
        .transform(val => new Types.ObjectId(val)),
      quantity: z
        .number({ error: 'Quantity must be a number' })
        .min(1, { message: 'Quantity is required and Quantity be at least 1' })
    })
  )
});

export const orderSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...orderInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number()
});
