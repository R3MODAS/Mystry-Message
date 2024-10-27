import BannerSection from "@/components/home/Banner";
import AnonymousMessageCarouselSection from "@/components/home/AnonymousMessageCarousel";
import WhyChooseSection from "@/components/home/WhyChoose";

const HomePage = () => {
    return (
        <main className="bg-color-1 pt-20">
            <BannerSection />
            <WhyChooseSection />
            <AnonymousMessageCarouselSection />
        </main>
    );
};

export default HomePage;
