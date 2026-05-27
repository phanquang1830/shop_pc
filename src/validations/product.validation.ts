import { z } from "zod";

export const createProductSchema = z.object({
  category_id: z.number(),
  brand_id: z.number(),
  product_name: z.string().min(3).max(225),
  slug: z.string().min(3).max(225),
  descriptions: z.string().optional(), //.optional: file này có thể có hoặc không
  price: z.number().positive(), // .positive: phải lớn hơn 0
  stock: z.number().min(0),
  thumbnail: z.string().optional(),
});

export type CreateProductPayload = z.infer<typeof createProductSchema>;

export const productParamsSchema = z.object({
  slug: z.string().optional(),
});
