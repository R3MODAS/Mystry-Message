"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/common/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContactUsSchema, ContactUsSchemaType } from "@/schemas/frontend";
import ToolTipMessage from "@/components/common/ToolTipMessage";
import { cn } from "@/lib/utils";
import { useContactUs } from "@/hooks";

const ContactPage = () => {
    const form = useForm<ContactUsSchemaType>({
        resolver: zodResolver(ContactUsSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        },
        mode: "onChange"
    });
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = form;

    const { isSubmitting, handleContactUs } = useContactUs();

    const onSubmit = async (data: ContactUsSchemaType) => {
        await handleContactUs(data, reset);
    };

    return (
        <div className="bg-color-1 text-color-4 py-16">
            <main className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-color-2 to-color-3 text-transparent bg-clip-text">
                    Contact us
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                            Get in Touch
                        </h2>
                        <p className="mb-6">
                            Have questions, suggestions, or just want to say
                            hello? We&apos;d love to hear from you! Fill out the
                            form, and we&apos;ll get back to you as soon as
                            possible.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Mail className="h-6 w-6 text-color-2 mr-3" />
                                <span>support@mystrymessage.com</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-6 w-6 text-color-2 mr-3" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="h-6 w-6 text-color-2 mr-3" />
                                <span>
                                    123 Mystery Lane, Secret City, AN 12345
                                </span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <Form {...form}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        autoComplete="on"
                                                        {...field}
                                                        className={cn(
                                                            "bg-white/5 border-color-2/20 text-white h-12",
                                                            errors.name &&
                                                                "border-red-500 focus-visible:ring-red-500"
                                                        )}
                                                    />
                                                </FormControl>

                                                {errors.name && (
                                                    <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                                        <ToolTipMessage
                                                            size={20}
                                                            message={
                                                                errors.name
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
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Textarea
                                                        rows={5}
                                                        placeholder="Enter your message"
                                                        className={cn(
                                                            "bg-white/5 border-color-2/20 text-white resize-none",
                                                            errors.message &&
                                                                "border-red-500 focus-visible:ring-red-500"
                                                        )}
                                                        {...field}
                                                    />
                                                </FormControl>

                                                {errors.message && (
                                                    <div className="absolute top-6 -translate-y-1/2 right-4">
                                                        <ToolTipMessage
                                                            size={20}
                                                            message={
                                                                errors.message
                                                                    ?.message as string
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <SubmitButton
                                    isSubmitting={isSubmitting}
                                    isValid={isValid}
                                    text="Send Message"
                                />
                            </form>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;
