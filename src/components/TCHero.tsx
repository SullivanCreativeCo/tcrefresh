import { motion } from "framer-motion";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import RadarCanvas from "@/components/RadarCanvas";

const stats = [
  { value: "$4.2B+", label: "Risk Quantified" },
  { value: "10K+", label: "Scenarios Modeled" },
  { value: "98.6%", label: "Model Accuracy" },
];

const TCHero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <AnimatedShaderBackground />

    {/* Ambient blurs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/[0.06] rounded-full blur-3xl" />
    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-3xl" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs text-slate-300 tracking-wide">
              Quantitative Cyber Risk Analysis
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Navigate risk with{" "}
            <span className="text-gradient-cyan">precision</span>, not
            guesswork
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
            ThreatCaptain transforms cyber risk into quantifiable financial
            metrics. Chart your course through the threat landscape with
            data-driven models that boards and executives actually understand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow"
            >
              Request a Demo
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-700 text-slate-300 text-sm hover:border-indigo-500/30 transition-colors"
            >
              Our Methodology
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {s.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <RadarCanvas />
        </motion.div>
      </div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent z-10" />
  </section>
);

export default TCHero;
