"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
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

    return (
        <header
            className={`fixed w-full my-2 z-50 text-white transition-all duration-300 ${isScrolled ? "bg-color-1/50 backdrop-blur-md" : ""}`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Mail className="h-8 w-8 text-color-2" />
                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-color-2 to-color-3 text-transparent bg-clip-text">
                        Mystry Message
                    </span>
                </div>
                <nav>
                    <ul className="flex items-center space-x-6">
                        {navLinks.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.link}
                                    className={`hover:text-color-2 transition-all duration-300
                                        ${item.name === "Sign up" && "text-base font-normal text-white border border-color-3 hover:bg-gradient-to-r from-color-2 to-color-3 hover:text-white px-5 py-2.5 rounded-lg"}`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
