"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const AnonymousMessageSection = () => {
    return (
        <section className="px-4 py-16 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-color-1 to-[#0a1836]"></div>
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
                    Anonymous Messages
                </h2>
                <Carousel
                    opts={{
                        dragFree: true,
                        loop: true,
                        duration: 50,
                        align: "start"
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2000
                        })
                    ]}
                >
                    <CarouselContent>
                        {[...Array(10)].map((_, index) => (
                            <CarouselItem key={index} className="basis-1/4">
                                <div className="w-80 flex-shrink-0 mx-4">
                                    <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-color-2/20 h-48 flex flex-col justify-between">
                                        <p className="text-color-4 italic">
                                            &quot;This is an anonymous message.
                                            It could be from anyone,
                                            anywhere.&quot;
                                        </p>
                                        <div className="text-color-3 text-sm">
                                            Anonymous User #{index + 1}
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
};

export default AnonymousMessageSection;
