import type { Request, Response } from "express";

import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  const validatedData = registerSchema.parse(req.body);

  const user = await registerUser(validatedData);

  res.status(201).json({
    message: "Register success",
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);

  const user = await loginUser(validatedData);

  res.status(200).json({
    message: "Login success",
    user,
  });
};
