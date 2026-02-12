import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhaseData } from "@/components/InteractivePieChart";
import { ChevronLeft, Play, Users, Target } from "lucide-react";
import { getPlaysByPhase, MethodologyPhase } from "@/data/newPlays";
import { PlayDetailSheet } from "./PlayDetailSheet";

interface PhaseDetailMorphProps {
  phase: PhaseData | null;
  onClose: () => void;
}

export function PhaseDetailMorph({ phase, onClose }: PhaseDetailMorphProps) {
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null);
  
  if (!phase) return null;
  
  const plays = getPlaysByPhase(phase.id as MethodologyPhase);

  return (
    <AnimatePresence mode="wait">
      {phase && (
        <motion.div
          key={phase.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 pt-16 bg-background overflow-y-auto"
        >
          <motion.div
            layoutId={`phase-${phase.id}`}
            initial={{ scale: 0.5, opacity: 0, x: -100 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-20 left-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card/90 backdrop-blur-sm"
            style={{ boxShadow: `0 0 30px ${phase.color}30` }}
          >
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${phase.color}20` }}
            >
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: phase.color }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
            <div>
              <h3 className="font-display font-bold text-foreground">{phase.name}</h3>
              <p className="text-xs text-muted-foreground">{phase.description}</p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-20 right-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Overview</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="container mx-auto px-6 pt-32 pb-12 max-w-4xl"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-secondary/50 border border-border"
              >
                <Target className="w-6 h-6 mt-0.5 flex-shrink-0" style={{ color: phase.color }} />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {plays.length} Tactical {plays.length === 1 ? 'Play' : 'Plays'}
                  </h3>
                  <p className="text-muted-foreground">
                    Execute these plays during the {phase.name} phase to drive business outcomes
                  </p>
                </div>
              </motion.div>

              {plays.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 p-5 rounded-xl border border-border bg-card/50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="w-5 h-5" style={{ color: phase.color }} />
                    <h3 className="font-display font-semibold text-foreground">
                      Available Plays
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {plays.map((play, i) => (
                      <motion.li
                        key={play.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.03 }}
                        onClick={() => setSelectedPlayId(play.id)}
                        className="text-sm cursor-pointer hover:bg-secondary/30 p-3 rounded-lg transition-colors flex items-start gap-3"
                      >
                        <span 
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                          style={{ backgroundColor: phase.color }}
                        />
                        <div className="flex-1">
                          <p className="text-foreground/90 font-medium mb-1">{play.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>{play.targetAudience.roles.slice(0, 2).join(', ')}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-8 rounded-xl border border-border bg-card/50"
                >
                  <Play className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">No plays available for this phase yet</p>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          <PlayDetailSheet playId={selectedPlayId} onClose={() => setSelectedPlayId(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
