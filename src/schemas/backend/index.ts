import { z } from "zod";
import {
    emailSchema,
    otpSchema,
    passwordSchema,
    useridSchema,
    usernameSchema
} from "@/schemas/common";

// Signup schema
export const SignupSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
});
export type SignupSchemaType = z.infer<typeof SignupSchema>;

// Send otp schema
export const SendOtpSchema = z.object({
    userid: useridSchema
});
export type SendOtpSchemaType = z.infer<typeof SendOtpSchema>;

// Verify otp schema
export const VerifyOtpSchema = z.object({
    userid: useridSchema,
    otp: otpSchema
});
export type VerifyOtpSchemaType = z.infer<typeof VerifyOtpSchema>;

// Unique username schema
export const UniqueUsernameSchema = z.object({
    username: usernameSchema
});
export type UniqueUsernameSchemaType = z.infer<typeof UniqueUsernameSchema>;
