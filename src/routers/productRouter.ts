/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         categoryId:
 *           type: string
 */

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

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productRouter.get("/", getProducts);
productRouter.get("/:id", validateObjectIdParam('id'), getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Created product
 */

productRouter.post("/", validateBodyZod(productInputSchema), createProduct);
productRouter.put("/:id", validateObjectIdParam('id'), validateBodyZod(productInputSchema), updateProduct);
productRouter.delete("/:id", validateObjectIdParam('id'), deleteProduct);

export default productRouter;
