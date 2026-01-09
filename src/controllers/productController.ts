import type { Request, Response, NextFunction } from "express";
import { Product } from "#models";

/**
 * Get all products, optional filter by categoryId
 */
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: any = {};
    if (req.query.categoryId) filter.categoryId = req.query.categoryId;
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

/**
 * Get product by ID
 */
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new product
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

/**
 * Update product
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete product
 */
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};