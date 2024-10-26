import BannerSection from "@/components/home/Banner";
import AnonymousMessageCarouselSection from "@/components/home/AnonymousMessageCarousel";
import WhyChooseSection from "@/components/home/WhyChoose";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-[#050b1f] text-white flex flex-col">
            <main className="flex-grow pt-20">
                <BannerSection />
                <WhyChooseSection />
                <AnonymousMessageCarouselSection />
            </main>
        </div>
    );
};

export default HomePage;
