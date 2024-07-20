import { Resend } from "resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (
  username: string,
  email: string,
  verifyOtp: string
): Promise<ApiResponse> => {
  try {
    // send the email
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Mystry Message | Verification Code",
      react: VerificationEmail(username, verifyOtp),
    });

    // return the response
    return {
      success: true,
      message: "Verification email has been sent successfully",
    };
  } catch (err) {
    const errMsg = (err as Error).message;
    return { success: false, message: errMsg };
  }
};

export default sendVerificationEmail;
