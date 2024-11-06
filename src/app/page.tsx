import BannerSection from "@/components/home/Banner";
import WhyChooseSection from "@/components/home/WhyChoose";
import AnonymousMessageSection from "@/components/home/AnonymousMessage";

const HomePage = () => {
    return (
        <main className="pt-20">
            <BannerSection />
            <WhyChooseSection />
            <AnonymousMessageSection />
        </main>
    );
};

export default HomePage;
