import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import MockupShowcase from "@/components/home/MockupShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import CTABanner from "@/components/home/CTABanner";

const Index = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturedProducts />
      <MockupShowcase />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
      <CTABanner />
    </>
  );
};

export default Index;
