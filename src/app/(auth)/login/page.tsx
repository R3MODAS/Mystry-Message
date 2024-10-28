"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ToolTipMessage from "@/components/common/ToolTipMessage";
import SubmitButton from "@/components/common/SubmitButton";
import { useLogin } from "@/hooks/auth";
import { LoginSchema, LoginSchemaType } from "@/schemas/auth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    // Login logic
    const { handleLogin, isSubmitting } = useLogin();

    // Login form implementation
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            identity: "",
            password: ""
        },
        mode: "onChange"
    });
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = form;

    // Login form submission
    const onLogin = async (data: LoginSchemaType) => {
        await handleLogin(data, reset);
    };

    return (
        <div className="min-h-screen bg-color-1 text-white flex flex-col items-center justify-center py-20">
            <div className="w-full max-w-md">
                {/* Form top */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mt-6 mb-2">
                        Login to your account
                    </h1>
                    <p className="text-color-4">
                        Kickstart with anonymous messaging quickly
                    </p>
                </div>

                {/* Signup form */}
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onLogin)}
                        className="space-y-5"
                    >
                        <FormField
                            control={control}
                            name="identity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                autoComplete="on"
                                                {...field}
                                                className={cn(
                                                    "bg-white/5 border-color-2/20 text-white h-12",
                                                    errors.identity &&
                                                        "border-red-500 focus-visible:ring-red-500"
                                                )}
                                            />
                                        </FormControl>

                                        {errors.identity && (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                                <ToolTipMessage
                                                    size={20}
                                                    message={
                                                        errors.identity
                                                            ?.message as string
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                        <Link
                                            href="/forgot-password"
                                            className="font-medium text-sm underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter your password"
                                                autoComplete="on"
                                                {...field}
                                                className={cn(
                                                    "bg-white/5 border-color-2/20 text-white h-12",
                                                    errors.password &&
                                                        "border-red-500 focus-visible:ring-red-500"
                                                )}
                                            />
                                        </FormControl>

                                        {errors.password && (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-11">
                                                <ToolTipMessage
                                                    size={20}
                                                    message={
                                                        errors.password
                                                            ?.message as string
                                                    }
                                                />
                                            </div>
                                        )}

                                        <div
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <EyeIcon size={18} />
                                            ) : (
                                                <EyeOffIcon size={18} />
                                            )}
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <SubmitButton
                            isValid={isValid}
                            isSubmitting={isSubmitting}
                            text="Log In"
                        />
                    </form>
                </Form>

                {/* Form bottom */}
                <p className="mt-6 text-center text-color-4 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-color-3 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
