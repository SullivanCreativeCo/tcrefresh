import AnimatedSection from "./AnimatedSection";
import captainBeacon from "@/assets/captain-beacon.png";

const FounderPhilosophy = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 pointer-events-none" />
    <div className="section-container relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
      <AnimatedSection className="flex-shrink-0">
        <img src={captainBeacon} alt="Captain Beacon" className="w-40 lg:w-52 drop-shadow-2xl animate-float-slow" />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-6 italic">
          "We built ThreatCaptain because we were tired of watching security professionals struggle to get buy-in from the people who control the budget. Technical excellence means nothing if you can't translate it into business value. So we built the translation layer the industry needed."
        </blockquote>
        <p className="text-muted-foreground font-semibold">— The ThreatCaptain Crew</p>
      </AnimatedSection>
    </div>
  </section>
);

export default FounderPhilosophy;
