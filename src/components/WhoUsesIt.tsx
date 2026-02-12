import AnimatedSection from "./AnimatedSection";
import { UserCheck, Server, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const audiences = [
  {
    icon: UserCheck,
    title: "Cybersecurity Consultants",
    desc: "Independent consultants and boutique firms who need to demonstrate ROI to win and retain clients.",
  },
  {
    icon: Server,
    title: "MSSPs & MSPs",
    desc: "Managed service providers selling security solutions to clients who demand financial justification.",
  },
  {
    icon: ShieldCheck,
    title: "Internal Security Teams",
    desc: "CISOs and security leaders seeking budget approval from finance and executive stakeholders.",
  },
];

const WhoUsesIt = () => (
  <section className="py-24">
    <div className="section-container">
      <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">Audience</span>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Who Uses <span className="gradient-text">ThreatCaptain</span>
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {audiences.map((a, i) => (
          <AnimatedSection key={a.title} delay={i * 0.1}>
            <motion.div className="glass-card-hover p-6 h-full text-center" whileHover={{ scale: 1.02 }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <a.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhoUsesIt;
