import { RESEND_API_KEY } from "@/config";
import VerificationEmail from "@/templates/verificationEmail";
import { ApiResponse } from "@/types/types";
import { Resend } from "resend";

interface sendMailProps {
    email: string;
    username: string;
    otp: string;
}

const resend = new Resend(RESEND_API_KEY);

export const sendMail = async ({
    email,
    username,
    otp
}: sendMailProps): Promise<ApiResponse> => {
    try {
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "Mystry Message | Verification Code",
            react: VerificationEmail({ username, otp })
        });

        return {
            success: true,
            message: "Verification code has been sent successfully"
        };
    } catch (err) {
        console.error(
            "Something went wrong while sending verification email",
            err
        );

        return {
            success: false,
            message: "Something went wrong while sending verification email"
        };
    }
};
