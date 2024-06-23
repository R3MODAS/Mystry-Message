import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters" })
    .max(20, { message: "Password must not exceed 20 characters" }),
});
