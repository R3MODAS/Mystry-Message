import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    BackendSignupSchemaType,
    BackendVerifyOtpSchemaType,
    LoginSchemaType
} from "@/schemas/auth";
import toast from "react-hot-toast";
import { sendotp, signup, verifyotp } from "@/services";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";

// Custom signup hook
export const useSignup = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignup = async (
        data: BackendSignupSchemaType,
        reset: () => void
    ) => {
        const toastId = toast.loading("Loading...");
        setIsSubmitting(true);
        const { username, email, password } = data;

        try {
            // Check if the signup response is successful or not
            const signupResponse = await signup({ username, email, password });

            if (!signupResponse.data.success) {
                throw new Error(signupResponse.data.message);
            } else {
                // Check if the sendotp response is successful or not
                const sendotpResponse = await sendotp(
                    signupResponse.data.data!._id
                );

                if (!sendotpResponse.data.success) {
                    throw new Error(sendotpResponse.data.message);
                }

                // Store the userid
                localStorage.setItem("userid", signupResponse.data.data!._id);

                // Show the toast message
                toast.success(signupResponse.data.message);

                // Move to verify page
                router.replace("/verify");
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Signup failed");
            }
        } finally {
            setIsSubmitting(false);
            toast.dismiss(toastId);
            reset();
        }
    };

    return { handleSignup, isSubmitting };
};

// Custom verify otp hook
export const useVerifyOtp = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleVerifyOTP = async (
        data: BackendVerifyOtpSchemaType,
        reset: () => void
    ) => {
        const toastId = toast.loading("Loading...");
        setIsSubmitting(true);

        try {
            // Check if the verify otp response is successful or not
            const verifyOtpResponse = await verifyotp(data);

            if (verifyOtpResponse.data.success) {
                // Show the toast message
                toast.success(verifyOtpResponse.data.message);

                // Remove the userid
                localStorage.removeItem("userid");

                // Move to login page
                router.replace("/login");
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log(err.response?.data);
                toast.error(err.response?.data?.message || "Signup failed");
            }
        } finally {
            setIsSubmitting(false);
            toast.dismiss(toastId);
            reset();
        }
    };

    return { handleVerifyOTP, isSubmitting };
};

export const useLogin = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (data: LoginSchemaType, reset: () => void) => {
        const toastId = toast.loading("Loading...");
        setIsSubmitting(true);
        const { identity, password } = data;

        try {
            // Login the user
            const result = await signIn("credentials", {
                redirect: false,
                identity,
                password
            });

            if (result?.error) {
                toast.error(result?.error);
            }

            if (result?.url) {
                toast.success("Logged in successfully");
                router.replace("/");
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err?.response?.data?.message);
            }
        } finally {
            setIsSubmitting(false);
            toast.dismiss(toastId);
            reset();
        }
    };

    return { handleLogin, isSubmitting };
};
