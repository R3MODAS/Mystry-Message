"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/utils/constants";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { data: session } = useSession();

    return (
        <header
            className={`fixed top-0 left-0 right-0 w-full py-1 z-50 text-white transition-all duration-300 ${isScrolled ? "bg-color-1/50 backdrop-blur-md" : ""}`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Mail className="h-8 w-8 text-color-2" />
                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-color-2 to-color-3 text-transparent bg-clip-text">
                        Mystry Message
                    </span>
                </Link>
                <nav>
                    <ul className="flex items-center space-x-6">
                        {navLinks.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.link}
                                    className="hover:text-color-2 transition-all duration-300"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            {session ? (
                                <Button
                                    onClick={() => signOut()}
                                    className="bg-transparent px-7 py-5 text-base font-normal text-white border border-color-3 hover:bg-gradient-to-r from-color-2 to-color-3 hover:text-white rounded-lg"
                                >
                                    Log out
                                </Button>
                            ) : (
                                <Link
                                    href="/signup"
                                    className="px-6 py-3 text-base font-normal text-white border border-color-3 hover:bg-gradient-to-r from-color-2 to-color-3 hover:text-white rounded-lg"
                                >
                                    Sign up
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
