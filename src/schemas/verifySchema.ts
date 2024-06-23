import { z } from "zod";

export const verifySchema = z.object({
  code: z
    .string({ required_error: "Verification code is required" })
    .length(6, "Verification code must be of 6 digits"),
});
