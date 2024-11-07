import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { SignupSchemaType, VerifyOtpSchemaType } from "@/schemas/backend";
import { ContactUsSchemaType, LoginSchemaType } from "@/schemas/frontend";
import { ApiResponse, IUser } from "@/types/types";

// Custom signup hook
export const useSignup = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSignup = async (data: SignupSchemaType, reset: () => void) => {
        const toastId = toast.loading("Loading...");
        setIsSubmitting(true);

        try {
            const signupResponse = await axios.post<ApiResponse<IUser>>(
                `/api/auth/signup`,
                data
            );
            if (!signupResponse.data.success) {
                throw new Error(signupResponse.data.message);
            } else {
                const sendotpResponse = await axios.get<ApiResponse>(
                    `/api/auth/send-otp`,
                    {
                        params: { userid: signupResponse.data.data!._id }
                    }
                );

                if (!sendotpResponse.data.success) {
                    throw new Error(sendotpResponse.data.message);
                }

                localStorage.setItem("userid", signupResponse.data.data!._id);
                toast.success(signupResponse.data.message);
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
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleVerifyOTP = async (
        data: VerifyOtpSchemaType,
        reset: () => void
    ) => {
        const toastId = toast.loading("Loading...");
        setIsSubmitting(true);

        try {
            const verifyOtpResponse = await axios.put<ApiResponse>(
                `/api/auth/verify-otp`,
                null,
                {
                    params: data
                }
            );

            if (verifyOtpResponse.data.success) {
                toast.success(verifyOtpResponse.data.message);
                localStorage.removeItem("userid");
                router.replace("/login");
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

    return { handleVerifyOTP, isSubmitting };
};

// Custom login hook
export const useLogin = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleLogin = async (data: LoginSchemaType, reset: () => void) => {
        const toastId = toast.loading("Loading...");
        setIsSubmitting(true);
        const { identity, password } = data;

        try {
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

// Custom unique username hook
export const useUniqueUsername = () => {
    const [usernameMessage, setUsernameMessage] = useState<string>("");
    const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(
        null
    );
    const [isCheckingUsername, setIsCheckingUsername] =
        useState<boolean>(false);

    const handleCheckUniqueUsername = useCallback(async (username: string) => {
        if (username.length < 6) {
            setUsernameMessage("");
            setIsCheckingUsername(false);
            setIsUsernameValid(null);
            return;
        }

        setIsCheckingUsername(true);
        setIsUsernameValid(null);
        setUsernameMessage("");

        try {
            const uniqueUsernameResponse = await axios.get<ApiResponse>(
                `/api/auth/unique-username?username=${username}`
            );
            if (uniqueUsernameResponse.data.success) {
                setUsernameMessage(uniqueUsernameResponse.data.message);
                setIsUsernameValid(true);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                setUsernameMessage(
                    err.response?.data.message || "Failed to check username"
                );
                setIsUsernameValid(false);
            }
        } finally {
            setIsCheckingUsername(false);
        }
    }, []);

    return {
        handleCheckUniqueUsername,
        usernameMessage,
        setUsernameMessage,
        isUsernameValid,
        setIsUsernameValid,
        isCheckingUsername
    };
};

// Custom contact us hook
export const useContactUs = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleContactUs = async (
        data: ContactUsSchemaType,
        reset: () => void
    ) => {
        const toastId = toast.loading("Loading...");
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>(
                `/api/contact-us`,
                data
            );
            if (response.data.success) {
                toast.success(response.data.message);
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

    return { isSubmitting, handleContactUs };
};
