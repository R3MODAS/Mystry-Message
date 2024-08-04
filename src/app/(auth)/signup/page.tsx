"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signUpSchema, signUpSchemaType } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debounced = useDebounceCallback(setUsername, 300);

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<signUpSchemaType>({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        const checkUniqueUsername = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage("");
                try {
                    const response = await axios.get(
                        `/api/unique-username?username=${username}`
                    );
                    console.log(response);
                    setUsernameMessage(response.data.message);
                } catch (err) {
                    const axiosError = err as AxiosError<ApiResponse>;
                    console.log(axiosError);
                    setUsernameMessage(
                        axiosError.response?.data.message ??
                            "Error while checking username"
                    );
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        };

        checkUniqueUsername();
    }, [username]);

    const onSubmit = async (data: signUpSchemaType) => {
        setIsSubmitting(true);
        const { username, email, password } = data;
        const signUpData = { username, email, password };

        try {
            const response = await axios.post<ApiResponse>(
                `/api/signup`,
                signUpData
            );
            toast({
                title: "Success",
                description: response.data.message,
            });
            router.replace(`/verify/${username}`);
        } catch (err) {
            const axiosError = err as AxiosError<ApiResponse>;
            console.error(axiosError.response?.data.message);
            const errMsg = axiosError.response?.data.message;
            ("There was a problem with your signup. Please try again.");
            toast({
                title: "Signup failed",
                description: errMsg,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Join True Feedback
                    </h1>
                    <p className="mb-4">
                        Sign up to start your anonymous adventure
                    </p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-7"
                    >
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Username"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                debounced(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    {isCheckingUsername && (
                                        <Loader2 className="animate-spin" />
                                    )}

                                    <p
                                        className={`text-sm ${
                                            usernameMessage ===
                                            "Username is unique"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {usernameMessage}
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Signup"
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Already a member?{" "}
                        <Link href="/signin" className="text-black font-bold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
