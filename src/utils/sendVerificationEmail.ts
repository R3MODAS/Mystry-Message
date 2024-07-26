import { Resend } from "resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    username: string,
    email: string,
    otp: number
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "Mystry Message | Verification Code",
            react: VerificationEmail(username, otp),
        });

        return {
            success: true,
            message: "Verification email is sent successfully",
        };
    } catch (err) {
        const errMsg = (err as Error).message;
        return { success: false, message: errMsg };
    }
}
