/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 */

import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "#controllers";
import { categoryInputSchema } from "#schemas";
import { validateBodyZod, validateObjectIdParam } from "#middleware";

const categoryRouter = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of categories
 */

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", validateObjectIdParam('id'), getCategoryById);
categoryRouter.post("/", validateBodyZod(categoryInputSchema), createCategory);
categoryRouter.put("/:id", validateObjectIdParam('id'), validateBodyZod(categoryInputSchema), updateCategory);
categoryRouter.delete("/:id", validateObjectIdParam('id'), deleteCategory);

export default categoryRouter;
