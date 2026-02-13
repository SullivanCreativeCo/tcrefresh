import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/glowing-background-stars-card";

const features = [
  { title: "Financial Risk Quantification", desc: "Translate threat scenarios into dollar-value impact estimates using Monte Carlo simulations and loss exceedance curves." },
  { title: "Threat Scenario Modeling", desc: "Model specific attack vectors against your environment with probabilistic outcomes based on real-world breach data." },
  { title: "Risk Trend Analysis", desc: "Track how your risk posture evolves over time with continuous reassessment and dynamic scoring algorithms." },
  { title: "Control Effectiveness Scoring", desc: "Measure the quantitative impact of each security control on your overall risk reduction portfolio." },
  { title: "Executive Reporting", desc: "Auto-generate board-ready reports that frame cyber risk in financial terms stakeholders understand." },
  { title: "Multi-Framework Alignment", desc: "Map quantitative outputs to NIST CSF, ISO 27001, FAIR, and CIS — bridging compliance with real risk insight." },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

const TCFeatures = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="platform" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary text-sm sm:text-base font-semibold uppercase tracking-widest mb-3">
            The Platform
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Why Your Perfect Pitch{" "}
            <span className="text-gradient-cyan">Dies</span> in the <span className="text-gradient-cyan">C-Suite</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            You try to explain impact. Attack surfaces. CVSS scores. But they're already thinking about lunch. The problem isn't your expertise. It's translation.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <GlowingStarsBackgroundCard className="max-w-full max-h-none">
                <GlowingStarsTitle>{f.title}</GlowingStarsTitle>
                <GlowingStarsDescription>{f.desc}</GlowingStarsDescription>
              </GlowingStarsBackgroundCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TCFeatures;
