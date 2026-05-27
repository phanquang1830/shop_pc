import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { verifyAccessToken } from "../utils/jwt.js";

// check token + decode user
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  // check authorization header
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access token required!",
    });
  }

  const token = authorization.split(" ")[1];

  // token có thể undefined
  if (!token) {
    return res.status(401).json({
      message: "Access token required!",
    });
  }

  try {
    const decoded = verifyAccessToken(token);

    // đã khai báo ở express.d.ts
    // nên TypeScript hiểu req.user
    req.user = decoded;

    next();
  } catch (error) {
    // token hết hạn
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Access token expired!",
      });
    }

    // token sai
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid access token!",
      });
    }

    // lỗi server khác
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
