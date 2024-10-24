import { z } from "zod";
import { usernameSchema, emailSchema, passwordSchema } from "./common";

// Signup schema (base)
export const BaseSignupSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
});

// Signup schema (frontend)
export const FrontendSignupSchema = BaseSignupSchema.extend({
    confirmPassword: z
        .string()
        .trim()
        .min(8, "Confirm password must be atleast 8 characters")
        .max(100, "Confirm password must not exceed 100 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password does not match",
    path: ["confirmPassword"]
});
export type FrontendSignupType = z.infer<typeof FrontendSignupSchema>;

// Signup schema (backend)
export const BackendSignupSchema = BaseSignupSchema;
export type BackendSignupType = z.infer<typeof BackendSignupSchema>;
