import { z } from "zod";

// Message schema
export const MessageSchema = z.object({
    content: z
        .string()
        .trim()
        .min(10, "Content must be at least 10 characters")
        .max(300, "Content must not exceed 300 characters")
});
export type MessageSchemaType = z.infer<typeof MessageSchema>;

// Accept message schema
export const AcceptMessageSchema = z.object({
    acceptMessages: z.boolean()
});
export type AcceptMessageSchemaType = z.infer<typeof AcceptMessageSchema>;
