import { useState } from "react";
import { PhaseData } from "@/components/InteractivePieChart";
import { X, Target, Play, Users } from "lucide-react";
import { getPlaysByPhase, MethodologyPhase } from "@/data/newPlays";
import { PlayDetailSheet } from "./PlayDetailSheet";

interface PhaseDetailInlineProps {
  phase: PhaseData | null;
  onClose: () => void;
}

export function PhaseDetailInline({ phase, onClose }: PhaseDetailInlineProps) {
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null);
  
  if (!phase) return null;

  const plays = getPlaysByPhase(phase.id as MethodologyPhase);

  return (
    <div className="h-full overflow-y-auto animate-fade-in">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${phase.color}20` }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: phase.color }}
              />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {phase.name}
              </h2>
              <p className="text-sm text-muted-foreground">{phase.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-5">
          <div 
            className="p-4 rounded-xl border-l-4"
            style={{ 
              backgroundColor: `${phase.color}08`,
              borderColor: phase.color
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4" style={{ color: phase.color }} />
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: phase.color }}>
                Available Plays
              </span>
            </div>
            <p className="text-sm text-foreground/90">
              {plays.length} tactical {plays.length === 1 ? 'play' : 'plays'} for the {phase.name} phase
            </p>
          </div>

          {plays.length > 0 ? (
            <div className="space-y-3 p-4 rounded-xl border border-border bg-card/50">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5" style={{ color: phase.color }} />
                <h3 className="font-display font-semibold text-foreground text-sm">
                  Tactical Plays
                </h3>
              </div>
              <ul className="space-y-2">
                {plays.map((play) => (
                  <li
                    key={play.id}
                    onClick={() => setSelectedPlayId(play.id)}
                    className="text-sm flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer"
                  >
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{ backgroundColor: phase.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground/90 font-medium">{play.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {play.targetAudience.roles[0]}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center p-6 rounded-xl border border-border bg-card/50">
              <p className="text-sm text-muted-foreground">
                No plays available for this phase yet
              </p>
            </div>
          )}
        </div>
      </div>
      
      <PlayDetailSheet playId={selectedPlayId} onClose={() => setSelectedPlayId(null)} />
    </div>
  );
}
