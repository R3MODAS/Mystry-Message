import { Resend } from "resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  // initialize the resend instance
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // send the verification code mail to the user
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry Message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    // return the response
    return {
      success: true,
      message: `Verification code for ${email} has been sent successfully`,
    };
  } catch (err) {
    console.error("Error while sending the verification email", err);
    return { success: false, message: "Failed to send verification email" };
  }
}
