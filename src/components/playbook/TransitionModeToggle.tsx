import { Layers, Sparkles, Maximize2, List, CircleDot } from "lucide-react";
import { useTransitionMode, TransitionMode } from "@/contexts/TransitionModeContext";

const modes: { value: TransitionMode; label: string; icon: typeof Layers }[] = [
  { value: "inline", label: "Inline", icon: Layers },
  { value: "morph", label: "Morph", icon: Sparkles },
  { value: "takeover", label: "Takeover", icon: Maximize2 },
  { value: "radial", label: "Radial", icon: CircleDot },
];

export function TransitionModeToggle() {
  const { mode, setMode, showLegend, setShowLegend } = useTransitionMode();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/80 border border-border">
        {modes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              mode === value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowLegend(!showLegend)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
          showLegend
            ? "bg-secondary/80 border-border text-foreground"
            : "bg-transparent border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
        }`}
        title={showLegend ? "Hide legend" : "Show legend"}
      >
        <List className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Legend</span>
      </button>
    </div>
  );
}
