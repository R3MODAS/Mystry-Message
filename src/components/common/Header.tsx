"use client";

import { signOut, useSession } from "next-auth/react";
import { AlignJustify, Mail, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/utils/constants";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetClose,
    SheetTitle,
    SheetTrigger,
    SheetDescription
} from "@/components/ui/sheet";

const Header = () => {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 left-0 right-0 w-full py-1 z-50 text-white transition-all duration-300 bg-color-1/50 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Mail className="sm:h-8 sm:w-8 text-color-2" />
                    <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-color-2 to-color-3 text-transparent bg-clip-text">
                        Mystry Message
                    </span>
                </Link>

                {/* Mobile Responsive Nav */}
                <Sheet>
                    <SheetTrigger>
                        <div className="md:hidden">
                            <AlignJustify size={25} className="text-color-4" />
                        </div>
                    </SheetTrigger>
                    <SheetContent className="w-[300px] sm:w-[400px] bg-color-1 border-color-2">
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-bold text-color-4">
                                Menu
                            </SheetTitle>
                            <SheetClose asChild>
                                <div className="absolute right-4 top-4 cursor-pointer">
                                    <X size={24} className="text-color-4" />
                                </div>
                            </SheetClose>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <ul className="space-y-3 mt-8">
                            {navLinks.map((item) => (
                                <li key={item.id}>
                                    <SheetTrigger asChild>
                                        <Link
                                            href={item.link}
                                            className="block py-2 px-4 text-color-4 hover:bg-color-2/10 rounded-md transition-all duration-300"
                                        >
                                            {item.name}
                                        </Link>
                                    </SheetTrigger>
                                </li>
                            ))}
                            <li>
                                <SheetTrigger asChild>
                                    {session?.user ? (
                                        <Button
                                            onClick={() => signOut()}
                                            className="w-full h-12 text-base flex items-center justify-center bg-gradient-to-r from-color-2 to-color-3 hover:from-color-5 hover:to-color-6 text-white rounded-md py-2 px-4 text-center"
                                        >
                                            Log out
                                        </Button>
                                    ) : (
                                        <Link
                                            href="/signup"
                                            className="w-full h-12 text-base flex items-center justify-center bg-gradient-to-r from-color-2 to-color-3 hover:from-color-5 hover:to-color-6 text-white rounded-md py-2 px-4 text-center"
                                        >
                                            Sign up
                                        </Link>
                                    )}
                                </SheetTrigger>
                            </li>
                        </ul>
                    </SheetContent>
                </Sheet>

                {/* Desktop Responsive Nav */}
                <nav className="md:block hidden">
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
                            {session?.user ? (
                                <Button
                                    onClick={() => signOut()}
                                    className="bg-transparent px-7 py-5 font-normal text-white border border-color-3 hover:bg-gradient-to-r from-color-2 to-color-3 hover:text-white rounded-lg"
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
