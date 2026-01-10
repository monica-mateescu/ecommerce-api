import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "#controllers";
import { validateBodyZod, validateObjectIdParam } from "#middleware";
import { productInputSchema } from "#schemas";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", validateObjectIdParam('id'), getProductById);
productRouter.post("/", validateBodyZod(productInputSchema), createProduct);
productRouter.put("/:id", validateObjectIdParam('id'), validateBodyZod(productInputSchema), updateProduct);
productRouter.delete("/:id", validateObjectIdParam('id'), deleteProduct);

export default productRouter;
