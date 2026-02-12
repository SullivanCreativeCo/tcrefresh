import { motion } from "framer-motion";
import { Crosshair, Calculator, LineChart, FileText } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const steps = [
  { num: "01", icon: Crosshair, title: "Threat Identification", desc: "We catalog threat scenarios relevant to your industry, assets, and attack surface using curated threat intelligence feeds and MITRE ATT&CK mappings." },
  { num: "02", icon: Calculator, title: "Probabilistic Modeling", desc: "Each scenario is modeled with probability distributions derived from breach frequency data, vulnerability telemetry, and control-state analysis." },
  { num: "03", icon: LineChart, title: "Loss Quantification", desc: "Monte Carlo simulations produce loss exceedance curves that express risk as annualized financial exposure — not vague severity labels." },
  { num: "04", icon: FileText, title: "Actionable Reporting", desc: "Results are distilled into decision-grade dashboards that map risk reduction to investment, enabling ROI-driven security strategy." },
];

const TCMethodology = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="methodology" className="py-24 sm:py-32 bg-grid relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Methodology
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 relative inline-block w-full" style={{textShadow: '0 0 40px rgba(42, 54, 255, 0.3)'}}>
            From <span className="text-gradient-cyan">tech</span> talk to{" "}
            <span className="text-gradient-cyan">business</span> conversation
          </h2>
        </div>

        <div ref={ref} className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="hidden lg:block absolute top-12 border-t border-dashed border-primary/15"
              style={{
                left: `${(i + 1) * 25}%`,
                width: "calc(25% - 1.5rem)",
                transform: "translateX(-50%)",
              }}
            />
          ))}

          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
              className="glass rounded-xl p-6 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-foreground font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TCMethodology;
