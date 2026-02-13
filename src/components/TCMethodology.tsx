import { motion } from "framer-motion";
import { Crosshair, Calculator, LineChart, FileText } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { BentoItem } from "@/components/ui/cybernetic-bento-card";

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
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 relative inline-block w-full" style={{textShadow: '0 0 40px rgba(42, 54, 255, 0.3)'}}>
            <span style={{ WebkitTextStroke: '1px rgba(226, 232, 240, 0.7)', color: 'transparent' }}>From </span>
            <span className="text-gradient-cyan">tech</span>
            <span style={{ WebkitTextStroke: '1px rgba(226, 232, 240, 0.7)', color: 'transparent' }}> talk to </span>
            <span className="text-gradient-cyan">business</span>
            <span style={{ WebkitTextStroke: '1px rgba(226, 232, 240, 0.7)', color: 'transparent' }}> conversation</span>
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
            >
              <BentoItem className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{s.num}</span>
                </div>
                <h3 className="text-foreground font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </BentoItem>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TCMethodology;
