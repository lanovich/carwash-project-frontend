import { AboutCarwash } from "@/widgets/about-carwash/ui";
import { Footer } from "@/widgets/footer/ui";
import { OurServices } from "@/widgets/our-services/ui";
import { PromoSection } from "@/widgets/promo-section/ui";

const MainPage = () => {
  return (
    <main className="max-w-none">
      <PromoSection />
      <OurServices />
      <AboutCarwash />
      <Footer />
    </main>
  );
};

export default MainPage;
