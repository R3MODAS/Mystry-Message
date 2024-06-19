import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be atleast 6 characters" })
    .max(20, { message: "Password must not exceed 20 characters" }),
});
