import type { Request, Response, NextFunction, RequestHandler } from "express";
import { Category } from "#models";
import type z from "zod/v4";
import type { categoryInputSchema, categorySchema } from "#schemas";

type CategoryInputDTO = z.infer<typeof categoryInputSchema>;
type CategoryDTO = z.infer<typeof categorySchema>;

/**
 * Get all categories
 */
export const getCategories: RequestHandler<{}, CategoryDTO[]> = async (
  req,
  res
) => {
  const categories = await Category.find();
  res.json(categories);
};

/**
 * Get category by ID
 */
export const getCategoryById: RequestHandler<
  { id: string },
  CategoryDTO
> = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new Error("Category not found", { cause: 404 });
  res.json(category);
};

/**
 * Create a new category
 */
export const createCategory: RequestHandler<
  {},
  CategoryDTO,
  CategoryInputDTO
> = async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);
};

/**
 * Update category
 */
export const updateCategory: RequestHandler<
  { id: string },
  CategoryDTO,
  CategoryInputDTO
> = async (req, res) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedCategory) throw new Error("Category not found", { cause: 404 });
  res.json(updatedCategory);
};

/**
 * Delete category
 */
export const deleteCategory: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);
  if (!deletedCategory)
    if (!deletedCategory) throw new Error("Category not found", { cause: 404 });
  res.status(204).send();
};
