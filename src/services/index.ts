import {
    BackendSignupSchemaType,
    BackendVerifyOtpSchemaType
} from "@/schemas/auth";
import { ApiResponse, IUser } from "@/types/types";
import axios from "axios";

const signup = (data: BackendSignupSchemaType) =>
    axios.post<ApiResponse<IUser>>("/api/signup", data);

const sendotp = (userid: string) =>
    axios.get<ApiResponse>("/api/send-otp", {
        params: { userid }
    });

const verifyotp = (data: BackendVerifyOtpSchemaType) =>
    axios.put<ApiResponse>("/api/verify-otp", null, {
        params: data
    });

export { signup, sendotp, verifyotp };
