import { motion } from "framer-motion";
import { Users, ShieldCheck, TrendingUp, Handshake, Quote } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const valueProps = [
  {
    icon: Users,
    title: "Built by the Community",
    desc: "We're not just backed by VCs — we're backed by MSPs. Our platform is built on real-world experience and funded by people who use it.",
  },
  {
    icon: ShieldCheck,
    title: "Powered by Trusted Data",
    desc: "Our reports and simulations are built on credible industry sources like IBM and Verizon, giving you the authority to build trust.",
  },
  {
    icon: TrendingUp,
    title: "Focused on Sales Enablement",
    desc: "We're singularly focused on one thing: helping you sell cybersecurity more effectively. Every feature is designed to close deals.",
  },
  {
    icon: Handshake,
    title: "Dedicated to Your Growth",
    desc: "Your success is our success. We provide the resources, support, and partnership you need to grow your security practice.",
  },
];

const TCWhyUs = () => {
  const { ref, inView } = useInView(0.12);

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            Why ThreatCaptain
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            More Than a Platform.{" "}
            <span className="text-gradient-cyan">We're Your Partner.</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — Founders quote */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-xl border border-primary/10 bg-primary/[0.03] p-8 sm:p-10 relative">
              {/* Subtle corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-tl-xl pointer-events-none" />

              <Quote className="w-8 h-8 text-primary/30 mb-5" />
              <blockquote className="text-base sm:text-lg leading-relaxed text-foreground/90 mb-6 italic">
                "We spent years in the MSP trenches, frustrated by tools that talked tech instead of business. So we built the one we always wished we had — a platform that turns security conversations into your biggest revenue opportunities."
              </blockquote>

              <div className="flex items-center gap-4">
                {/* Founder avatars */}
                <div className="flex -space-x-3">
                  <div className="w-11 h-11 rounded-full bg-primary/15 border-2 border-background flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">A</span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-primary/15 border-2 border-background flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">B</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Adam &amp; Brad</p>
                  <p className="text-xs text-muted-foreground">Co-founders, ThreatCaptain</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — 2×2 value props */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {valueProps.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass rounded-xl p-6 group hover:border-primary/20 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-blue-500/10 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-blue-500/20 transition-all duration-300">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TCWhyUs;
