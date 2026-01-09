import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "#controllers";
import { validateBodyZod } from "#middleware";
import { productSchema } from "#schemas";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", validateBodyZod(productSchema), createProduct);
productRouter.put("/:id", validateBodyZod(productSchema), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;