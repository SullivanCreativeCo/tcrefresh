import { motion } from "framer-motion";
import { Award, Users, Globe, BookOpen } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const cards = [
  { icon: Award, title: "FAIR Certified", desc: "Our methodology is built on the Factor Analysis of Information Risk framework — the international standard for cyber risk quantification." },
  { icon: Users, title: "Built by Practitioners", desc: "Founded by CISOs and actuarial analysts who have managed risk programs for Fortune 500 enterprises and critical infrastructure." },
  { icon: Globe, title: "Industry Agnostic", desc: "Healthcare, financial services, energy, tech — our models are calibrated with sector-specific loss data for accurate quantification." },
  { icon: BookOpen, title: "Research-Backed", desc: "Every model parameter is grounded in peer-reviewed research, real breach data, and continuously validated against observed outcomes." },
];

const TCAbout = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="about" className="py-24 sm:py-32 bg-grid relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">
              About ThreatCaptain
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Charting a course through{" "}
              <span className="text-gradient-cyan">uncertain waters</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Security teams have been navigating with broken compasses —
              qualitative risk ratings that don't translate to business
              decisions. ThreatCaptain provides the instruments to measure what
              matters: the probability and financial impact of the threats you
              face.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              We don't sell fear. We deliver clarity. When you can put a number
              on risk, you can make rational decisions about where to invest,
              what to accept, and how to communicate it to the people who
              control budgets.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="glass rounded-xl p-5"
              >
                <c.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-white font-semibold text-sm mb-1.5">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TCAbout;
