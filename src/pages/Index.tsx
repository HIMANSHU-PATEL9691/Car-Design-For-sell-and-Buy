import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { Specialization } from "@/components/home/Specialization";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { Team } from "@/components/home/Team";
import { CTA } from "@/components/home/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <Specialization />
      <Testimonials />
      <Team />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;