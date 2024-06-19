import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry Message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: "Verification email is sent successfully",
    };
  } catch (err) {
    console.log(`Error while sending the verification email`, err);
    return { success: false, message: "Failed to send the verification email" };
  }
}
