import { useState, useEffect } from "react";
import { List } from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";
import { InteractivePieChart, PhaseData } from "@/components/InteractivePieChart";
import { PhaseLegend } from "@/components/playbook/PhaseLegend";
import { PhaseDetailInline } from "@/components/playbook/PhaseDetailInline";
import { PhaseDetailMorph } from "@/components/playbook/PhaseDetailMorph";
import { PhaseDetailTakeover } from "@/components/playbook/PhaseDetailTakeover";
import { PhaseDetailRadial } from "@/components/playbook/PhaseDetailRadial";
import { usePlays } from "@/hooks/usePlays";
import { PlayDetailSheet } from "@/components/playbook/PlayDetailSheet";

const InteractiveMap = () => {
  const [selectedPhase, setSelectedPhase] = useState<PhaseData | null>(null);
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const { getPlaysByPhase } = usePlays();

  const handlePhaseClick = (phase: PhaseData) => {
    setSelectedPhase(phase);
  };
  const handleCloseDetail = () => {
    setSelectedPhase(null);
  };
  const handlePhaseHover = (phaseId: string | null) => {
    setHoveredPhase(phaseId);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPhase) {
        handleCloseDetail();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhase]);

  const showPieChart = true;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TCNavbar />
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {/* Main content */}
      <main className="relative pt-24">
        <div className="container mx-auto px-6 py-12">
          {/* Hero section */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="text-gradient-cyan">Customer Journey</span> Playbook
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Explore plays and strategies for every stage—from first impression to annual review.
            </p>
          </div>

          {/* Interactive section */}
          {showPieChart && (
            <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-8">
              {/* Legend - Left side */}
              {showLegend && (
                <div className="hidden lg:block lg:flex-shrink-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <PhaseLegend
                    selectedPhase={hoveredPhase || selectedPhase?.id}
                    onPhaseSelect={handlePhaseClick}
                    onPhaseHover={handlePhaseHover}
                  />
                </div>
              )}

              {/* Pie Chart - Center */}
              <div
                className={`transition-all duration-500 ease-out animate-fade-in ${
                  selectedPhase ? "w-full lg:w-[400px] lg:flex-shrink-0" : "flex-1 max-w-3xl w-full"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <div className={`transition-all duration-500 ${selectedPhase ? "scale-90 lg:scale-100" : ""}`}>
                  <InteractivePieChart onPhaseClick={handlePhaseClick} selectedPhase={hoveredPhase || selectedPhase?.id} />
                </div>

                {!selectedPhase && (
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <p className="text-sm text-muted-foreground">Click on any segment to explore phase details</p>
                    <button
                      onClick={() => setShowLegend(!showLegend)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                        showLegend
                          ? "bg-muted border-border text-foreground"
                          : "bg-transparent border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                      }`}
                      title={showLegend ? "Hide legend" : "Show legend"}
                    >
                      <List className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Legend</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Inline Detail Panel */}
              {selectedPhase && (
                <div
                  className="flex-1 min-w-0 lg:max-w-lg rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm animate-fade-in"
                  style={{ boxShadow: `0 0 40px ${selectedPhase.color}15` }}
                >
                  <PhaseDetailInline phase={selectedPhase} onClose={handleCloseDetail} />
                </div>
              )}
            </div>
          )}

          {/* Mobile legend */}
          {showPieChart && showLegend && (
            <div className="lg:hidden mt-8">
              <PhaseLegend
                selectedPhase={hoveredPhase || selectedPhase?.id}
                onPhaseSelect={handlePhaseClick}
                onPhaseHover={handlePhaseHover}
              />
            </div>
          )}
        </div>
      </main>

       
       {/* Play Detail Sheet - Appears when user clicks on a play */}
       <PlayDetailSheet playId={selectedPlayId} onClose={() => setSelectedPlayId(null)} />
       <TCFooter />
     </div>
   );
 };
 
 export default InteractiveMap;
