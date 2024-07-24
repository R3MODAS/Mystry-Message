import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(6, { message: "Username must be atleast 6 characters" })
    .max(20, { message: "Username must not exceed 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username must not contain special characters",
    })
    .trim()
    .refine((val) => val === val.toLowerCase(), {
        message: "Username must be lowercase",
    });

export const signupSchema = z.object({
    username: usernameValidation,
    name: z
        .string()
        .min(6, { message: "Name must be atleast 6 characters" })
        .max(100, { message: "Name must not exceed 100 characters" })
        .trim(),
    email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .trim(),
    password: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" })
        .max(100, { message: "Password must not exceed 100 characters" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            }
        )
        .trim(),
});
