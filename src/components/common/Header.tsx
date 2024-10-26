"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Menu } from "lucide-react";
import Link from "next/link";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed w-full z-50 text-white transition-all duration-300 ${isScrolled ? "bg-[#050b1f]/50 backdrop-blur-md" : ""}`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Mail className="h-8 w-8 text-[#0d9488]" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#0d9488] to-[#38bdf8] text-transparent bg-clip-text">
                        Mystry Message
                    </span>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                href="/login"
                                className="hover:text-[#0d9488] transition-colors"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/signup"
                                className="hover:text-[#0d9488] transition-colors"
                            >
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="hover:text-[#0d9488] transition-colors"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="hover:text-[#0d9488] transition-colors"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Button
                    variant="ghost"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
            {isMenuOpen && (
                <nav className="md:hidden bg-[#050b1f]/90 backdrop-blur-md">
                    <ul className="flex flex-col items-center py-4">
                        <li className="py-2">
                            <Link
                                href="/login"
                                className="hover:text-[#0d9488] transition-colors"
                            >
                                Login
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link
                                href="/signup"
                                className="hover:text-[#0d9488] transition-colors"
                            >
                                Sign Up
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link
                                href="/about"
                                className="hover:text-[#0d9488] transition-colors"
                            >
                                About
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link
                                href="/contact"
                                className="hover:text-[#0d9488] transition-colors"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
