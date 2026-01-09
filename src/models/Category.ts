import { Schema, model } from "mongoose";

/**
 * Category schema definition
 */
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
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
export const Category = model("Category", categorySchema);
export default Category;
