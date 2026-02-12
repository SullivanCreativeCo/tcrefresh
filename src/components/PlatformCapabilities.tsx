import AnimatedSection from "./AnimatedSection";
import { Calculator, Shield, TrendingUp, FileText, BadgeCheck, Database } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Calculator,
    title: "Financial Impact Modeling",
    desc: "Quantify breach scenarios with adjustable parameters—attack type, business size, industry vertical, downtime duration. Generate precise financial exposure estimates backed by real-world data.",
  },
  {
    icon: Shield,
    title: "Insurance Readiness Assessment",
    desc: "Evaluate cyber insurance eligibility using actual underwriter criteria. Show clients how security improvements directly reduce premiums and improve coverage terms.",
  },
  {
    icon: TrendingUp,
    title: "Risk Likelihood Analysis",
    desc: "Calculate attack probability based on current security posture, industry threat landscape, and control effectiveness. Justify every recommended investment with ROI data.",
  },
  {
    icon: FileText,
    title: "Executive-Ready Reports",
    desc: "Generate professional, branded reports designed for C-suite consumption. Clear visuals, minimal jargon, maximum impact.",
  },
  {
    icon: BadgeCheck,
    title: "Industry-Validated Data",
    desc: "Built on trusted sources: Verizon DBIR, IBM Cost of a Data Breach, MITRE ATT&CK framework. Give your assessments the credibility that overcomes skepticism.",
  },
  {
    icon: Database,
    title: "Threat Intelligence Library",
    desc: "Access current threat scenarios, attack patterns, and real-world breach case studies. Keep your risk assessments relevant and timely.",
  },
];

const PlatformCapabilities = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">Platform</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Comprehensive Risk <span className="gradient-text">Intelligence Platform</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to transform technical vulnerabilities into board-ready business cases.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <AnimatedSection key={cap.title} delay={i * 0.08}>
              <motion.div
                className="glass-card-hover p-6 h-full"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <cap.icon className="text-primary" size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformCapabilities;
