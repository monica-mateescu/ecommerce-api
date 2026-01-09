import { Schema, model } from "mongoose";


const productSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Product name is required"],
      trim: true,
    },
    desctiption: {
      type: String,
      require: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      require: [true, "Price is required"],
      min: 0,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "CategoryId is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = model('Product', productSchema);
export default Product;
