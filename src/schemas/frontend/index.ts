import { z } from "zod";
import {
    emailSchema,
    otpSchema,
    passwordSchema,
    usernameSchema
} from "@/schemas/common";

// Signup Schema
export const SignupSchema = z
    .object({
        username: usernameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z
            .string()
            .trim()
            .min(8, "Confirm password must be atleast 8 characters")
            .max(100, "Confirm password must not exceed 100 characters")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password and confirm password does not match",
        path: ["confirmPassword"]
    });
export type SignupSchemaType = z.infer<typeof SignupSchema>;

// Verify OTP schema
export const VerifyOtpSchema = z.object({
    otp: otpSchema
});
export type VerifyOtpSchemaType = z.infer<typeof VerifyOtpSchema>;

// Login schema
export const LoginSchema = z.object({
    identity: emailSchema,
    password: passwordSchema
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

// Contact us schema
export const ContactUsSchema = z.object({
    name: z
        .string()
        .trim()
        .min(6, "Name must be at least 6 characters")
        .max(100, "Name must not exceed 100 characters"),
    email: emailSchema,
    message: z
        .string()
        .trim()
        .min(1, "Message must be at least 1 character")
        .max(300, "Name must not exceed 300 characters")
});
export type ContactUsSchemaType = z.infer<typeof ContactUsSchema>;
