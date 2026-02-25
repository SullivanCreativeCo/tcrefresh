import { motion } from "framer-motion";
import { ArrowUp, Zap } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const TCSimulatorCTA = () => {
  const { ref, inView } = useInView(0.2);

  const scrollToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-primary/[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl mx-auto px-4 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-6">
          <Zap className="w-3 h-3" />
          Interactive Demo
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          See What a Breach Could Cost{" "}
          <span className="text-gradient-cyan">Your Clients</span>
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 max-w-2xl mx-auto">
          Show clients the real financial cost of a breach in their industry.
          No login required — see instant results backed by data from IBM, Verizon, and MITRE.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-8">
          Try Our Breach Impact Simulator
        </h3>

        <button
          onClick={scrollToSimulator}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
        >
          <ArrowUp className="w-4 h-4" />
          Launch the Simulator
        </button>

        <p className="text-xs text-muted-foreground mt-4">
          Free to use. No credit card required.
        </p>
      </motion.div>
    </section>
  );
};

export default TCSimulatorCTA;
