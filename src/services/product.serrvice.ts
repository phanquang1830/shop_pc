import prisma from "../config/prisma.js";

import type { CreateProductPayload } from "../validations/product.validation.js";

export const createProduct = async (payload: CreateProductPayload) => {
  const product = await prisma.product.create({
    data: {
      ...payload,

      descriptions: payload.descriptions ?? null,
      thumbnail: payload.thumbnail ?? null, //?? nghĩa là nếu bên trái null hoặc undifined thì lấy bên phải, ngược lại lấy a
    },
  });

  return product;
};

export const getProducts = async () => {
  const product = await prisma.product.findMany({
    where: {
      deleted_at: null, // chỉ lấy product chưa bị xóa mềm
    },

    include: {
      category: true,
      brand: true,
      images: true,
    },

    orderBy: {
      created_at: "desc", // sắp xếp theo thời gian tạo
    },
  });

  return product;
};

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },

    include: {
      category: true,
      brand: true,
      images: true,
    },
  });

  return product;
};
