import { z } from "zod";

export const usernameValidation = z
    .string({
        required_error: "Please provide an username",
    })
    .trim()
    .min(6, "Username must be atleast 6 characters")
    .max(10, "Username must not exceed 10 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z
        .string({
            required_error: "Please provide an email",
        })
        .email("Please provide a valid email")
        .trim(),
    password: z
        .string({ required_error: "Please provide a password" })
        .trim()
        .min(6, "Password must be atleast 8 characters")
        .max(20, "Password must not exceed 20 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        ),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
