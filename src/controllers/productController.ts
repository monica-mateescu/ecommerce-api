import type { RequestHandler } from "express";
import { Product } from "#models";
import { Category } from "#models";
import { productInputSchema, productSchema } from "#schemas";
import { z } from "zod/v4";

type ProductInputDTO = z.infer<typeof productInputSchema>;
type ProductDTO = z.infer<typeof productSchema>;

/**
 * Get all products, optional filter by categoryId
 */
export const getProducts: RequestHandler<{}, ProductDTO[]> = async (req, res) => {

    const filter: any = {};
    if (req.query.categoryId) filter.categoryId = req.query.categoryId;
    const products = await Product.find(filter);
    res.json(products);

};

/**
 * Get product by ID
 */
export const getProductById: RequestHandler<
  { id: string },
  ProductDTO
> = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new Error("Product not found", { cause: 404 });
  res.json(product);
};

/**
 * Create a new product
 */
export const createProduct: RequestHandler<{}, ProductDTO, ProductInputDTO> = async (req, res) => {
  const { categoryId } = req.body;

  //check
  const category = await Category.findById(categoryId);
  if (!category)
    throw new Error("Invalid categoryId: Category does not exist", {
      cause: 400,
    });

  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
};

/**
 * Update product
 */
export const updateProduct: RequestHandler<{ id: string }, ProductDTO, ProductInputDTO> = async (req, res) => {
  const { categoryId } = req.body;

  //check
  if (categoryId) {
    const category = await Category.findById(categoryId);
    if (!category)
      throw new Error("Invalid categoryId: Category does not exist", {
        cause: 400,
      });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedProduct) throw new Error("Product not found", { cause: 404 });
  res.json(updatedProduct);
};

/**
 * Delete product
 */
export const deleteProduct: RequestHandler<{ id: string }>  = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) throw new Error("Product not found", { cause: 404 })
    res.status(204).send();
};
