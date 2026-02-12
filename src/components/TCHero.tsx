import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { InteractivePieChart, PhaseData } from "@/components/InteractivePieChart";

const phaseDetails: Record<string, { bullets: string[]; insight: string }> = {
  branding: {
    bullets: ["Visual identity & messaging", "Market positioning", "Competitive differentiation"],
    insight: "Your brand is the first signal prospects use to evaluate trust and credibility.",
  },
  marketing: {
    bullets: ["Campaign strategy", "Channel optimization", "ICP targeting"],
    insight: "Effective marketing aligns messaging with your ideal customer profile across every touchpoint.",
  },
  awareness: {
    bullets: ["Content marketing", "Thought leadership", "Community engagement"],
    insight: "Stay top of mind so when the need arises, you're the first call.",
  },
  leadgen: {
    bullets: ["Conversion funnels", "Lead scoring", "Meeting optimization"],
    insight: "Turn passive consumers into active pipeline with measurable conversion rates.",
  },
  bdr: {
    bullets: ["Outbound sequences", "Persona-based outreach", "Multi-channel cadences"],
    insight: "Proactive outreach to your ICP builds pipeline that inbound alone can't sustain.",
  },
  sales: {
    bullets: ["Discovery & qualification", "Budget & timeline fit", "Stakeholder mapping"],
    insight: "Qualify urgency and budget early to focus on deals that will actually close.",
  },
  closing: {
    bullets: ["Proposal development", "Negotiation strategy", "Contract execution"],
    insight: "A structured close process reduces cycle time and increases win rates.",
  },
  implementation: {
    bullets: ["Onboarding plans", "Success milestones", "Technical deployment"],
    insight: "Smooth implementation sets the foundation for long-term retention.",
  },
  touchpoints: {
    bullets: ["QBRs & check-ins", "Support escalation", "Value reinforcement"],
    insight: "Ongoing touchpoints justify the relationship and surface expansion opportunities.",
  },
  reviews: {
    bullets: ["Annual risk reviews", "Tabletop exercises", "Tolerance recalibration"],
    insight: "Periodic reviews ensure alignment as threat landscapes and business priorities evolve.",
  },
};

const stats = [
  { value: "$4.2B+", label: "Risk Quantified" },
  { value: "10K+", label: "Scenarios Modeled" },
  { value: "98.6%", label: "Model Accuracy" },
];

const TCHero = () => {
  const [selectedPhase, setSelectedPhase] = useState<PhaseData | null>(null);

  const handlePhaseClick = (phase: PhaseData) => {
    setSelectedPhase(prev => prev?.id === phase.id ? null : phase);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPhase) {
        setSelectedPhase(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhase]);

  return (
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
          <InteractivePieChart onPhaseClick={handlePhaseClick} selectedPhase={selectedPhase?.id} />
        </motion.div>
      </div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent z-10" />

    {/* Slide-out detail panel */}
    <AnimatePresence>
      {selectedPhase && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 backdrop-blur-xl border-l border-slate-700/50"
          style={{ background: "rgba(10, 14, 26, 0.95)" }}
        >
          <div className="h-full overflow-y-auto p-8">
            {/* Close button */}
            <button
              onClick={() => setSelectedPhase(null)}
              className="absolute top-6 right-6 p-2 rounded-lg border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Phase header */}
            <div className="mt-8 mb-8">
              <div
                className="inline-block w-3 h-3 rounded-full mb-3"
                style={{ backgroundColor: selectedPhase.color }}
              />
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: selectedPhase.color }}
              >
                {selectedPhase.name}
              </h2>
              <p className="text-slate-400 text-sm">
                {selectedPhase.description}
              </p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium border border-slate-700/50 text-slate-300 capitalize">
                {selectedPhase.category === "top" ? "Go to Market" : selectedPhase.category === "mid" ? "Sales" : "Customer Success"}
              </span>
            </div>

            {/* Key activities */}
            {phaseDetails[selectedPhase.id] && (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Key Activities
                  </h3>
                  <ul className="space-y-2">
                    {phaseDetails[selectedPhase.id].bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: selectedPhase.color }}
                        />
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-slate-700/30" style={{ background: `${selectedPhase.color}08` }}>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">💡 Insight</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {phaseDetails[selectedPhase.id].insight}
                  </p>
                </div>
              </>
            )}

            <p className="mt-8 text-xs text-slate-600">
              Press <kbd className="px-1.5 py-0.5 rounded border border-slate-700 text-slate-400 font-mono text-[10px]">ESC</kbd> to close
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Backdrop */}
    <AnimatePresence>
      {selectedPhase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedPhase(null)}
        />
      )}
    </AnimatePresence>
  </section>
  );
};

export default TCHero;
