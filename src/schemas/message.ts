import { z } from "zod";

// Message schema
export const ZodMessageSchema = z.object({
    content: z
        .string()
        .trim()
        .min(10, "Content must be at least 10 characters")
        .max(300, "Content must not exceed 300 characters")
});
export type MessageSchema = z.infer<typeof ZodMessageSchema>;

// Accept message schema
export const ZodAcceptMessageSchema = z.object({
    acceptMessages: z.boolean()
});
export type AcceptMessageSchema = z.infer<typeof ZodAcceptMessageSchema>;
