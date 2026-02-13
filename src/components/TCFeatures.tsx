import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Play, Users } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { InteractivePieChart, PhaseData } from "@/components/InteractivePieChart";
import { getPlaysByPhase, MethodologyPhase } from "@/data/newPlays";
import { PlayDetailSheet } from "@/components/playbook/PlayDetailSheet";

const TCFeatures = () => {
  const { ref, inView } = useInView(0.1);
  const [selectedPhase, setSelectedPhase] = useState<PhaseData | null>(null);
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null);

  const handlePhaseClick = (phase: PhaseData) => {
    setSelectedPhase(prev => prev?.id === phase.id ? null : phase);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPhase) setSelectedPhase(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhase]);

  return (
    <section id="platform" className="py-24 sm:py-32 relative overflow-hidden">
      <AnimatedShaderBackground />

      {/* Ambient blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/[0.06] rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary text-sm sm:text-base font-semibold uppercase tracking-widest mb-3">
            The Platform
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Why Your Perfect Pitch{" "}
            <span className="text-gradient-cyan">Dies</span> in the <span className="text-gradient-cyan">C-Suite</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            You try to explain impact. Attack surfaces. CVSS scores. But they're already thinking about lunch. The problem isn't your expertise. It's translation.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left — Pie Chart */}
          <div className="hidden lg:block">
            <InteractivePieChart onPhaseClick={handlePhaseClick} selectedPhase={selectedPhase?.id} />
          </div>

          {/* Right — Body Text */}
          <div className="space-y-6">
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Traditional security sales start at the bottom—technical teams, IT managers, then eventually (maybe) the CFO. By then, your message is diluted and your deal is stalled.
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              <span className="text-white font-semibold">The Anchor Point Methodology flips the script.</span> You start at the top, with the decision-makers who control the budget, using financial anchors that reframe the entire conversation.
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Instead of <span className="text-slate-400 italic">"You have 47 vulnerabilities,"</span> you lead with <span className="text-gradient-cyan font-semibold">"You have $2.3M in breach exposure."</span> Instead of technical jargon, you present insurance gaps, downtime costs, and ROI—backed by data from IBM, Verizon, and MITRE.
            </p>
            <p className="text-white text-base sm:text-lg leading-relaxed font-semibold">
              The result? Budget approval in weeks, not quarters. Strategic partnerships, not vendor relationships.
            </p>
          </div>
        </motion.div>
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
              <button
                onClick={() => setSelectedPhase(null)}
                className="absolute top-6 right-6 p-2 rounded-lg border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mt-8 mb-8">
                <div className="inline-block w-3 h-3 rounded-full mb-3" style={{ backgroundColor: selectedPhase.color }} />
                <h2 className="text-2xl font-bold mb-2" style={{ color: selectedPhase.color }}>
                  {selectedPhase.name}
                </h2>
                <p className="text-slate-400 text-sm">{selectedPhase.description}</p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium border border-slate-700/50 text-slate-300 capitalize">
                  {selectedPhase.category === "top" ? "Go to Market" : selectedPhase.category === "mid" ? "Sales" : "Customer Success"}
                </span>
              </div>

              {(() => {
                const plays = getPlaysByPhase(selectedPhase.id as MethodologyPhase);
                return (
                  <>
                    <div
                      className="p-4 rounded-lg border-l-4 mb-6"
                      style={{ backgroundColor: `${selectedPhase.color}08`, borderColor: selectedPhase.color }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4" style={{ color: selectedPhase.color }} />
                        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: selectedPhase.color }}>Available Plays</span>
                      </div>
                      <p className="text-sm text-slate-300">
                        {plays.length} tactical {plays.length === 1 ? "play" : "plays"} for the {selectedPhase.name} phase
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
                              <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: selectedPhase.color }} />
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

      <PlayDetailSheet playId={selectedPlayId} onClose={() => setSelectedPlayId(null)} />
    </section>
  );
};

export default TCFeatures;
