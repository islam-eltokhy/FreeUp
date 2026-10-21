import { Hero } from "@/components/sections/Hero";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ReelSpotlight } from "@/components/sections/ReelSpotlight";
import { ValueProps } from "@/components/sections/ValueProps";
import { VisitStore } from "@/components/sections/VisitStore";
import { Testimonials } from "@/components/sections/Testimonials";
import { FollowCta } from "@/components/sections/FollowCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <Categories />
      <FeaturedProducts />
      <ReelSpotlight />
      <ValueProps />
      <VisitStore />
      <Testimonials />
      <FollowCta />
    </>
  );
}
