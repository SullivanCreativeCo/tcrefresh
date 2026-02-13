import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Play, Users } from "lucide-react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { InteractivePieChart, PhaseData } from "@/components/InteractivePieChart";
import { getPlaysByPhase, MethodologyPhase } from "@/data/newPlays";
import { PlayDetailSheet } from "@/components/playbook/PlayDetailSheet";
import webLogo2 from "@/assets/web-logo-2.png";

const stats = [
  { value: "$4.2B+", label: "Risk Quantified" },
  { value: "10K+", label: "Scenarios Modeled" },
  { value: "98.6%", label: "Model Accuracy" },
];

const TCHero = () => {
  const [selectedPhase, setSelectedPhase] = useState<PhaseData | null>(null);
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null);
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
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/[0.06] rounded-full blur-3xl" />
    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-3xl" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Your Clients Don't Care About MS-2024-8675. They Care About{" "}
            <span className="text-gradient-cyan">$2.3M in Lost Revenue</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
            Translate technical risk into business impact that gets deals approved
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
            >
              Show Me How to Quantify Risk
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-700 text-slate-300 text-sm hover:border-primary/30 transition-colors"
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

            {/* Tactical Plays */}
            {(() => {
              const plays = getPlaysByPhase(selectedPhase.id as MethodologyPhase);
              return (
                <>
                  <div
                    className="p-4 rounded-lg border-l-4 mb-6"
                    style={{
                      backgroundColor: `${selectedPhase.color}08`,
                      borderColor: selectedPhase.color,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4" style={{ color: selectedPhase.color }} />
                      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: selectedPhase.color }}>
                        Available Plays
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">
                      {plays.length} tactical {plays.length === 1 ? 'play' : 'plays'} for the {selectedPhase.name} phase
                    </p>
                  </div>

                  {plays.length > 0 ? (
                    <div className="space-y-3 p-4 rounded-lg border border-slate-700/30 bg-slate-800/30">
                      <div className="flex items-center gap-2">
                        <Play className="w-5 h-5" style={{ color: selectedPhase.color }} />
                        <h3 className="font-semibold text-slate-200 text-sm">Tactical Plays</h3>
                      </div>
                      <ul className="space-y-2">
                        {plays.map((play, i) => (
                          <motion.li
                            key={play.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.06 }}
                            onClick={() => setSelectedPlayId(play.id)}
                            className="text-sm flex items-start gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer"
                          >
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                              style={{ backgroundColor: selectedPhase.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-slate-200 font-medium">{play.title}</p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {play.targetAudience.roles[0]}
                                </span>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center p-6 rounded-lg border border-slate-700/30">
                      <p className="text-sm text-slate-500">No plays available for this phase yet</p>
                    </div>
                  )}
                </>
              );
            })()}

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

    {/* Play Detail Sheet */}
    <PlayDetailSheet playId={selectedPlayId} onClose={() => setSelectedPlayId(null)} />
  </section>
  );
};

export default TCHero;
