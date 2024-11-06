import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "@/styles/index.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap"
});

export const metadata: Metadata = {
    title: "Mystry Message",
    description: "Generated by create next app"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased flex flex-col min-h-screen bg-color-1`}
            >
                <AuthProvider>
                    <Header />
                    {children}
                    <Footer />
                    <Toaster
                        toastOptions={{
                            position: "top-center"
                        }}
                    />
                </AuthProvider>
            </body>
        </html>
    );
}
