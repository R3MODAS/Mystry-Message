import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

// Login schema
export const LoginSchema = z.object({
    identifier: emailSchema,
    password: passwordSchema
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
