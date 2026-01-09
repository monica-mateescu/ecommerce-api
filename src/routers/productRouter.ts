import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "#controllers";
import { validateBodyZod } from "#middleware";
import { productInputSchema } from "#schemas";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", validateBodyZod(productInputSchema), createProduct);
productRouter.put("/:id", validateBodyZod(productInputSchema), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;