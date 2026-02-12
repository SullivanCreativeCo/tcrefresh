import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { type Play, getGoalLabel } from "@/data/newPlays";
import { usePlays } from "@/hooks/usePlays";
import { Users, Clock, Target, CheckCircle2, XCircle, Wrench } from "lucide-react";

interface PlayDetailSheetProps {
  playId: string | null;
  onClose: () => void;
}

const goalColors: Record<string, string> = {
  leads: "#4F8BFF",
  close: "#8BC34A",
  adoption: "#F44336",
};

export function PlayDetailSheet({ playId, onClose }: PlayDetailSheetProps) {
  const { getPlayById, getPlayDetail } = usePlays();
  
  const play = playId ? getPlayById(playId) : null;
  const detail = playId ? getPlayDetail(playId) : null;

  return (
    <Sheet open={!!playId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-hidden p-0">
        {play && (
          <>
            <SheetHeader className="p-6 pb-4 border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  style={{ borderColor: goalColors[play.businessGoal], color: goalColors[play.businessGoal] }}
                >
                  {getGoalLabel(play.businessGoal)}
                </Badge>
              </div>
              <SheetTitle className="text-xl font-bold text-foreground">
                {play.title}
              </SheetTitle>
              <SheetDescription>
                {play.governingSystem}
              </SheetDescription>
            </SheetHeader>
            
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="p-6 space-y-6">
                {detail ? (
                  <>
                    {/* Play Summary */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Play Summary</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{detail.summary}</p>
                    </div>

                    {/* Target Audience */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">Target Audience</span>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 space-y-1">
                        <p className="text-sm text-foreground/80">Roles: {play.targetAudience.roles.join(', ')}</p>
                        <p className="text-sm text-foreground/80">Company Size: {play.targetAudience.companySize}</p>
                        <p className="text-sm text-foreground/80">Context: {play.targetAudience.buyingContext}</p>
                      </div>
                    </div>

                    {/* When to Run */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">When to Run</span>
                      </div>
                      <ul className="space-y-1.5">
                        {play.whenToRun.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Behaviors */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">How to Execute</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">B</span>
                            <span className="text-sm font-medium text-foreground">Before</span>
                          </div>
                          <ul className="space-y-1 ml-7">
                            {detail.behaviors.before.map((step, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center font-bold">D</span>
                            <span className="text-sm font-medium text-foreground">During</span>
                          </div>
                          <ul className="space-y-1 ml-7">
                            {detail.behaviors.during.map((step, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-green-400 mt-0.5">•</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">A</span>
                            <span className="text-sm font-medium text-foreground">After</span>
                          </div>
                          <ul className="space-y-1 ml-7">
                            {detail.behaviors.after.map((step, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-amber-400 mt-0.5">•</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Tools */}
                    {detail.tools.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Wrench className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground">ThreatCaptain Tools</span>
                        </div>
                        <div className="space-y-2">
                          {detail.tools.map((tool, i) => (
                            <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                              <p className="text-sm font-medium text-foreground">{tool.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">{tool.usage}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expected Outcomes */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-foreground">Expected Outcomes</span>
                      </div>
                      <ul className="space-y-1.5">
                        {detail.outcomes.map((outcome, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Failure Modes */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-semibold text-foreground">Common Failure Modes</span>
                      </div>
                      <ul className="space-y-1.5">
                        {detail.failureModes.map((mode, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>{mode}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* OML Notes */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">OML Execution Notes</span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                          <p className="text-xs font-semibold text-foreground mb-1">Low OML (1-2)</p>
                          <p className="text-xs text-muted-foreground">{detail.omlNotes.low}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                          <p className="text-xs font-semibold text-foreground mb-1">Mid OML (3)</p>
                          <p className="text-xs text-muted-foreground">{detail.omlNotes.mid}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                          <p className="text-xs font-semibold text-foreground mb-1">High OML (4-5)</p>
                          <p className="text-xs text-muted-foreground">{detail.omlNotes.high}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No details available for this play.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
