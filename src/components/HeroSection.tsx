import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import captainBeacon from "@/assets/captain-beacon.png";

const floatingCards = [
  { label: "Financial Impact", value: "$1.59M", color: "text-destructive", delay: 0.3, x: -20, y: -30 },
  { label: "Risk Score", value: "87/100", color: "text-warning", delay: 0.5, x: 30, y: 20 },
  { label: "Insurance Gap", value: "$847K", color: "text-primary", delay: 0.7, x: -10, y: 60 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full mb-6">
              Qualitative Risk Assessment Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
          >
            Turn Cyber Risk Into{" "}
            <span className="gradient-text">Financial Impact</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
          >
            The qualitative risk assessment platform that helps cybersecurity
            professionals speak the language of business leaders—translating
            threats into financial consequences they can't ignore.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg glow-button transition-all duration-300 hover:scale-105 hover:gap-3"
            >
              Request a Demo <ArrowRight size={16} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-border/50 text-foreground rounded-lg transition-all duration-300 hover:bg-muted hover:border-primary/30"
            >
              <Play size={16} /> See How It Works
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-border/30"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Trusted by cybersecurity leaders across industries
            </p>
            <div className="flex items-center gap-6 text-muted-foreground/50">
              {["ConnectWise", "Performive", "Novus Insight", "Kraken"].map((name) => (
                <span key={name} className="text-sm font-medium">{name}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Visual - Mascot + floating cards */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.img
            src={captainBeacon}
            alt="Captain Beacon - ThreatCaptain mascot"
            className="w-64 sm:w-80 lg:w-96 relative z-10 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Floating dashboard cards */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              className="absolute glass-card px-4 py-3 z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: card.delay },
                scale: { duration: 0.5, delay: card.delay },
                y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: card.delay },
              }}
              style={{
                top: `${30 + i * 25}%`,
                right: i % 2 === 0 ? "0%" : "auto",
                left: i % 2 !== 0 ? "0%" : "auto",
              }}
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{card.label}</p>
              <p className={`text-lg font-bold font-mono ${card.color}`}>{card.value}</p>
            </motion.div>
          ))}

          {/* Glow behind mascot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
