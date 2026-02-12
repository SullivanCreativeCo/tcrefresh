import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSolution from "@/components/ProblemSolution";
import PlatformCapabilities from "@/components/PlatformCapabilities";
import Testimonials from "@/components/Testimonials";
import FounderPhilosophy from "@/components/FounderPhilosophy";
import WhyUs from "@/components/WhyUs";
import WhoUsesIt from "@/components/WhoUsesIt";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolution />
        <PlatformCapabilities />
        <Testimonials />
        <FounderPhilosophy />
        <WhyUs />
        <WhoUsesIt />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
