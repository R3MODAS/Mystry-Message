import { emailValidator, phoneValidator } from "@/utils/validators";
import { z } from "zod";

// Common schemas
export const usernameSchema = z
    .string()
    .trim()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

const emailSchema = z
    .string()
    .trim()
    .min(6, "Email must be at least 6 characters")
    .max(100, "Email must not exceed 100 characters")
    .email("Please provide a valid email address")
    .refine(
        (value) => emailValidator(value),
        "Please provide a valid email address"
    );

const passwordSchema = z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
        "Password must be at least 8 characters, includes at least one uppercase letter, one lowercase letter, one number, and one special character."
    );

// Signup schema
export const ZodSignupSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
});
export type SignupSchema = z.infer<typeof ZodSignupSchema>;

// Verify schema
export const ZodVerifyOtpSchema = z.object({
    otp: z
        .string()
        .trim()
        .min(1, "Otp must be atleast 1 digits")
        .max(6, "Otp must not exceed 6 digits")
        .length(6, "Otp must be of 6 digits")
});
export type VerifyOtpSchema = z.infer<typeof ZodVerifyOtpSchema>;

// Login schema
export const ZodLoginSchema = z.object({
    identifier: z
        .string()
        .trim()
        .refine(
            (value) => emailValidator(value) || phoneValidator(value),
            "Please provide a valid email or phone number"
        ),
    password: passwordSchema
});
export type LoginSchema = z.infer<typeof ZodLoginSchema>;
