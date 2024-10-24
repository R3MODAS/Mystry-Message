import { z } from "zod";
import { useridSchema } from "./common";

// Verify otp schema (backend)
export const SendOtpSchema = z.object({
    userid: useridSchema
});
export type SendOtpSchemaType = z.infer<typeof SendOtpSchema>;
