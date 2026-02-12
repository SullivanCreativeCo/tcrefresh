import { phases, PhaseData } from "@/components/InteractivePieChart";

interface PhaseLegendProps {
  selectedPhase?: string | null;
  onPhaseSelect?: (phase: PhaseData) => void;
  onPhaseHover?: (phaseId: string | null) => void;
}

const categoryLabels = {
  top: "Go To Market",
  mid: "Sales",
  post: "Customer Success",
};

export function PhaseLegend({ selectedPhase, onPhaseSelect, onPhaseHover }: PhaseLegendProps) {
  const groupedPhases = {
    top: phases.filter((p) => p.category === "top"),
    mid: phases.filter((p) => p.category === "mid"),
    post: phases.filter((p) => p.category === "post"),
  };

  return (
    <div className="w-full max-w-xs space-y-6">
      {(Object.keys(groupedPhases) as Array<keyof typeof groupedPhases>).map(
        (category) => (
          <div key={category} className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {categoryLabels[category]}
            </h3>
            <div className="space-y-1">
              {groupedPhases[category].map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => onPhaseSelect?.(phase)}
                  onMouseEnter={() => onPhaseHover?.(phase.id)}
                  onMouseLeave={() => onPhaseHover?.(null)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    selectedPhase === phase.id
                      ? "bg-secondary ring-1 ring-primary/50"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: phase.color,
                      boxShadow:
                        selectedPhase === phase.id
                          ? `0 0 10px ${phase.color}80`
                          : "none",
                    }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {phase.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
