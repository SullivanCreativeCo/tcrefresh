import AnimatedSection from "./AnimatedSection";
import { Users, BadgeCheck, Target, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Users,
    title: "Built by Security Professionals",
    desc: "Created by people who've lived in the trenches—selling security, defending networks, and translating risk. We understand your challenges because we've been there.",
  },
  {
    icon: BadgeCheck,
    title: "Backed by Trusted Data",
    desc: "Every simulation, every figure, every assessment is grounded in industry-leading research from IBM, Verizon, and MITRE. No fearmongering. Just facts.",
  },
  {
    icon: Target,
    title: "Focused on Business Outcomes",
    desc: "We don't just report vulnerabilities—we quantify business impact. Every feature is designed to help you demonstrate value and justify investment.",
  },
  {
    icon: Handshake,
    title: "Committed to Your Success",
    desc: "Your wins are our wins. We provide ongoing support, resources, and training to help you maximize the platform and close more deals.",
  },
];

const WhyUs = () => (
  <section id="why-us" className="py-24">
    <div className="section-container">
      <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">Why ThreatCaptain</span>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Your Partner in <span className="gradient-text">Elevating Security Conversations</span>
        </h2>
        <p className="text-muted-foreground text-lg">We're not just a tool. We're your partner in elevating security conversations.</p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {values.map((v, i) => (
          <AnimatedSection key={v.title} delay={i * 0.1}>
            <motion.div className="glass-card-hover p-6 h-full" whileHover={{ scale: 1.02 }}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <v.icon className="text-primary" size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
