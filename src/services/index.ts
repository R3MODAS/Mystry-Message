import { SignupSchemaType, VerifyOtpSchemaType } from "@/schemas/backend/auth";
import { ApiResponse, IUser } from "@/types/types";
import axios from "axios";

const signup = (data: SignupSchemaType) =>
    axios.post<ApiResponse<IUser>>(`/api/signup`, data);

const sendotp = (userid: string) =>
    axios.get<ApiResponse>(`/api/send-otp`, {
        params: { userid }
    });

const verifyotp = (data: VerifyOtpSchemaType) =>
    axios.put<ApiResponse>(`/api/verify-otp`, null, {
        params: data
    });

const checkuniqueusername = (username: string) =>
    axios.get<ApiResponse>(`/api/unique-username?username=${username}`);

export { signup, checkuniqueusername, sendotp, verifyotp };
