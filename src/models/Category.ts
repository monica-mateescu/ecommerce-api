import { Schema, model, type Document } from "mongoose";

/**
 * Category document interface
 */
export interface CategoryDocument extends Document {
  name: string;
}

/**
 * Category schema definition
 */
const categorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret:any) {
        // Replace _id with id
        ret.id = ret._id;
        delete ret._id;

        // Remove version key
        delete ret.__v;

        return ret;
      },
    },
  }
);

/**
 * Category model
 */
export const Category = model<CategoryDocument>("Category", categorySchema);