import type { Request, Response } from "express";

import {
  createProductSchema,
  productParamsSchema,
} from "../validations/product.validation.js";

import {
  createProduct,
  getProducts,
  getProductBySlug,
} from "../services/product.serrvice.js";

export const create = async (req: Request, res: Response) => {
  const validateData = createProductSchema.parse(req.body);

  const product = await createProduct(validateData);

  return res.status(201).json({
    message: "Create product success",
    product,
  });
};

export const fillAll = async (req: Request, res: Response) => {
  const product = await getProducts();

  return res.status(200).json({
    product,
  });
};

export const findBySlug = async (req: Request, res: Response) => {
  const { slug } = productParamsSchema.parse(req.params);

  if (!slug) {
    return res.status(400).json({
      message: "Slug is required!",
    });
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.status(200).json({
    product,
  });
};
