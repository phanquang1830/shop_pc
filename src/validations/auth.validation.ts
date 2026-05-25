import { z } from "zod";

export const registerSchema = z.object({
  // validate schema
  username: z.string().min(3, "Username must be at least 3 characters").max(30),

  email: z.email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Email invalid"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Tự tạo type từ schema
export type RegisterPayload = z.infer<typeof registerSchema>;

export type LoginPayload = z.infer<typeof loginSchema>;
