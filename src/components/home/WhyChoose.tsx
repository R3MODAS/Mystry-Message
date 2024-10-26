import { Lock, UserPlus, Send } from "lucide-react";

const WhyChooseSection = () => {
    return (
        <section className="py-16 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050b1f] to-[#0a1836]"></div>
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
                    Why Choose Mystery Message?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-[#0d9488]/20">
                        <Lock className="h-12 w-12 text-[#0d9488] mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Completely Anonymous
                        </h3>
                        <p className="text-[#e2e8f0]">
                            Your identity remains a secret. Express yourself
                            freely without fear of judgment.
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-[#0d9488]/20">
                        <UserPlus className="h-12 w-12 text-[#0d9488] mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Easy to Use
                        </h3>
                        <p className="text-[#e2e8f0]">
                            Simple sign-up process and intuitive interface.
                            Start sending messages in minutes.
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-[#0d9488]/20">
                        <Send className="h-12 w-12 text-[#0d9488] mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Instant Delivery
                        </h3>
                        <p className="text-[#e2e8f0]">
                            Messages are sent and received instantly. No delays
                            in your mysterious conversations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
