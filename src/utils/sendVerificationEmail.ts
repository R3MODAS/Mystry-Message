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
            message: "Verification Email is sent successfully !!!",
        };
    } catch (err) {
        console.error("Error while sending verification email", err);
        return {
            success: false,
            message:
                "Something went wrong while sending the verification email",
        };
    }
}
