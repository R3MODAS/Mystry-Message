import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const BannerSection = () => {
    return (
        <section className="container mx-auto px-4 py-16 md:py-32 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Discover the{" "}
                    <span className="bg-gradient-to-r from-[#0d9488] to-[#38bdf8] text-transparent bg-clip-text">
                        Secret
                    </span>{" "}
                    of Anonymous Messaging
                </h1>
                <p className="text-xl mb-8 text-[#e2e8f0]">
                    Connect with friends and strangers alike through the thrill
                    of anonymous messaging. Share your thoughts without
                    revealing your identity.
                </p>
                <div className="flex space-x-4">
                    <Button className="bg-gradient-to-r from-[#0d9488] to-[#38bdf8] hover:from-[#0b7a6e] hover:to-[#0ea5e9] text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
                        Get Started
                    </Button>
                    <Button
                        variant="outline"
                        className="text-black border-white hover:text-[#050b1f] px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        Learn More
                    </Button>
                </div>
            </div>
            <div className="md:w-1/2 relative">
                <div className="w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-[#0d9488] to-[#38bdf8] rounded-full filter blur-3xl opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <Mail className="w-64 h-64 md:w-96 md:h-96 text-white/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
        </section>
    );
};

export default BannerSection;
