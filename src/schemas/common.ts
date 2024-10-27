import { z } from "zod";
import { emailValidator } from "@/utils/validators";
import { Types } from "mongoose";

// ==================== Common schema =====================
const usernameSchema = z
    .string()
    .trim()
    .min(5, "Username must be at least 5 characters")
    .max(8, "Username must not exceed 8 characters")
    .regex(
        /^[a-z0-9]+$/,
        "Username can only contain lowercase letters and numbers"
    )
    .transform((value) => value.toLowerCase());

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

const useridSchema = z
    .string()
    .trim()
    .refine(
        (value) => Types.ObjectId.isValid(value),
        "Please provide a valid user id"
    );

const otpSchema = z
    .string()
    .trim()
    .min(1, "Otp must be at least 1 digits")
    .max(6, "Otp must not exceed 6 digits")
    .length(6, "Otp must be of 6 digits");

export { usernameSchema, emailSchema, passwordSchema, useridSchema, otpSchema };
