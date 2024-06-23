import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // send the email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry message | Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    // return the response
    return { success: true, message: "Verification email sent successfully" };
  } catch (err) {
    console.error("Error while sending the verification email", err);
    return {
      success: false,
      message: "Failed to send the verification email",
    };
  }
}
