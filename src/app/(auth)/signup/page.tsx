"use client";

import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpSchemaType } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";

const Signup = () => {
    const [username, setUsername] = useState<string>("");
    const [usernameResponse, setUsernameResponse] = useState<string>("");
    const [isCheckingUsername, setIsCheckingUsername] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const debouncedUsername = useDebounceValue(username, 300);
    const { toast } = useToast();
    const router = useRouter();

    // react hook form with zod
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        const checkUsername = async () => {
            if (debouncedUsername) {
                setIsCheckingUsername(true);
                setUsernameResponse("");
            }
            try {
                const response = await axios.get(
                    `/api/check-username?username=${debouncedUsername}`
                );
                console.log(response);
                setUsernameResponse(response.data?.message);
            } catch (err) {
                const axiosError = err as AxiosError<ApiResponse>;
                console.log(axiosError);
                setUsernameResponse(
                    axiosError.response?.data.message ??
                        "Error while checking username"
                );
            } finally {
                setIsCheckingUsername(false);
            }
        };
        checkUsername();
    }, [debouncedUsername]);

    const onSubmit = async (data: signUpSchemaType) => {
        setIsSubmitting(true)
        try {
            
        } catch (err) {
            
        }
    };

    return <div>Signup</div>;
};

export default Signup;
