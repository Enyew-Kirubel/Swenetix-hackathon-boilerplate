import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address"),

    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password cannot exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number is too short")
      .max(20, "Phone number is too long")
      .optional(),

    avatar: z.string().trim().url("Avatar must be a valid URL").optional(),
  }),
});
