import { Resend } from "resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    username: string,
    email: string,
    otp: number
): Promise<ApiResponse> {
    try {
        // send the mail
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "Mystry Message | Verification Code",
            react: VerificationEmail(username, otp),
        });

        // return the response
        return {
            success: true,
            message: "Verification email is sent successfully",
        };
    } catch (err: unknown) {
        const errMsg = (err as Error).message;
        console.error(errMsg);
        return {
            success: false,
            message: "Failed to send the verification email",
        };
    }
}
