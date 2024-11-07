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
        <section className="py-16 lg:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-color-1 to-color-7"></div>
            <div className="container mx-auto px-4 lg:px-10 relative z-10">
                <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-center text-white">
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
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                            >
                                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-color-2/20 h-48 flex flex-col justify-between">
                                    <p className="text-color-4 italic">
                                        &quot;This is an anonymous message. It
                                        could be from anyone, anywhere.&quot;
                                    </p>
                                    <div className="text-color-3 text-sm">
                                        Anonymous User #{index + 1}
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden lg:flex" />
                    <CarouselNext className="hidden lg:flex" />
                </Carousel>
            </div>
        </section>
    );
};

export default AnonymousMessageSection;
