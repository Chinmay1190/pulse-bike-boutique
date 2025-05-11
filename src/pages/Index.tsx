
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import FeatureSection from "@/components/FeatureSection";
import BrandSection from "@/components/BrandSection";
import TestimonialSection from "@/components/TestimonialSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <FeatureSection />
      <BrandSection />
      <TestimonialSection />
      <NewsletterSection />
    </Layout>
  );
}
