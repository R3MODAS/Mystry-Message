import { z } from "zod";
import { usernameValidation } from "./signUpSchema";

export const verifyOtpSchema = z.object({
    username: usernameValidation,
    otp: z
        .number({ required_error: "Please provide a otp" })
        .refine(
            (val) => val.toString().length === 6,
            "Otp must be of 6 digits"
        ),
});

export type verifyOtpSchemaType = z.infer<typeof verifyOtpSchema>;
