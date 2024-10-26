const AnonymousMessageCarouselSection = () => {
    return (
        <section className="container mx-auto px-4 py-16 md:py-32">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
                Anonymous Messages
            </h2>
            <div className="relative overflow-hidden">
                <div className="flex animate-carousel">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="w-72 flex-shrink-0 mx-4">
                            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-[#0d9488]/20 h-48 flex flex-col justify-between">
                                <p className="text-[#e2e8f0] italic">
                                    &quot;This is an anonymous message. It could
                                    be from anyone, anywhere.&quot;
                                </p>
                                <div className="text-[#38bdf8] text-sm">
                                    Anonymous User #{index + 1}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AnonymousMessageCarouselSection;
