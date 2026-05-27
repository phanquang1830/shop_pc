import bcrypt from "bcryptjs";

import prisma from "../config/prisma.js";
import { generateAccessToken } from "../utils/jwt.js";
import type {
  RegisterPayload,
  LoginPayload,
} from "../validations/auth.validation.js";

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterPayload) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },

    // lấy những gì mình muốn return
    select: {
      user_id: true,
      username: true,
      email: true,
      role: true,
      avatar: true,
      status: true,
      created_at: true,
    },
  });

  return user;
};

export const loginUser = async ({ email, password }: LoginPayload) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Email or Password is incorrect!");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Email or Password is incorrect!");
  }

  // Generate token
  const accessToken = generateAccessToken({
    user_id: user.user_id,
    role: user.role,
  });

  return {
    accessToken,
    user: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      status: user.status,
    },
  };
};
