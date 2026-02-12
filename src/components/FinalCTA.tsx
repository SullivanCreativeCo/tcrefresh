import { ArrowRight, Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import captainBeacon from "@/assets/captain-beacon.png";

const FinalCTA = () => (
  <section id="contact" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 pointer-events-none" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

    <div className="section-container relative z-10 text-center">
      <AnimatedSection>
        <img src={captainBeacon} alt="Captain Beacon" className="w-32 mx-auto mb-8 drop-shadow-2xl animate-float" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="text-3xl sm:text-5xl font-bold mb-6">
          Stop Talking Risk.{" "}
          <span className="gradient-text">Start Showing Impact.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          The platform that turns security conversations into strategic business discussions is ready when you are.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-4">
        <a
          href="mailto:demo@threatcaptain.com"
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-primary text-primary-foreground rounded-xl glow-button transition-all duration-300 hover:scale-105 hover:gap-3"
        >
          Request a Demo <ArrowRight size={18} />
        </a>
        <a
          href="mailto:hello@threatcaptain.com"
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold border border-border/50 text-foreground rounded-xl transition-all duration-300 hover:bg-muted hover:border-primary/30"
        >
          <Mail size={18} /> Contact Us
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default FinalCTA;
