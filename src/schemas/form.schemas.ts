import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(7, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters long"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters long"),
});
