import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhaseData } from "@/components/InteractivePieChart";
import { X, Play, Users, Target, ArrowRight } from "lucide-react";
import { getPlaysByPhase, MethodologyPhase } from "@/data/newPlays";
import { PlayDetailSheet } from "./PlayDetailSheet";

interface PhaseDetailTakeoverProps {
  phase: PhaseData | null;
  onClose: () => void;
}

export function PhaseDetailTakeover({ phase, onClose }: PhaseDetailTakeoverProps) {
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null);
  
  if (!phase) return null;
  
  const plays = getPlaysByPhase(phase.id as MethodologyPhase);

  return (
    <AnimatePresence mode="wait">
      {phase && (
        <motion.div
          key={phase.id}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 50, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: phase.color }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute inset-0 bg-background"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="relative min-h-screen flex flex-col"
          >
            <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
              <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${phase.color}30`, border: `2px solid ${phase.color}` }}
                  >
                    <Play className="w-5 h-5" style={{ color: phase.color }} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h1 className="font-display text-2xl font-bold text-foreground">{phase.name} Plays</h1>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </motion.div>
                </div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={onClose}
                  className="p-3 rounded-full hover:bg-secondary transition-colors"
                  style={{ border: `1px solid ${phase.color}40` }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <div className="flex-1 container mx-auto px-6 py-12 max-w-5xl">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center py-6"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 mb-4">
                    <Target className="w-4 h-4" style={{ color: phase.color }} />
                    <span className="text-sm font-medium text-foreground">
                      {plays.length} Tactical {plays.length === 1 ? 'Play' : 'Plays'}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Execute these plays during the {phase.name} phase to drive measurable outcomes
                  </p>
                </motion.div>

                {plays.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plays.map((play, i) => (
                      <motion.div
                        key={play.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        onClick={() => setSelectedPlayId(play.id)}
                        className="p-4 rounded-xl border border-border bg-card/50 cursor-pointer hover:bg-secondary/30 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <span 
                            className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                            style={{ backgroundColor: phase.color }}
                          />
                          <div className="flex-1">
                            <p className="text-foreground font-medium group-hover:text-foreground flex items-center gap-1">
                              {play.title}
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                              <Users className="w-3 h-3" />
                              {play.targetAudience.roles[0]}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center p-12 rounded-2xl border border-border bg-card/50"
                  >
                    <Play className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground">No plays available for this phase yet</p>
                  </motion.div>
                )}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-sm text-muted-foreground pt-8"
                >
                  Press <kbd className="px-2 py-1 rounded bg-secondary text-xs">ESC</kbd> or click the X to return
                </motion.p>
              </div>
            </div>
          </motion.div>
          
          <PlayDetailSheet playId={selectedPlayId} onClose={() => setSelectedPlayId(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
