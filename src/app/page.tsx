import { Hero } from "@/components/sections/Hero";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { DealOfTheDay } from "@/components/sections/DealOfTheDay";
import { ValueProps } from "@/components/sections/ValueProps";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <Categories />
      <FeaturedProducts />
      <DealOfTheDay />
      <ValueProps />
      <Testimonials />
      <Newsletter />
    </>
  );
}
