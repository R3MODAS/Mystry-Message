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
import { useSignup, useUniqueUsername } from "@/hooks";
import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { SignupSchema, SignupSchemaType } from "@/schemas/frontend";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    const { handleSignup, isSubmitting } = useSignup();
    const {
        handleCheckUniqueUsername,
        usernameMessage,
        setUsernameMessage,
        isCheckingUsername,
        isUsernameValid,
        setIsUsernameValid
    } = useUniqueUsername();

    const debounced = useDebounceCallback(handleCheckUniqueUsername, 500);

    const form = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onChange"
    });
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = form;

    const onSubmit = async (data: SignupSchemaType) => {
        await handleSignup(data, reset);
        setUsernameMessage("");
        setIsUsernameValid(null);
    };

    return (
        <div className="min-h-screen bg-color-1 text-white flex flex-col items-center justify-center py-20 px-5">
            <div className="w-full max-w-md">
                {/* Form top */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mt-6 mb-2">
                        Create an account
                    </h1>
                    <p className="text-color-4 text-sm sm:text-base">
                        Start your journey with anonymous messaging
                    </p>
                </div>

                {/* Signup form */}
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={cn({
                                            "text-green-500":
                                                !isCheckingUsername &&
                                                isUsernameValid === true,
                                            "text-red-500":
                                                !isCheckingUsername &&
                                                isUsernameValid === false
                                        })}
                                    >
                                        Username
                                    </FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your username"
                                                autoComplete="on"
                                                {...field}
                                                onChange={async (e) => {
                                                    field.onChange(e);
                                                    const username =
                                                        e.target.value.trim();
                                                    debounced(username);
                                                }}
                                                className={cn(
                                                    "bg-white/5 border-color-2/20 text-white h-12",
                                                    {
                                                        "border-green-500 focus-within:ring-green-500":
                                                            !isCheckingUsername &&
                                                            usernameMessage.includes(
                                                                "unique"
                                                            ),
                                                        "border-red-500 focus-visible:ring-red-500":
                                                            (!isCheckingUsername &&
                                                                usernameMessage.includes(
                                                                    "taken"
                                                                )) ||
                                                            errors.username
                                                    }
                                                )}
                                            />
                                        </FormControl>

                                        {isCheckingUsername && (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                                <LoaderCircle
                                                    size={20}
                                                    className="animate-spin"
                                                />
                                            </div>
                                        )}

                                        {!isCheckingUsername &&
                                            (usernameMessage ||
                                                errors.username?.message) && (
                                                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                                    <ToolTipMessage
                                                        size={20}
                                                        message={
                                                            usernameMessage ||
                                                            (errors.username
                                                                ?.message as string)
                                                        }
                                                        success={
                                                            isUsernameValid
                                                                ? true
                                                                : false
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
                            name="email"
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
                                                    errors.email &&
                                                        "border-red-500 focus-visible:ring-red-500"
                                                )}
                                            />
                                        </FormControl>

                                        {errors.email && (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                                <ToolTipMessage
                                                    size={20}
                                                    message={
                                                        errors.email
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
                                    <FormLabel>Password</FormLabel>
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
                        <FormField
                            control={control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirm your password"
                                                autoComplete="on"
                                                {...field}
                                                className={cn(
                                                    "bg-white/5 border-color-2/20 text-white h-12",
                                                    errors.confirmPassword &&
                                                        "border-red-500 focus-visible:ring-red-500"
                                                )}
                                            />
                                        </FormControl>

                                        {errors.confirmPassword && (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-11">
                                                <ToolTipMessage
                                                    size={20}
                                                    message={
                                                        errors.confirmPassword
                                                            ?.message as string
                                                    }
                                                />
                                            </div>
                                        )}

                                        <div
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                                        >
                                            {showConfirmPassword ? (
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
                            isValid={
                                isValid &&
                                !isCheckingUsername &&
                                isUsernameValid === true
                            }
                            isSubmitting={isSubmitting}
                            text="Sign up"
                        />
                    </form>
                </Form>

                {/* Form bottom */}
                <p className="mt-6 text-center text-color-4 text-sm">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-color-3 hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
