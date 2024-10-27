"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/common/SubmitButton";
import { useSignup } from "@/hooks/auth";
import { FrontendSignupSchema, FrontendSignupSchemaType } from "@/schemas/auth";
import { cn } from "@/lib/utils";

const SignupPage = () => {
    // Signup logic
    const { handleSignup, isSubmitting } = useSignup();

    // Signup form implementation
    const form = useForm<FrontendSignupSchemaType>({
        resolver: zodResolver(FrontendSignupSchema),
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

    // Signup form submission
    const onSignup = async (data: FrontendSignupSchemaType) => {
        await handleSignup(data, reset);
    };

    return (
        <div className="min-h-screen bg-color-1 text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Form heading */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mt-6 mb-2">
                        Create an account
                    </h1>
                    <p className="text-color-4">
                        Start your journey with anonymous messaging
                    </p>
                </div>

                {/* Signup form */}
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSignup)}
                        className="space-y-8"
                    >
                        <FormField
                            control={control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your username"
                                            autoComplete="on"
                                            {...field}
                                            className={cn(
                                                "bg-white/5 border-color-2/20 text-white h-12",
                                                errors.username &&
                                                    "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SubmitButton
                            isValid={isValid}
                            isSubmitting={isSubmitting}
                            text="Sign up"
                        />
                    </form>
                </Form>

                {/* Form bottom */}
                <p className="mt-6 text-center text-color-4">
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
