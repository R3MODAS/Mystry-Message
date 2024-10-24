import { z } from "zod";
import { otpSchema, useridSchema } from "./common";

// Verify otp schema (backend)
export const BackendVerifyOtpSchema = z.object({
    userid: useridSchema,
    otp: otpSchema
});
export type BackendVerifyOtpSchemaType = z.infer<typeof BackendVerifyOtpSchema>;
