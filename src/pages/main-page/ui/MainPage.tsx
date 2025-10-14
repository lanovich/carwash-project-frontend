import { AboutCarwash } from "@/widgets/about-carwash/ui";
import { OurServices } from "@/widgets/our-services/ui";
import { PromoSection } from "@/widgets/promo-section/ui";

export const MainPage = () => {
  return (
    <div className="max-w-none">
      <PromoSection />
      <OurServices />
      <AboutCarwash />
    </div>
  );
};
