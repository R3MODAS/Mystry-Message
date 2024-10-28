"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import SubmitButton from "@/components/common/SubmitButton";
import {
    FrontendVerifyOtpSchema,
    FrontendVerifyOtpSchemaType
} from "@/schemas/auth";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVerifyOtp } from "@/hooks/auth";

const VerifyOtpPage = () => {
    // Verify otp logic
    const { handleVerifyOTP, isSubmitting } = useVerifyOtp();

    // Verify otp form implementation
    const form = useForm<FrontendVerifyOtpSchemaType>({
        resolver: zodResolver(FrontendVerifyOtpSchema),
        defaultValues: {
            otp: ""
        },
        mode: "onChange"
    });
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = form;

    // Verify otp form submission
    const onVerifyOtp = async (data: FrontendVerifyOtpSchemaType) => {
        const verifyData = {
            otp: data.otp,
            userid: localStorage.getItem("userid")!
        };

        await handleVerifyOTP(verifyData, reset);
    };

    return (
        <div className="min-h-screen bg-color-1 text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Form heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mt-6 mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-color-4">
                        Enter the 6-digit code sent to your email
                    </p>
                </div>

                {/* Verify otp form */}
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onVerifyOtp)}
                        className="space-y-6"
                    >
                        <FormField
                            control={control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        One-Time Password (OTP)
                                    </FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup className="gap-3 justify-center">
                                                <InputOTPSlot
                                                    index={0}
                                                    className={cn(
                                                        "bg-white/5 text-base !rounded-lg border border-color-2/20 text-white w-16 h-16",
                                                        errors.otp &&
                                                            "border-red-500 focus-visible:ring-red-500"
                                                    )}
                                                />
                                                <InputOTPSlot
                                                    index={1}
                                                    className={cn(
                                                        "bg-white/5 text-base !rounded-lg border border-color-2/20 text-white w-16 h-16",
                                                        errors.otp &&
                                                            "border-red-500 focus-visible:ring-red-500"
                                                    )}
                                                />
                                                <InputOTPSlot
                                                    index={2}
                                                    className={cn(
                                                        "bg-white/5 text-base !rounded-lg border border-color-2/20 text-white w-16 h-16",
                                                        errors.otp &&
                                                            "border-red-500 focus-visible:ring-red-500"
                                                    )}
                                                />
                                                <InputOTPSlot
                                                    index={3}
                                                    className={cn(
                                                        "bg-white/5 text-base !rounded-lg border border-color-2/20 text-white w-16 h-16",
                                                        errors.otp &&
                                                            "border-red-500 focus-visible:ring-red-500"
                                                    )}
                                                />
                                                <InputOTPSlot
                                                    index={4}
                                                    className={cn(
                                                        "bg-white/5 text-base !rounded-lg border border-color-2/20 text-white w-16 h-16",
                                                        errors.otp &&
                                                            "border-red-500 focus-visible:ring-red-500"
                                                    )}
                                                />
                                                <InputOTPSlot
                                                    index={5}
                                                    className={cn(
                                                        "bg-white/5 text-base !rounded-lg border border-color-2/20 text-white w-16 h-16",
                                                        errors.otp &&
                                                            "border-red-500 focus-visible:ring-red-500"
                                                    )}
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <SubmitButton
                            isValid={isValid}
                            isSubmitting={isSubmitting}
                            text="Verify OTP"
                        />
                    </form>
                </Form>

                {/* Form bottom */}
                <div className="mt-6 text-center text-color-4">
                    <p className="mb-3">
                        Didn&apos;t receive the code?{" "}
                        <Button
                            variant="link"
                            className="text-color-3 p-0 h-auto font-normal hover:underline text-base"
                        >
                            Resend OTP
                        </Button>
                    </p>
                    <Link
                        href="/signup"
                        className="inline-flex items-center text-color-3 hover:underline"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpPage;
