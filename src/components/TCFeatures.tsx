import { motion } from "framer-motion";
import { BarChart3, Target, TrendingUp, Shield, PieChart, Layers } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const features = [
  { icon: BarChart3, title: "Financial Risk Quantification", desc: "Translate threat scenarios into dollar-value impact estimates using Monte Carlo simulations and loss exceedance curves." },
  { icon: Target, title: "Threat Scenario Modeling", desc: "Model specific attack vectors against your environment with probabilistic outcomes based on real-world breach data." },
  { icon: TrendingUp, title: "Risk Trend Analysis", desc: "Track how your risk posture evolves over time with continuous reassessment and dynamic scoring algorithms." },
  { icon: Shield, title: "Control Effectiveness Scoring", desc: "Measure the quantitative impact of each security control on your overall risk reduction portfolio." },
  { icon: PieChart, title: "Executive Reporting", desc: "Auto-generate board-ready reports that frame cyber risk in financial terms stakeholders understand." },
  { icon: Layers, title: "Multi-Framework Alignment", desc: "Map quantitative outputs to NIST CSF, ISO 27001, FAIR, and CIS — bridging compliance with real risk insight." },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

const TCFeatures = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="platform" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
            The Platform
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Risk analysis that speaks in{" "}
            <span className="text-gradient-cyan">dollars, not adjectives</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Move beyond heat maps and color-coded matrices. ThreatCaptain
            delivers probabilistic risk models that quantify exposure in terms
            your CFO and board already operate in.
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
            <motion.div
              key={f.title}
              variants={item}
              className="glass rounded-xl p-6 hover:border-cyan-500/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/15 flex items-center justify-center mb-4 transition-colors">
                <f.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TCFeatures;
