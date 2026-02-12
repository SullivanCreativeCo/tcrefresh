import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhaseData } from "@/components/InteractivePieChart";
import { X, Play, Users, ArrowRight } from "lucide-react";
import { getPlaysByPhase, MethodologyPhase } from "@/data/newPlays";
import { PlayDetailSheet } from "./PlayDetailSheet";

interface PhaseDetailRadialProps {
  phase: PhaseData | null;
  onClose: () => void;
}

export function PhaseDetailRadial({ phase, onClose }: PhaseDetailRadialProps) {
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null);
  
  if (!phase) return null;
  
  const plays = getPlaysByPhase(phase.id as MethodologyPhase);
  
  const leftPlays = plays.slice(0, Math.ceil(plays.length / 2));
  const rightPlays = plays.slice(Math.ceil(plays.length / 2));

  return (
    <AnimatePresence>
      {phase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${phase.color}40 0%, transparent 70%)`,
            }}
          />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute z-10"
          >
            <div
              className="w-48 h-48 rounded-full flex flex-col items-center justify-center border-4"
              style={{
                backgroundColor: `${phase.color}20`,
                borderColor: phase.color,
                boxShadow: `0 0 60px ${phase.color}40`,
              }}
            >
              <Play className="w-6 h-6 mb-2" style={{ color: phase.color }} />
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-xl font-bold text-foreground text-center px-4"
              >
                {phase.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-muted-foreground text-center px-4 mt-1"
              >
                {plays.length} Plays Available
              </motion.p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-card transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-6 left-6 z-20 text-xs text-muted-foreground"
          >
            Press ESC to close
          </motion.div>

          {leftPlays.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="absolute left-8 top-1/2 -translate-y-1/2 max-w-xs z-10"
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 border border-border">
                <ul className="space-y-3">
                  {leftPlays.map((play, idx) => (
                    <motion.li
                      key={play.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      onClick={() => setSelectedPlayId(play.id)}
                      className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors group"
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: phase.color }}
                        />
                        <div>
                          <p className="font-medium flex items-center gap-1">
                            {play.title}
                            <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </p>
                          <p className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-0.5">
                            <Users className="w-2.5 h-2.5" />
                            {play.targetAudience.roles[0]}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {rightPlays.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="absolute right-8 top-1/2 -translate-y-1/2 max-w-xs z-10"
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 border border-border">
                <ul className="space-y-3">
                  {rightPlays.map((play, idx) => (
                    <motion.li
                      key={play.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      onClick={() => setSelectedPlayId(play.id)}
                      className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors group"
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: phase.color }}
                        />
                        <div>
                          <p className="font-medium flex items-center gap-1">
                            {play.title}
                            <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </p>
                          <p className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-0.5">
                            <Users className="w-2.5 h-2.5" />
                            {play.targetAudience.roles[0]}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {plays.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-20 z-10 text-center"
            >
              <p className="text-muted-foreground">No plays available for this phase yet</p>
            </motion.div>
          )}

          <PlayDetailSheet playId={selectedPlayId} onClose={() => setSelectedPlayId(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
