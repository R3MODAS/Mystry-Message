import { z } from "zod";

export const signinSchema = z.object({
    identify: z.string().trim(),
    password: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" })
        .max(100, { message: "Password must not exceed 100 characters" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            }
        )
        .trim(),
});
