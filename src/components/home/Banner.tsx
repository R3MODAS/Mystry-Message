import { Button } from "@/components/ui/button";
import Image from "next/image";

const BannerSection = () => {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-center text-white">
            <div className="md:w-1/2 mb-12 md:mb-0">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    Discover the{" "}
                    <span className="bg-gradient-to-r from-color-2 to-color-3 text-transparent bg-clip-text">
                        Secret
                    </span>{" "}
                    of Anonymous Messaging
                </h1>
                <p className="text-xl mt-6 mb-8 text-color-4">
                    Connect with friends and strangers alike through the thrill
                    of anonymous messaging. Share your thoughts without
                    revealing your identity.
                </p>
                <div className="flex space-x-4">
                    <Button className="bg-gradient-to-r from-color-2 to-color-3 hover:from-color-5 hover:to-color-6 text-white px-8 py-6 text-base rounded-lg font-medium">
                        Get Started
                    </Button>
                    <Button
                        variant="outline"
                        className="text-black border-white hover:text-color-1 px-8 py-6 text-base rounded-lg font-medium"
                    >
                        Learn More
                    </Button>
                </div>
            </div>
            <div className="md:w-1/2">
                <Image
                    src="/assets/message.webp"
                    width={450}
                    height={450}
                    priority
                    alt="message"
                    className="w-auto h-auto mx-auto"
                />
            </div>
        </section>
    );
};

export default BannerSection;
